# Upbit MCP Server (TypeScript)

Fast MCP server for interacting with Upbit. Provides public market data tools and optional private trading tools.

## Requirements

- Node.js 18+
- pnpm 8+

## Install

```bash
pnpm install
```

## Environment

Copy and edit `.env`:

```bash
cp .env.example .env
```

`.env.example`:

```bash
UPBIT_SERVER_URL=https://api.upbit.com
UPBIT_ACCESS_KEY=
UPBIT_SECRET_KEY=
UPBIT_ENABLE_TRADING=false
```

Private tools require `UPBIT_ACCESS_KEY`, `UPBIT_SECRET_KEY`, and `UPBIT_ENABLE_TRADING=true`.

### Where to get Upbit API keys

Before you begin, you need to get your Upbit API keys:

1. Create an account on [Upbit](https://upbit.com) if you don't already have one
2. Go to the [Upbit Developer Center](https://upbit.com/service_center/open_api_guide)
3. Create a new API key
4. Make sure to set appropriate permissions (read, trade, withdraw as needed)
5. Store your API keys(`UPBIT_ACCESS_KEY`, `UPBIT_SECRET_KEY`) in the `.env` file (see Installation section) set `UPBIT_ENABLE_TRADING=true` to enable private tools.

## Build & Run

```bash
pnpm run build
pnpm run start
```

For easier testing use this (in project root):

```bash
pnpm run build
npx @modelcontextprotocol/inspector node dist/index.js
```

If installed globally or via npx, you can also run the bin:

```bash
mcp-upbit-server
```

Runs over stdio for MCP clients.

## Tools

Public:

- `GET_TICKER` — latest ticker for a market. Params: `{ "market": "KRW-BTC" }`
- `GET_ORDERBOOK` — orderbook snapshot. Params: `{ "market": "KRW-BTC" }`
- `GET_TRADES` — recent trades. Params: `{ "market": "KRW-BTC" }`

Private (requires env and enable flag):

- `GET_ACCOUNTS`
- `GET_ORDERS` — `{ market?, state?, page?, limit? }`
- `GET_ORDER` — `{ uuid? , identifier? }`
- `CREATE_ORDER` — `{ market, side, ord_type, volume?, price? }`
- `CANCEL_ORDER` — `{ uuid }`

All tool outputs are JSON strings for easy display.

## License

MIT
