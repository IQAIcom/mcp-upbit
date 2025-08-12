import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "./config.js";

export function ensurePrivateEnabled(): void {
	if (!config.upbit.enablePrivate) {
		throw new Error(
			"Private trading tools are disabled. Set UPBIT_ENABLE_TRADING=true to enable.",
		);
	}
	if (!config.upbit.accessKey || !config.upbit.secretKey) {
		throw new Error(
			"Upbit API keys are not configured. Set UPBIT_ACCESS_KEY and UPBIT_SECRET_KEY.",
		);
	}
}

export function signJwtToken(
	queryParams?: Record<string, string | number>,
): string {
	const payload: Record<string, unknown> = {
		access_key: config.upbit.accessKey,
		nonce: crypto.randomUUID(),
	};

	if (queryParams && Object.keys(queryParams).length > 0) {
		const queryString = Object.entries(queryParams)
			.map(([k, v]) => `${k}=${v}`)
			.join("&");
		const queryHash = crypto
			.createHash("sha512")
			.update(queryString)
			.digest("hex");
		payload.query_hash = queryHash;
		payload.query_hash_alg = "SHA512";
	}

	return jwt.sign(payload, config.upbit.secretKey as string);
}
