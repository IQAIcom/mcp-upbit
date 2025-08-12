import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";

const paramsSchema = z.object({
	market: z.string().min(3).describe("Upbit market code, e.g., KRW-BTC"),
});

type Params = z.infer<typeof paramsSchema>;

export const getTradesTool = {
	name: "GET_TRADES",
	description: "Get recent trades for a market",
	parameters: paramsSchema,
	execute: async ({ market }: Params) => {
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const data = await fetchJson<unknown>(client, "/trades/ticks", {
			params: { market },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
