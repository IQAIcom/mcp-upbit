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
Cancel an existing Upbit order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ |  |

### `CANCEL_WITHDRAWAL`
Cancel a digital asset withdrawal by UUID (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ |  |

### `CREATE_DEPOSIT_ADDRESS`
Request creation of a deposit address (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ |  |
| `net_type` | string | ✅ |  |

### `CREATE_ORDER`
Create an Upbit order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ |  |
| `side` | string | ✅ |  |
| `ord_type` | string | ✅ |  |
| `volume` | string |  |  |
| `price` | string |  |  |
| `time_in_force` | string |  |  |
| `smp_type` | string |  |  |
| `identifier` | string |  |  |

### `CREATE_WITHDRAWAL`
Request a digital asset withdrawal (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ |  |
| `amount` | string | ✅ |  |
| `address` | string | ✅ |  |
| `net_type` | string | ✅ |  |
| `secondary_address` | string |  |  |
| `transaction_type` | string |  |  |

### `GET_ACCOUNTS`
Get Upbit account balances (requires private API enabled)

_No parameters_

### `GET_DEPOSIT`
Get a single deposit by UUID (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ |  |

### `GET_DEPOSIT_ADDRESS`
Get a single deposit address for a currency and net_type (private)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ |  |
| `net_type` | string | ✅ |  |

### `GET_DEPOSIT_CHANCE`
Get deposit availability information for a currency (private)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `currency` | string | ✅ |  |
| `net_type` | string |  |  |

### `GET_ORDER`
Get a single Upbit order (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string |  |  |
| `identifier` | string |  |  |

### `GET_ORDERBOOK`
Get orderbook snapshot for a given market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_ORDERS`
List Upbit orders (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `market` | string |  |  |  |
| `state` | string |  | "wait" |  |
| `page` | integer |  | 1 |  |
| `limit` | integer |  | 100 |  |

### `GET_TICKER`
Get the latest ticker data from Upbit for a single market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_TRADES`
Get recent trades for a market

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `market` | string | ✅ | Upbit market code, e.g., KRW-BTC |

### `GET_WITHDRAWAL`
Get a single withdrawal by UUID (requires private API)

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `uuid` | string | ✅ |  |

### `LIST_DEPOSIT_ADDRESSES`
List deposit addresses for all currencies (requires private API)

_No parameters_

### `LIST_DEPOSITS`
List deposits (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `currency` | string |  |  |  |
| `state` | string |  |  |  |
| `page` | integer |  | 1 |  |
| `limit` | integer |  | 50 |  |

### `LIST_WITHDRAWAL_ADDRESSES`
List registered withdrawal-allowed addresses (requires private API)

_No parameters_

### `LIST_WITHDRAWALS`
List withdrawals (requires private API)

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `currency` | string |  |  |  |
| `state` | string |  |  |  |
| `page` | integer |  | 1 |  |
| `limit` | integer |  | 50 |  |

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
