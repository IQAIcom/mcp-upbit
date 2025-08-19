import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		currency: z.string().optional(),
		state: z.string().optional(),
		page: z.number().int().min(1).default(1),
		limit: z.number().int().min(1).max(100).default(50),
	})
	.strict();

type Params = z.infer<typeof paramsSchema>;

export const listWithdrawalsTool = {
	name: "LIST_WITHDRAWALS",
	description: "List withdrawals (requires private API)",
	parameters: paramsSchema,
	execute: async ({ currency, state, page, limit }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query: Record<string, string> = {
			page: String(page),
			limit: String(limit),
		};
		if (currency) query.currency = currency;
		if (state) query.state = state;
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/withdraws", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
