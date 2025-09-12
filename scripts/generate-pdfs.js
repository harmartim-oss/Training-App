/**
 * generate-pdfs.js - Enhanced Professional PDF Generator
 * Usage: node scripts/generate-pdfs.js
 *
 * This script:
 * - Converts all Markdown files under public/resources/*.md to professionally styled HTML
 * - Uses Puppeteer to render and save high-quality PDFs next to the .md files
 * - Includes professional branding, typography, and layout
 * - Supports tiered content for different subscription levels
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

const md = new MarkdownIt({ 
  html: true,
  linkify: true,
  typographer: true
});

const resourcesDir = path.join(__dirname, '..', 'public', 'resources');

// Professional PDF styling with Ontario Digital Defence Institute branding
const getProfessionalStyles = (tier = 'basic') => {
  const baseStyles = `
    /* Professional Typography & Layout */
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1a1d23;
      background: #ffffff;
      font-size: 11pt;
      counter-reset: page;
    }
    
    /* Professional Header */
    .pdf-header {
      background: linear-gradient(135deg, #0066FF 0%, #FF6B35 100%);
      color: white;
      padding: 25px 30px;
      margin: -20px -20px 30px -20px;
      position: relative;
      overflow: hidden;
    }
    
    .pdf-header::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      transform: translate(30px, -30px);
    }
    
    .header-content {
      position: relative;
      z-index: 2;
    }
    
    .institute-logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 14pt;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 8px;
      text-transform: uppercase;
    }
    
    .institute-tagline {
      font-size: 9pt;
      opacity: 0.9;
      font-weight: 300;
    }
    
    .document-title {
      font-size: 18pt;
      font-weight: 700;
      margin: 20px 0 5px 0;
    }
    
    .document-meta {
      font-size: 9pt;
      opacity: 0.8;
    }
    
    /* Enhanced Typography */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      color: #0066FF;
      margin: 24px 0 12px 0;
      page-break-after: avoid;
    }
    
    h1 { font-size: 20pt; border-bottom: 2px solid #0066FF; padding-bottom: 8px; }
    h2 { font-size: 16pt; border-bottom: 1px solid #E1E5E9; padding-bottom: 4px; }
    h3 { font-size: 14pt; }
    h4 { font-size: 12pt; }
    
    p {
      margin: 12px 0;
      text-align: justify;
      line-height: 1.7;
    }
    
    /* Professional Lists */
    ul, ol {
      margin: 12px 0 12px 20px;
      padding-left: 20px;
    }
    
    li {
      margin: 6px 0;
      line-height: 1.6;
    }
    
    ul li::marker {
      color: #0066FF;
      font-weight: bold;
    }
    
    /* Enhanced Code & Preformatted */
    pre, code {
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      background: #f8f9fb;
      border: 1px solid #e1e5e9;
      border-radius: 4px;
    }
    
    pre {
      padding: 16px;
      margin: 16px 0;
      overflow-x: auto;
      page-break-inside: avoid;
    }
    
    code {
      padding: 2px 6px;
      font-size: 9pt;
    }
    
    /* Professional Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      page-break-inside: avoid;
    }
    
    th, td {
      border: 1px solid #e1e5e9;
      padding: 12px;
      text-align: left;
      vertical-align: top;
    }
    
    th {
      background: linear-gradient(135deg, #0066FF 0%, #FF6B35 100%);
      color: white;
      font-weight: 600;
      font-size: 10pt;
    }
    
    tr:nth-child(even) td {
      background: #f8f9fb;
    }
    
    /* Checkboxes and Interactive Elements */
    input[type="checkbox"] {
      width: 14px;
      height: 14px;
      margin-right: 8px;
      accent-color: #0066FF;
    }
    
    /* Professional Callouts */
    .callout {
      background: #f0f7ff;
      border-left: 4px solid #0066FF;
      padding: 16px;
      margin: 20px 0;
      border-radius: 0 4px 4px 0;
      page-break-inside: avoid;
    }
    
    .callout.warning {
      background: #fff7e6;
      border-left-color: #FF6B35;
    }
    
    .callout.success {
      background: #f0fff4;
      border-left-color: #00C851;
    }
    
    /* Professional Footer */
    .pdf-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: #f8f9fb;
      border-top: 1px solid #e1e5e9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      font-size: 8pt;
      color: #5a6573;
      z-index: 1000;
    }
    
    .footer-left {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 500;
    }
    
    .footer-right::after {
      content: counter(page);
      font-weight: 600;
    }
    
    /* Page Layout */
    @page {
      size: A4;
      margin: 25mm 20mm 35mm 20mm;
    }
    
    body {
      margin: 0;
      padding: 20px;
      padding-bottom: 70px;
    }
    
    /* Page Breaks */
    .page-break {
      page-break-before: always;
    }
    
    .no-break {
      page-break-inside: avoid;
    }
    
    /* Professional Enhancements */
    .tier-badge {
      display: inline-block;
      background: linear-gradient(135deg, #0066FF 0%, #FF6B35 100%);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 8pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-left: 10px;
    }
    
    .premium-content {
      ${tier === 'basic' ? 'display: none;' : ''}
      background: linear-gradient(135deg, #f0f7ff 0%, #fff7e6 100%);
      border: 2px solid #0066FF;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      position: relative;
    }
    
    .premium-content::before {
      content: '💎 PREMIUM CONTENT';
      position: absolute;
      top: -10px;
      left: 20px;
      background: linear-gradient(135deg, #0066FF 0%, #FF6B35 100%);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    
    /* Print Optimizations */
    img {
      max-width: 100%;
      height: auto;
      page-break-inside: avoid;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    a {
      color: #0066FF;
      text-decoration: none;
      font-weight: 500;
    }
    
    a::after {
      content: " (" attr(href) ")";
      font-size: 8pt;
      color: #5a6573;
      font-weight: normal;
    }
    
    /* Mobile Optimization Markers */
    @media print {
      .pdf-header, .pdf-footer { -webkit-print-color-adjust: exact; }
    }
  `;
  
  return baseStyles;
};

async function renderProfessionalPdf(inputPath, outputPath, tier = 'basic') {
  const content = await fs.readFile(inputPath, 'utf8');
  const htmlBody = md.render(content);
  const fileName = path.basename(inputPath, '.md');
  const currentDate = new Date().toLocaleDateString('en-CA');
  
  // Add premium content sections for higher tiers
  const premiumContent = tier !== 'basic' ? `
    <div class="premium-content">
      <h3>🎯 Advanced Implementation Guide</h3>
      <p>This section provides advanced implementation strategies, real-world case studies, and expert insights available exclusively to Professional and Enterprise subscribers.</p>
      
      <h4>📊 Interactive Assessment Tools</h4>
      <ul>
        <li>Downloadable risk assessment matrices</li>
        <li>Compliance tracking spreadsheets</li>
        <li>Policy template customization guides</li>
      </ul>
      
      <h4>🤝 Expert Consultation Access</h4>
      <p>Premium subscribers get direct access to our cybersecurity experts for personalized guidance on implementation challenges.</p>
    </div>
  ` : '';
  
  const html = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${fileName} - ODDI Professional Resource</title>
        <style>${getProfessionalStyles(tier)}</style>
      </head>
      <body>
        <div class="pdf-header">
          <div class="header-content">
            <div class="institute-logo">🛡️ Ontario Digital Defence Institute</div>
            <div class="institute-tagline">Professional Cybersecurity Training & Certification</div>
            <div class="document-title">${fileName.replace(/_/g, ' ')}<span class="tier-badge">${tier.toUpperCase()}</span></div>
            <div class="document-meta">Generated: ${currentDate} | Version: 2.0 | Confidential</div>
          </div>
        </div>
        
        <div class="pdf-content">
          ${htmlBody}
          ${premiumContent}
          
          <div class="page-break"></div>
          <div class="callout">
            <h3>📞 Need Additional Support?</h3>
            <p><strong>Ontario Digital Defence Institute</strong> provides comprehensive cybersecurity training and consulting services.</p>
            <ul>
              <li><strong>Training:</strong> Professional certification programs</li>
              <li><strong>Consulting:</strong> Custom privacy and security assessments</li>
              <li><strong>Support:</strong> 24/7 expert guidance for subscribers</li>
            </ul>
            <p><strong>Contact:</strong> training@oddi.ca | <strong>Web:</strong> https://oddi.ca</p>
          </div>
        </div>
        
        <div class="pdf-footer">
          <div class="footer-left">© ${new Date().getFullYear()} Ontario Digital Defence Institute</div>
          <div class="footer-right">Page </div>
        </div>
      </body>
    </html>`;

  const browser = await puppeteer.launch({ 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: 'new'
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const pdfOptions = {
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { 
      top: '25mm', 
      bottom: '35mm', 
      left: '20mm', 
      right: '20mm' 
    },
    displayHeaderFooter: false,
    preferCSSPageSize: true
  };
  
  await page.pdf(pdfOptions);
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

    console.log('🎨 Generating professional PDFs with enhanced styling...\n');

    for (const f of mdFiles) {
      const input = path.join(resourcesDir, f);
      
      // Generate different tiers of PDFs
      const tiers = ['basic', 'professional', 'enterprise'];
      
      for (const tier of tiers) {
        const output = path.join(resourcesDir, f.replace(/\.md$/i, `_${tier}.pdf`));
        console.log(`📄 Rendering ${tier.toUpperCase()} PDF for ${f}...`);
        await renderProfessionalPdf(input, output, tier);
        console.log(`✅ Saved professional PDF: ${output}`);
      }
    }
    
    console.log('\n🎉 Professional PDF generation complete!');
    console.log('📊 Generated tiers: Basic, Professional, Enterprise');
    console.log('💼 Features: Professional branding, enhanced typography, premium content sections');
    
  } catch (err) {
    console.error('❌ Error generating PDFs:', err);
    process.exit(1);
  }
})();