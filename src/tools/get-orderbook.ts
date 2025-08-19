import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";

const paramsSchema = z.object({
	market: z.string().min(3).describe("Upbit market code, e.g., KRW-BTC"),
});

type Params = z.infer<typeof paramsSchema>;

export const getOrderbookTool = {
	name: "GET_ORDERBOOK",
	description: "Get orderbook snapshot for a given market",
	parameters: paramsSchema,
	execute: async ({ market }: Params) => {
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const data = await fetchJson<unknown>(client, "/orderbook", {
			params: { markets: market },
		});
		/** biome-ignore lint/suspicious/noExplicitAny: <not important> */
		const item = Array.isArray(data) ? (data as any[])[0] : (data as any);
		return JSON.stringify(item, null, 2);
	},
} as const;
