import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

export const getAccountsTool = {
	name: "GET_ACCOUNTS",
	description: "Get Upbit account balances (requires private API enabled)",
	parameters: z.object({}),
	execute: async () => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const token = signJwtToken();
		const data = await fetchJson<unknown>(client, "/accounts", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
