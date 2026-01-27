# 📈 Upbit MCP Server

[![npm version](https://img.shields.io/npm/v/@iqai/mcp-upbit.svg)](https://www.npmjs.com/package/@iqai/mcp-upbit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 📖 Overview

Fast MCP server for interacting with [Upbit](https://upbit.com), South Korea's largest cryptocurrency exchange. This server provides comprehensive access to public market data and optional private trading tools including order management, deposits, and withdrawals.

By implementing the Model Context Protocol (MCP), this server allows Large Language Models (LLMs) to access real-time ticker data, orderbooks, trade history, and execute trading operations directly through their context window.

<a href="https://glama.ai/mcp/servers/@IQAIcom/mcp-upbit">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@IQAIcom/mcp-upbit/badge" alt="Upbit Server MCP server" />
</a>

## ✨ Features

*   **Public Market Data**: Access real-time ticker data, orderbook snapshots, and recent trades for any Upbit market.
*   **Account Management**: View account balances and positions (requires API key).
*   **Order Management**: Create, query, and cancel orders with support for limit, market, and price order types.
*   **Deposit Operations**: Check deposit eligibility, create deposit addresses, and track deposit history.
*   **Withdrawal Operations**: Create withdrawals, manage withdrawal addresses, and track withdrawal history.

## 📦 Installation

### 🚀 Using npx (Recommended)

To use this server without installing it globally:

```bash
npx @iqai/mcp-upbit
```

### 🔧 Build from Source

```bash
git clone https://github.com/IQAIcom/mcp-upbit.git
cd mcp-upbit
pnpm install
pnpm run build
```

## ⚡ Running with an MCP Client

Add the following configuration to your MCP client settings (e.g., `claude_desktop_config.json`).

### 📋 Minimal Configuration (Public Data Only)

```json
{
  "mcpServers": {
    "upbit": {
      "command": "npx",
      "args": ["-y", "@iqai/mcp-upbit"],
      "env": {
        "UPBIT_SERVER_URL": "https://api.upbit.com"
      }
    }
  }
}
```

### ⚙️ Full Configuration (With Trading Enabled)

```json
{
  "mcpServers": {
    "upbit": {
      "command": "npx",
      "args": ["-y", "@iqai/mcp-upbit"],
      "env": {
        "UPBIT_SERVER_URL": "https://api.upbit.com",
        "UPBIT_ACCESS_KEY": "your_access_key_here",
        "UPBIT_SECRET_KEY": "your_secret_key_here",
        "UPBIT_ENABLE_TRADING": "true"
      }
    }
  }
}
```

## 🔐 Configuration (Environment Variables)

| Variable | Required | Description | Default |
| :--- | :--- | :--- | :--- |
| `UPBIT_SERVER_URL` | No | Upbit API server URL | `https://api.upbit.com` |
| `UPBIT_ACCESS_KEY` | For trading | Your Upbit API access key | - |
| `UPBIT_SECRET_KEY` | For trading | Your Upbit API secret key | - |
| `UPBIT_ENABLE_TRADING` | For trading | Enable private trading tools | `false` |

### 🔑 Where to Get Upbit API Keys

1. Create an account on [Upbit](https://upbit.com) if you don't already have one
2. Go to the [Upbit Developer Center](https://upbit.com/service_center/open_api_guide)
3. Create a new API key
4. Set appropriate permissions (read, trade, withdraw as needed)
5. Store your API keys in the environment variables

### 🔒 Security & Permissions

- Keep your `UPBIT_SECRET_KEY` private and IP-allowlist your server in Upbit.
- Set `UPBIT_ENABLE_TRADING=true` only when you intend to place/cancel orders or create withdrawals/deposit addresses.
- Upbit permission mapping:
  - Orders: create/cancel → 주문하기, query/list → 주문조회
  - Accounts/balances → 자산조회
  - Withdrawals: create/cancel → 출금하기, query/list/address list → 출금조회
  - Deposits: create deposit address → 입금하기, query/list/chance/address read → 입금조회

**Documentation:**
- [Auth Reference](https://docs.upbit.com/kr/reference/auth)
- [Orders Reference](https://docs.upbit.com/kr/reference/new-order)
- [Withdrawals Reference](https://docs.upbit.com/kr/reference/withdraw)
- [Deposits Reference](https://docs.upbit.com/kr/reference/available-deposit-information)

## 💡 Usage Examples

### 📊 Market Data
*   "What is the current price of Bitcoin on Upbit (KRW-BTC)?"
*   "Show me the orderbook for Ethereum (KRW-ETH)."
*   "Get the recent trades for XRP (KRW-XRP)."

### 💼 Account & Orders (Requires API Key)
*   "What are my current account balances?"
*   "Place a limit buy order for 0.01 BTC at 50,000,000 KRW."
*   "Cancel my pending order with UUID xyz123."
*   "Show me my open orders for KRW-BTC."

### 💳 Deposits & Withdrawals (Requires API Key)
*   "Create a deposit address for BTC."
*   "List my recent deposits."
*   "Withdraw 1 ETH to my wallet address."
*   "Check the status of my withdrawal."

## 🛠️ MCP Tools

<!-- AUTO-GENERATED TOOLS START -->

### `CANCEL_ORDER`
Cancel an Upbit order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ | Order UUID to cancel |

### `CANCEL_WITHDRAWAL`
Cancel a pending Upbit withdrawal (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ | Withdrawal UUID to cancel |

### `CREATE_DEPOSIT_ADDRESS`
Create a deposit address for a currency (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ | Currency code (e.g., BTC) |
| `net_type` | string | ✅ | Network type |

### `CREATE_ORDER`
Create an Upbit order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Market code (e.g., KRW-BTC) |
| `side` | string | ✅ | Order side: bid (buy) or ask (sell) |
| `ord_type` | string | ✅ | Order type: limit, price, or market |
| `volume` | string |  | Order volume (required for limit/market sell) |
| `price` | string |  | Order price (required for limit/market buy) |
| `time_in_force` | string |  | Time in force: ioc, fok, or post_only |
| `smp_type` | string |  | Self-match prevention: cancel_maker, cancel_taker, or reduce |
| `identifier` | string |  | Custom order identifier |

### `CREATE_WITHDRAWAL`
Create an Upbit withdrawal (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ | Currency code |
| `amount` | string | ✅ | Withdrawal amount |
| `address` | string | ✅ | Destination address |
| `net_type` | string | ✅ | Network type |
| `secondary_address` | string |  | Secondary address (memo/tag) |
| `transaction_type` | string |  | Transaction type |

### `GET_ACCOUNTS`
Get Upbit account balances (requires private API enabled)

_No parameters_

### `GET_DEPOSIT`
Get details of a specific deposit (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ | Deposit UUID |

### `GET_DEPOSIT_ADDRESS`
Get deposit address for a currency (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ | Currency code |
| `net_type` | string | ✅ | Network type |

### `GET_DEPOSIT_CHANCE`
Get deposit eligibility for a currency (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ | Currency code |
| `net_type` | string |  | Network type |

### `GET_ORDER`
Get details of a specific order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string |  | Order UUID |
| `identifier` | string |  | Custom order identifier |

### `GET_ORDERBOOK`
Get orderbook snapshot from Upbit for a single market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_ORDERS`
Get list of orders (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `market` | string |  |  | Market code filter |
| `state` | string |  |  | Order state: wait, watch, done, cancel |
| `page` | number |  | 1 | Page number |
| `limit` | number |  | 100 | Items per page |

### `GET_TICKER`
Get the latest ticker data from Upbit for a single market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_TRADES`
Get recent trades from Upbit for a single market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_WITHDRAWAL`
Get details of a specific withdrawal (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ | Withdrawal UUID |

### `LIST_DEPOSIT_ADDRESSES`
List all deposit addresses (requires private API)

_No parameters_

### `LIST_DEPOSITS`
List deposit history (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `currency` | string |  |  | Currency code filter |
| `state` | string |  |  | Deposit state filter |
| `page` | number |  | 1 | Page number |
| `limit` | number |  | 100 | Items per page |

### `LIST_WITHDRAWAL_ADDRESSES`
List withdrawal addresses (requires private API)

_No parameters_

### `LIST_WITHDRAWALS`
List withdrawal history (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `currency` | string |  |  | Currency code filter |
| `state` | string |  |  | Withdrawal state filter |
| `page` | number |  | 1 | Page number |
| `limit` | number |  | 100 | Items per page |

<!-- AUTO-GENERATED TOOLS END -->

## 👨‍💻 Development

### 🏗️ Build Project
```bash
pnpm run build
```

### 👁️ Development Mode (Watch)
```bash
pnpm run watch
```

### ✅ Linting & Formatting
```bash
pnpm run lint
pnpm run format
```

### 🧪 Testing with MCP Inspector
```bash
pnpm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

### 📁 Project Structure
*   `src/tools/`: Individual tool definitions
*   `src/lib/`: Configuration, HTTP client, and authentication utilities
*   `src/index.ts`: Server entry point

## 📚 Resources

*   [Upbit API Documentation](https://docs.upbit.com)
*   [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
*   [Upbit Platform](https://upbit.com)

## ⚠️ Disclaimer

This project interacts with the Upbit cryptocurrency exchange API. Trading in cryptocurrencies involves significant risk. Users should exercise caution and verify all data independently. The authors are not responsible for any financial losses incurred through the use of this software.

## 📄 License

[MIT](LICENSE)
