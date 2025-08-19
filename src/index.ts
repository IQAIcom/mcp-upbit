#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { cancelOrderTool } from "./tools/cancel-order.js";
import { cancelWithdrawalTool } from "./tools/cancel-withdrawal.js";
import { createDepositAddressTool } from "./tools/create-deposit-address.js";
import { createOrderTool } from "./tools/create-order.js";
import { createWithdrawalTool } from "./tools/create-withdrawal.js";
import { getAccountsTool } from "./tools/get-accounts.js";
import { getDepositTool } from "./tools/get-deposit.js";
import { getDepositAddressTool } from "./tools/get-deposit-address.js";
import { getDepositChanceTool } from "./tools/get-deposit-chance.js";
import { getOrderTool } from "./tools/get-order.js";
import { getOrderbookTool } from "./tools/get-orderbook.js";
import { getOrdersTool } from "./tools/get-orders.js";
import { getTickerTool } from "./tools/get-ticker.js";
import { getTradesTool } from "./tools/get-trades.js";
import { getWithdrawalTool } from "./tools/get-withdrawal.js";
import { listDepositAddressesTool } from "./tools/list-deposit-addresses.js";
import { listDepositsTool } from "./tools/list-deposits.js";
import { listWithdrawalAddressesTool } from "./tools/list-withdrawal-addresses.js";
import { listWithdrawalsTool } from "./tools/list-withdrawals.js";

async function main() {
	console.log("Initializing Upbit MCP Server...");

	const server = new FastMCP({
		name: "Upbit MCP Server",
		version: "0.0.1",
	});

	server.addTool(getTickerTool);
	server.addTool(getOrderbookTool);
	server.addTool(getTradesTool);
	server.addTool(getAccountsTool);
	server.addTool(createOrderTool);
	server.addTool(getOrdersTool);
	server.addTool(getOrderTool);
	server.addTool(cancelOrderTool);
	server.addTool(listWithdrawalAddressesTool);
	server.addTool(createWithdrawalTool);
	server.addTool(getWithdrawalTool);
	server.addTool(listWithdrawalsTool);
	server.addTool(cancelWithdrawalTool);
	server.addTool(getDepositChanceTool);
	server.addTool(createDepositAddressTool);
	server.addTool(getDepositAddressTool);
	server.addTool(listDepositAddressesTool);
	server.addTool(getDepositTool);
	server.addTool(listDepositsTool);

	try {
		await server.start({
			transportType: "stdio",
		});
		console.log("✅ Upbit MCP Server started (stdio)");
	} catch (error) {
		console.error("❌ Failed to start Upbit MCP Server:", error);
		process.exit(1);
	}
}

main().catch((error) => {
	console.error(
		"❌ An unexpected error occurred in the Upbit MCP Server:",
		error,
	);
	process.exit(1);
});
