import { PuppeteerBrowser } from '@examples-ai/puppeteer-browser-serverless';
import { Readability } from '@paoramen/cheer-reader';
import { load } from 'cheerio';
import TurndownService from 'turndown';

export async function scrape(targetUrl: string) {
  try {
    if (!targetUrl) {
      throw new Error('Target URL is required');
    }

    const browser = new PuppeteerBrowser();
    const page = await browser.open(targetUrl);
    const html = await page.html();

    if (!html) {
      throw new Error('No content found');
    }

    const { content } = new Readability(load(html)).parse();

    if (!content) {
      throw new Error('No content found');
    }

    const turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      fence: '```',
    });

    const md = turndownService.turndown(content);

    return md;
  } catch (error) {
    console.error('Error scraping the page:', error);
  }

  return '';
}
