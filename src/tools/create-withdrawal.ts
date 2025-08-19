import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		currency: z.string(),
		amount: z.string(),
		address: z.string(),
		net_type: z.string(),
		secondary_address: z.string().optional(),
		transaction_type: z.enum(["default", "internal"]).optional(),
	})
	.strict();

type Params = z.infer<typeof paramsSchema>;

export const createWithdrawalTool = {
	name: "CREATE_WITHDRAWAL",
	description: "Request a digital asset withdrawal (requires private API)",
	parameters: paramsSchema,
	execute: async (params: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const token = signJwtToken(params);
		const data = await fetchJson<unknown>(client, "/withdraws/coin", {
			method: "POST",
			data: params,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
