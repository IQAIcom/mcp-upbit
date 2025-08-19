# Upbit MCP Server (TypeScript)

Fast MCP server for interacting with Upbit. Provides public market data tools and optional private trading tools.

<a href="https://glama.ai/mcp/servers/@IQAIcom/mcp-upbit">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@IQAIcom/mcp-upbit/badge" alt="Upbit Server MCP server" />
</a>

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

### Security & permissions

- Keep your `UPBIT_SECRET_KEY` private and IP-allowlist your server in Upbit.
- Set `UPBIT_ENABLE_TRADING=true` only when you intend to place/cancel orders or create withdrawals/deposit addresses.
- Upbit permission mapping (high-level):
  - Orders: create/cancel → 주문하기, query/list → 주문조회
  - Accounts/balances → 자산조회
  - Withdrawals: create/cancel → 출금하기, query/list/address list → 출금조회
  - Deposits: create deposit address → 입금하기, query/list/chance/address read → 입금조회
  - Auth follows Upbit JWT with `query_hash` (sorted URL-encoded params). POSTs send JSON bodies and are signed based on that body.
  - See docs: 인증, 주문 생성, 출금/입금 레퍼런스
    - Auth: [docs.upbit.com/kr/reference/auth](https://docs.upbit.com/kr/reference/auth)
    - Orders: [docs.upbit.com/kr/reference/new-order](https://docs.upbit.com/kr/reference/new-order)
    - Withdrawals: [list-withdrawal-addresses](https://docs.upbit.com/kr/reference/list-withdrawal-addresses), [withdraw](https://docs.upbit.com/kr/reference/withdraw)
    - Deposits: [available-deposit-information](https://docs.upbit.com/kr/reference/available-deposit-information), [create-deposit-address](https://docs.upbit.com/kr/reference/create-deposit-address)

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
- `LIST_WITHDRAWAL_ADDRESSES`
- `CREATE_WITHDRAWAL` — `{ currency, amount, address, net_type, secondary_address? , transaction_type? }`
- `GET_WITHDRAWAL` — `{ uuid }`
- `LIST_WITHDRAWALS` — `{ currency?, state?, page?, limit? }`
- `CANCEL_WITHDRAWAL` — `{ uuid }`
- `GET_DEPOSIT_CHANCE` — `{ currency, net_type? }`
- `CREATE_DEPOSIT_ADDRESS` — `{ currency, net_type }`
- `GET_DEPOSIT_ADDRESS` — `{ currency, net_type }`
- `LIST_DEPOSIT_ADDRESSES`
- `GET_DEPOSIT` — `{ uuid }`
- `LIST_DEPOSITS` — `{ currency?, state?, page?, limit? }`

All tool outputs are JSON strings for easy display.

### Examples

```json
// CREATE_ORDER (market buy 10,000 KRW)
{
  "name": "CREATE_ORDER",
  "arguments": {
    "market": "KRW-BTC",
    "side": "bid",
    "ord_type": "price",
    "price": "10000"
  }
}
```

```json
// CREATE_ORDER (limit sell with post_only)
{
  "name": "CREATE_ORDER",
  "arguments": {
    "market": "KRW-BTC",
    "side": "ask",
    "ord_type": "limit",
    "volume": "0.01",
    "price": "100000000",
    "time_in_force": "post_only",
    "identifier": "my-unique-id-001"
  }
}
```

```json
// LIST_WITHDRAWALS (page 1, 50 items)
{
  "name": "LIST_WITHDRAWALS",
  "arguments": { "page": 1, "limit": 50 }
}
```

```json
// GET_DEPOSIT_CHANCE
{
  "name": "GET_DEPOSIT_CHANCE",
  "arguments": { "currency": "BTC" }
}
```

## License

MIT