# mcp-server-puppeteer-scrape

An MCP server that provides web scraping capabilities using Puppeteer to extract content from websites and convert it to Markdown format.

## Why Puppeteer?

Unlike simple HTTP-based scrapers, Puppeteer uses a real browser engine to:

- **Render JavaScript-heavy websites**: Captures content generated dynamically by JavaScript frameworks (React, Vue, Angular)
- **Handle client-side rendering**: Waits for AJAX calls and lazy-loaded content
- **Access interactive elements**: Extracts content that only appears after user interactions
- **Bypass anti-scraping measures**: Appears as a real browser to websites
- **Capture the final DOM**: Gets the fully rendered page as users would see it

## Installation

```bash
pnpm install
pnpm dev
```

## Usage as MCP Server

### Configure in Claude Desktop

Add to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "puppeteer-scrape": {
      "command": "pnpm",
      "args": ["dev"],
      "cwd": "/path/to/mcp-server-puppeteer-scrape"
    }
  }
}
```

Restart Claude Desktop after updating the configuration.

## Available MCP Tool

**scrape** - Scrape a webpage and convert it to Markdown powered by Puppeteer
   - Parameters: 
     - `url` (string) - URL of the webpage to scrape
   - Returns: Markdown-formatted content extracted from the webpage

## Testing with curl

```bash
# Test the scrape tool
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "scrape",
      "arguments": {
        "url": "https://example.com"
      }
    },
    "id": 1
  }'

# Scrape a JavaScript-heavy site
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "scrape",
      "arguments": {
        "url": "https://news.ycombinator.com"
      }
    },
    "id": 2
  }'
```

## License

MIT
