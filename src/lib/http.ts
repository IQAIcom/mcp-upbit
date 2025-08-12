import axios, { type AxiosError, type AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import type { z } from "zod";

export class HttpError extends Error {
	constructor(
		public readonly status: number,
		message: string,
		public readonly data?: unknown,
	) {
		super(message);
		this.name = "HttpError";
	}
}

export function createHttpClient(baseURL?: string): AxiosInstance {
	const client = axios.create({ baseURL, timeout: 15_000 });

	axiosRetry(client, {
		retries: 3,
		retryDelay: axiosRetry.exponentialDelay,
		retryCondition: (error) => {
			if (axiosRetry.isNetworkOrIdempotentRequestError(error)) return true;
			const status = error.response?.status ?? 0;
			return status === 429 || (status >= 500 && status < 600);
		},
	});

	return client;
}

export async function fetchJson<T>(
	client: AxiosInstance,
	url: string,
	options: {
		method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
		params?: Record<string, unknown>;
		data?: unknown;
		headers?: Record<string, string>;
	} = {},
	schema?: z.ZodType<T>,
): Promise<T> {
	try {
		const response = await client.request({
			url,
			method: options.method ?? "GET",
			params: options.params,
			data: options.data,
			headers: options.headers,
		});

		const data = response.data;
		if (schema) {
			return schema.parse(data);
		}
		return data as T;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			const ae = err as AxiosError;
			const status = ae.response?.status ?? 0;
			const message = ae.message || "HTTP request failed";
			const data = ae.response?.data;
			throw new HttpError(status, message, data);
		}
		throw err;
	}
}

export function toQueryString(
	params: Record<string, string | number | boolean | undefined>,
): string {
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value === undefined) continue;
		searchParams.append(key, String(value));
	}
	return searchParams.toString();
}
