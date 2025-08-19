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

export const getDepositAddressTool = {
	name: "GET_DEPOSIT_ADDRESS",
	description:
		"Get a single deposit address for a currency and net_type (private)",
	parameters: paramsSchema,
	execute: async ({ currency, net_type }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query = { currency, net_type };
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/deposit", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
