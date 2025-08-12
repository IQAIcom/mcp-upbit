import { z } from "zod";
import { config } from "../lib/config.js";
import { createHttpClient, fetchJson } from "../lib/http.js";
import { ensurePrivateEnabled, signJwtToken } from "../lib/upbit-auth.js";

const paramsSchema = z
	.object({
		uuid: z.string().optional(),
		identifier: z.string().optional(),
	})
	.refine((v) => v.uuid || v.identifier, {
		message: "Either uuid or identifier is required",
	});

type Params = z.infer<typeof paramsSchema>;

export const getOrderTool = {
	name: "GET_ORDER",
	description: "Get a single Upbit order (requires private API)",
	parameters: paramsSchema,
	execute: async ({ uuid, identifier }: Params) => {
		ensurePrivateEnabled();
		const baseURL = `${config.upbit.baseUrl}${config.upbit.apiBasePath}`;
		const client = createHttpClient(baseURL);
		const query: Record<string, string> = {};
		if (uuid) query.uuid = uuid;
		if (identifier) query.identifier = identifier;
		const token = signJwtToken(query);
		const data = await fetchJson<unknown>(client, "/order", {
			params: query,
			headers: { Authorization: `Bearer ${token}` },
		});
		return JSON.stringify(data, null, 2);
	},
} as const;
