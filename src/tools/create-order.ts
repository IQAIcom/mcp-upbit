import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		market: z.string(),
		side: z.enum(["bid", "ask"]),
		ord_type: z.enum(["limit", "price", "market"]),
		volume: z.string().optional(),
		price: z.string().optional(),
		time_in_force: z.enum(["ioc", "fok", "post_only"]).optional(),
		smp_type: z.enum(["cancel_maker", "cancel_taker", "reduce"]).optional(),
		identifier: z.string().optional(),
	})
	.refine((p) => (p.ord_type === "limit" ? p.volume && p.price : true), {
		message: "Limit orders require both volume and price",
	})
	.refine((p) => (p.ord_type === "price" ? !!p.price : true), {
		message: "Market buy (price) requires price",
	})
	.refine((p) => (p.ord_type === "market" ? !!p.volume : true), {
		message: "Market sell (market) requires volume",
	})
	.refine((p) => !(p.time_in_force === "post_only" && p.smp_type), {
		message: "post_only cannot be used with smp_type",
	});

type Params = z.infer<typeof paramsSchema>;

export const createOrderTool = {
	name: "CREATE_ORDER",
	description: "Create an Upbit order (requires private API)",
	parameters: paramsSchema,
	execute: async ({
		market,
		side,
		ord_type,
		volume,
		price,
		time_in_force,
		smp_type,
		identifier,
	}: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const body = {
			market,
			side,
			ord_type,
			volume,
			price,
			time_in_force,
			smp_type,
			identifier,
		};
		const token = signJwtToken(body);
		const data = await fetchJson<unknown>(client, "/orders", {
			method: "POST",
			data: body,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
