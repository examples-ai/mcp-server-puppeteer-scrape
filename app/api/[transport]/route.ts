import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
import { scrape } from '../../lib/scrape';

const handler = createMcpHandler(
  (server) => {
    server.tool(
      'scrape',
      'Scrape a webpage and convert it to Markdown powered by Puppeteer',
      {
        url: z.string().describe('URL of the webpage to scrape'),
      },
      async ({ url }) => {
        const markdown = await scrape(url);
        return {
          content: [{ type: 'text', text: markdown }],
        };
      }
    );
  },
  undefined, // Server options (optional)
  {
    basePath: '/api',
    maxDuration: 60,
    verboseLogs: false,
  }
);

export { handler as GET, handler as POST };
