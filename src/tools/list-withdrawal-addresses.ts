import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

export const listWithdrawalAddressesTool = {
	name: "LIST_WITHDRAWAL_ADDRESSES",
	description:
		"List registered withdrawal-allowed addresses (requires private API)",
	parameters: z.object({}),
	execute: async () => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const token = signJwtToken();
		const data = await fetchJson<unknown>(client, "/withdraws/coin_addresses", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
