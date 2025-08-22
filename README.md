# mcp-server-puppeteer-scrape

A Model Context Protocol (MCP) server implementation built with Next.js API Routes and the Vercel MCP Adapter.

## Features

- **API-only Next.js Application**: Optimized for API routes without unnecessary frontend components
- **MCP Server Implementation**: Uses `@vercel/mcp-adapter` for easy integration
- **Example Tools**: Includes sample tools (echo, get_time, calculate) to demonstrate MCP capabilities
- **Biome v2.2**: Modern, fast linting and formatting with Biome instead of ESLint/Prettier
- **TypeScript**: Full TypeScript support for type safety

## Tech Stack

- Next.js 15.5.0 (latest)
- TypeScript
- @vercel/mcp-adapter
- @modelcontextprotocol/sdk
- Biome v2.2.0 for linting and formatting

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The server will start on [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run check` - Run Biome check with auto-fix

## API Endpoints

The server supports multiple transport methods through dynamic routing:

### `/api/mcp` - Streamable HTTP Transport

Standard HTTP endpoint for MCP requests.

### `/api/sse` - Server-Sent Events Transport

SSE endpoint for real-time streaming responses.

### `/api/message` - SSE Message Endpoint

Message endpoint for SSE transport.

## Available MCP Tools

1. **echo** - Echoes back the input message

   - Parameters: `message` (string)

2. **get_time** - Returns the current time in specified timezone

   - Parameters: `timezone` (string, optional, default: "UTC")

3. **calculate** - Performs basic arithmetic operations
   - Parameters:
     - `operation` (enum: "add", "subtract", "multiply", "divide")
     - `a` (number)
     - `b` (number)

## Example Usage

```bash
# Call echo tool via HTTP transport
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "echo",
      "arguments": {
        "message": "Hello, MCP!"
      }
    },
    "id": 1
  }'

# Call calculate tool
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "calculate",
      "arguments": {
        "operation": "add",
        "a": 10,
        "b": 20
      }
    },
    "id": 1
  }'
```

## Project Structure

```
mcp-nextjs-server/
├── app/
│   ├── api/
│   │   └── [transport]/
│   │       └── route.ts     # Dynamic MCP endpoint handler
│   ├── layout.tsx           # Minimal root layout
│   └── page.tsx             # Simple info page
├── biome.json               # Biome configuration
├── next.config.ts           # Next.js configuration
├── package.json
└── tsconfig.json
```

## License

MIT
