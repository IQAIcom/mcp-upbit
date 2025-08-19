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

export const listDepositsTool = {
	name: "LIST_DEPOSITS",
	description: "List deposits (requires private API)",
	parameters: paramsSchema,
	execute: async ({ currency, state, page, limit }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query = {
			page,
			limit,
			currency,
			state,
		};
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/deposits", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
