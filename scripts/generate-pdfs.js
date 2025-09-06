/**
 * generate-pdfs.js
 * Usage: node scripts/generate-pdfs.js
 *
 * This script:
 * - Converts all Markdown files under public/resources/*.md to simple HTML
 * - Uses Puppeteer to render and save PDFs next to the .md files
 *
 * Dependencies:
 *   npm install markdown-it puppeteer fs-extra
 */

import fs from 'fs-extra';
import path from 'path';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const md = new MarkdownIt({ html: true });
const resourcesDir = path.join(__dirname, '..', 'public', 'resources');

async function renderPdf(inputPath, outputPath) {
  const content = await fs.readFile(inputPath, 'utf8');
  const htmlBody = md.render(content);
  const html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${path.basename(inputPath)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; margin: 40px; color: #111; }
          img { max-width: 100%; }
          pre { background: #f4f4f4; padding: 8px; overflow-x: auto; }
          table { border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; padding: 6px; }
          h1,h2,h3 { color: #0b5; }
        </style>
      </head>
      <body>${htmlBody}</body>
    </html>`;

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true, margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
  await browser.close();
}

(async () => {
  try {
    await fs.ensureDir(resourcesDir);
    const entries = await fs.readdir(resourcesDir);
    const mdFiles = entries.filter(f => f.toLowerCase().endsWith('.md'));
    if (mdFiles.length === 0) {
      console.log('No markdown files found in', resourcesDir);
      process.exit(0);
    }

    for (const f of mdFiles) {
      const input = path.join(resourcesDir, f);
      const output = path.join(resourcesDir, f.replace(/\.md$/i, '.pdf'));
      console.log('Rendering PDF for', input);
      await renderPdf(input, output);
      console.log('Saved PDF to', output);
    }
    console.log('Done.');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();