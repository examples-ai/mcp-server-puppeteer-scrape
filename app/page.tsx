export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>MCP Next.js Server</h1>
      <p>This is an API-only Next.js server for Model Context Protocol.</p>
      <p>Available endpoints:</p>
      <ul>
        <li>/api/mcp - Streamable HTTP transport</li>
        <li>/api/sse - Server-Sent Events transport</li>
        <li>/api/message - SSE message endpoint</li>
      </ul>
      <p>Available tools:</p>
      <ul>
        <li>echo - Echo back messages</li>
        <li>get_time - Get current time in any timezone</li>
        <li>calculate - Perform arithmetic operations</li>
      </ul>
    </div>
  );
}
