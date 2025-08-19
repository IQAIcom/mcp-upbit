import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		currency: z.string(),
		net_type: z.string(),
	})
	.strict();

type Params = z.infer<typeof paramsSchema>;

export const createDepositAddressTool = {
	name: "CREATE_DEPOSIT_ADDRESS",
	description: "Request creation of a deposit address (requires private API)",
	parameters: paramsSchema,
	execute: async (params: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const token = signJwtToken(params);
		const data = await fetchJson<unknown>(client, "/deposits/coin_address", {
			method: "POST",
			data: params,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
