#!/usr/bin/env node
import { FastMCP } from "fastmcp";
import { cancelOrderTool } from "./tools/cancel-order.js";
import { createOrderTool } from "./tools/create-order.js";
import { getAccountsTool } from "./tools/get-accounts.js";
import { getOrderTool } from "./tools/get-order.js";
import { getOrderbookTool } from "./tools/get-orderbook.js";
import { getOrdersTool } from "./tools/get-orders.js";
import { getTickerTool } from "./tools/get-ticker.js";
import { getTradesTool } from "./tools/get-trades.js";

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
