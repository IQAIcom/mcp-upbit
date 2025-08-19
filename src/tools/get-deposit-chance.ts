import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		currency: z.string(),
		net_type: z.string().optional(),
	})
	.strict();

type Params = z.infer<typeof paramsSchema>;

export const getDepositChanceTool = {
	name: "GET_DEPOSIT_CHANCE",
	description: "Get deposit availability information for a currency (private)",
	parameters: paramsSchema,
	execute: async ({ currency, net_type }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query: Record<string, string> = { currency };
		if (net_type) query.net_type = net_type;
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/deposits/chance/coin", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
