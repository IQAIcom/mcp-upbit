import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const ROOT = path.resolve(import.meta.dirname, "..");
const README_PATH = path.join(ROOT, "README.md");
const TOOLS_DIR = path.join(ROOT, "src", "tools");

const START = "<!-- AUTO-GENERATED TOOLS START -->";
const END = "<!-- AUTO-GENERATED TOOLS END -->";

describe("generate-tools script", () => {
	let originalReadme: string;

	beforeEach(() => {
		originalReadme = fs.readFileSync(README_PATH, "utf8");
	});

	afterEach(() => {
		// Restore original README
		fs.writeFileSync(README_PATH, originalReadme);
	});

	describe("README markers", () => {
		it("should have AUTO-GENERATED TOOLS START marker", () => {
			expect(originalReadme).toContain(START);
		});

		it("should have AUTO-GENERATED TOOLS END marker", () => {
			expect(originalReadme).toContain(END);
		});

		it("should have START marker before END marker", () => {
			const startIndex = originalReadme.indexOf(START);
			const endIndex = originalReadme.indexOf(END);
			expect(startIndex).toBeLessThan(endIndex);
		});
	});

	describe("tools directory", () => {
		it("should have tools directory", () => {
			expect(fs.existsSync(TOOLS_DIR)).toBe(true);
		});

		it("should have TypeScript tool files", () => {
			const files = fs.readdirSync(TOOLS_DIR);
			const tsFiles = files.filter(
				(f) => f.endsWith(".ts") && f !== "index.ts",
			);
			expect(tsFiles.length).toBeGreaterThan(0);
		});
	});

	describe("tool file structure", () => {
		it("should export tools with required properties", async () => {
			const files = fs.readdirSync(TOOLS_DIR);
			const toolFiles = files.filter(
				(f) => f.endsWith(".ts") && f !== "index.ts",
			);

			for (const file of toolFiles) {
				const mod = await import(path.join(TOOLS_DIR, file));
				const exports = Object.values(mod);

				// Find exports that look like MCP tools
				const toolExports = exports.filter(
					(exp) =>
						exp &&
						typeof exp === "object" &&
						typeof (exp as { name?: unknown }).name === "string" &&
						typeof (exp as { description?: unknown }).description === "string",
				);

				// Each tool file should have at least one valid tool export
				expect(toolExports.length).toBeGreaterThanOrEqual(1);

				for (const tool of toolExports) {
					const t = tool as {
						name: string;
						description: string;
						parameters?: unknown;
						schema?: unknown;
					};
					// Tool should have name as uppercase string with underscores
					expect(t.name).toMatch(/^[A-Z][A-Z0-9_]*$/);

					// Tool should have description
					expect(typeof t.description).toBe("string");
					expect(t.description.length).toBeGreaterThan(0);

					// Tool should have either parameters (Zod schema) or schema (JSON schema)
					const hasParams = t.parameters || t.schema;
					expect(hasParams).toBeTruthy();
				}
			}
		});
	});

	describe("README structure", () => {
		it("should have all required sections", () => {
			const requiredSections = [
				"Overview",
				"Features",
				"Installation",
				"Running with",
				"Configuration",
				"Usage Examples",
				"MCP Tools",
				"Development",
				"Resources",
				"License",
			];

			for (const section of requiredSections) {
				expect(originalReadme).toMatch(new RegExp(`##.*${section}`, "i"));
			}
		});

		it("should have npm badge", () => {
			expect(originalReadme).toContain("npmjs.com/package/@iqai/mcp-upbit");
		});

		it("should have license badge", () => {
			expect(originalReadme).toContain("License");
		});
	});
});

