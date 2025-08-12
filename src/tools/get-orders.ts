import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z.object({
	market: z.string().optional(),
	state: z.enum(["wait", "done", "cancel"]).default("wait"),
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(100),
});

type Params = z.infer<typeof paramsSchema>;

export const getOrdersTool = {
	name: "GET_ORDERS",
	description: "List Upbit orders (requires private API)",
	parameters: paramsSchema,
	execute: async ({ market, state, page, limit }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query: Record<string, string> = {
			state,
			page: String(page),
			limit: String(limit),
		};
		if (market) query.market = market;
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/orders", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
