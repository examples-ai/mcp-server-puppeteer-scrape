import { createMcpHandler, withMcpAuth } from '@vercel/mcp-adapter';
import { config } from 'dotenv';
import { z } from 'zod';
import { scrape } from '../../lib/scrape';

config();

console.log('Auth keys:', process.env.PUPPETEER_SCRAPE_AUTH_KEYS);

const authKeys = () => {
  try {
    return (process.env.PUPPETEER_SCRAPE_AUTH_KEYS ?? '')
      .split(',')
      .map((key) => key.trim());
  } catch (error) {
    console.error('Failed to parse auth keys:', error);
    return [];
  }
};

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

const verifyToken = async (req: Request, bearerToken?: string) => {
  try {
    console.log('Verifying token...', bearerToken);

    if (!bearerToken) {
      throw new Error('No token provided');
    }

    const keys = authKeys();
    console.log('Auth keys:', keys);

    if (!keys.includes(bearerToken)) {
      throw new Error('Invalid token');
    }

    return {
      token: bearerToken,
      scopes: ['read:stuff'],
      clientId: req.headers.get('x-client-id') || 'unknown-client',
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const handleWithAuth = withMcpAuth(handler, verifyToken, {
  required: true,
  requiredScopes: ['read:stuff'],
});

export { handleWithAuth as GET, handleWithAuth as POST };