describe("tool definitions", () => {
	it("should have GET_TICKER tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-ticker.ts"));
		expect(mod.getTickerTool).toBeDefined();
		expect(mod.getTickerTool.name).toBe("GET_TICKER");
	});

	it("should have GET_ORDERBOOK tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-orderbook.ts"));
		expect(mod.getOrderbookTool).toBeDefined();
		expect(mod.getOrderbookTool.name).toBe("GET_ORDERBOOK");
	});

	it("should have GET_TRADES tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-trades.ts"));
		expect(mod.getTradesTool).toBeDefined();
		expect(mod.getTradesTool.name).toBe("GET_TRADES");
	});

	it("should have GET_ACCOUNTS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-accounts.ts"));
		expect(mod.getAccountsTool).toBeDefined();
		expect(mod.getAccountsTool.name).toBe("GET_ACCOUNTS");
	});

	it("should have GET_ORDERS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-orders.ts"));
		expect(mod.getOrdersTool).toBeDefined();
		expect(mod.getOrdersTool.name).toBe("GET_ORDERS");
	});

	it("should have GET_ORDER tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-order.ts"));
		expect(mod.getOrderTool).toBeDefined();
		expect(mod.getOrderTool.name).toBe("GET_ORDER");
	});

	it("should have CREATE_ORDER tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "create-order.ts"));
		expect(mod.createOrderTool).toBeDefined();
		expect(mod.createOrderTool.name).toBe("CREATE_ORDER");
	});

	it("should have CANCEL_ORDER tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "cancel-order.ts"));
		expect(mod.cancelOrderTool).toBeDefined();
		expect(mod.cancelOrderTool.name).toBe("CANCEL_ORDER");
	});

	it("should have LIST_WITHDRAWAL_ADDRESSES tool", async () => {
		const mod = await import(
			path.join(TOOLS_DIR, "list-withdrawal-addresses.ts")
		);
		expect(mod.listWithdrawalAddressesTool).toBeDefined();
		expect(mod.listWithdrawalAddressesTool.name).toBe(
			"LIST_WITHDRAWAL_ADDRESSES",
		);
	});

	it("should have CREATE_WITHDRAWAL tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "create-withdrawal.ts"));
		expect(mod.createWithdrawalTool).toBeDefined();
		expect(mod.createWithdrawalTool.name).toBe("CREATE_WITHDRAWAL");
	});

	it("should have GET_WITHDRAWAL tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-withdrawal.ts"));
		expect(mod.getWithdrawalTool).toBeDefined();
		expect(mod.getWithdrawalTool.name).toBe("GET_WITHDRAWAL");
	});

	it("should have LIST_WITHDRAWALS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "list-withdrawals.ts"));
		expect(mod.listWithdrawalsTool).toBeDefined();
		expect(mod.listWithdrawalsTool.name).toBe("LIST_WITHDRAWALS");
	});

	it("should have CANCEL_WITHDRAWAL tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "cancel-withdrawal.ts"));
		expect(mod.cancelWithdrawalTool).toBeDefined();
		expect(mod.cancelWithdrawalTool.name).toBe("CANCEL_WITHDRAWAL");
	});

	it("should have GET_DEPOSIT_CHANCE tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-deposit-chance.ts"));
		expect(mod.getDepositChanceTool).toBeDefined();
		expect(mod.getDepositChanceTool.name).toBe("GET_DEPOSIT_CHANCE");
	});

	it("should have CREATE_DEPOSIT_ADDRESS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "create-deposit-address.ts"));
		expect(mod.createDepositAddressTool).toBeDefined();
		expect(mod.createDepositAddressTool.name).toBe("CREATE_DEPOSIT_ADDRESS");
	});

	it("should have GET_DEPOSIT_ADDRESS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-deposit-address.ts"));
		expect(mod.getDepositAddressTool).toBeDefined();
		expect(mod.getDepositAddressTool.name).toBe("GET_DEPOSIT_ADDRESS");
	});

	it("should have LIST_DEPOSIT_ADDRESSES tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "list-deposit-addresses.ts"));
		expect(mod.listDepositAddressesTool).toBeDefined();
		expect(mod.listDepositAddressesTool.name).toBe("LIST_DEPOSIT_ADDRESSES");
	});

	it("should have GET_DEPOSIT tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "get-deposit.ts"));
		expect(mod.getDepositTool).toBeDefined();
		expect(mod.getDepositTool.name).toBe("GET_DEPOSIT");
	});

	it("should have LIST_DEPOSITS tool", async () => {
		const mod = await import(path.join(TOOLS_DIR, "list-deposits.ts"));
		expect(mod.listDepositsTool).toBeDefined();
		expect(mod.listDepositsTool.name).toBe("LIST_DEPOSITS");
	});
});
