import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

export const listDepositAddressesTool = {
	name: "LIST_DEPOSIT_ADDRESSES",
	description:
		"List deposit addresses for all currencies (requires private API)",
	parameters: z.object({}),
	execute: async () => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const token = signJwtToken();
		const data = await fetchJson<unknown>(client, "/deposits/coin_addresses", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
