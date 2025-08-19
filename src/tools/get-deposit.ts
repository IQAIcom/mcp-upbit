import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z.object({ uuid: z.string().min(1) });

type Params = z.infer<typeof paramsSchema>;

export const getDepositTool = {
	name: "GET_DEPOSIT",
	description: "Get a single deposit by UUID (requires private API)",
	parameters: paramsSchema,
	execute: async ({ uuid }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query = { uuid };
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/deposit", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
