/** biome-ignore-all lint/suspicious/noExplicitAny: <not important> */
import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";

const paramsSchema = z.object({
	market: z.string().min(3).describe("Upbit market code, e.g., KRW-BTC"),
});

type Params = z.infer<typeof paramsSchema>;

export const getTickerTool = {
	name: "GET_TICKER",
	description: "Get the latest ticker data from Upbit for a single market",
	parameters: paramsSchema,
	execute: async ({ market }: Params) => {
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const data = await fetchJson<unknown>(client, "/ticker", {
			params: { markets: market },
		});
		const item = Array.isArray(data) ? (data as any[])[0] : (data as any);
		return JSON.stringify(item, null, 2);
	},
} as const;
