import { config as loadEnv } from "dotenv";
import { z } from "zod";

loadEnv();

const envSchema = z.object({
	UPBIT_ACCESS_KEY: z.string().min(1).optional(),
	UPBIT_SECRET_KEY: z.string().min(1).optional(),
	UPBIT_SERVER_URL: z.string().url().default("https://api.upbit.com"),
	UPBIT_ENABLE_TRADING: z.preprocess(
		(v) => String(v ?? "false").toLowerCase() === "true",
		z.boolean(),
	),
});

export const env = envSchema.parse(process.env);

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

export const config = {
	upbit: {
		baseUrl: env.UPBIT_SERVER_URL,
		apiBasePath: "/v1",
		accessKey: env.UPBIT_ACCESS_KEY ?? "",
		secretKey: env.UPBIT_SECRET_KEY ?? "",
		enablePrivate: env.UPBIT_ENABLE_TRADING,
	},
};
