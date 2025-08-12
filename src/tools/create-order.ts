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
	})
	.refine((p) => (p.ord_type === "limit" ? p.volume && p.price : true), {
		message: "Limit orders require both volume and price",
	})
	.refine((p) => (p.ord_type === "price" ? !!p.price : true), {
		message: "Market buy (price) requires price",
	})
	.refine((p) => (p.ord_type === "market" ? !!p.volume : true), {
		message: "Market sell (market) requires volume",
	});

type Params = z.infer<typeof paramsSchema>;

export const createOrderTool = {
	name: "CREATE_ORDER",
	description: "Create an Upbit order (requires private API)",
	parameters: paramsSchema,
	execute: async ({ market, side, ord_type, volume, price }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query: Record<string, string> = { market, side, ord_type };
		if (volume) query.volume = volume;
		if (price) query.price = price;
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/orders", {
			method: "POST",
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
