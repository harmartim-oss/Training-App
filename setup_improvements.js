const fs = require('fs');
const { exec } = require('child_process');

// Define the new files to be created
const files = [
  {
    path: 'src/services/StorageService.ts',
    content: `
export class StorageService {
  private KEY = 'pia_app_data';

  save(data: any) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
    console.log('Saved to local storage');
  }

  load() {
    return JSON.parse(localStorage.getItem(this.KEY) || 'null');
  }

  clear() {
    localStorage.removeItem(this.KEY);
  }
}`
  },
  {
    path: 'src/utils/PdfExporter.ts',
    content: `
import { jsPDF } from "jspdf";

export function exportReport(title: string, content: string) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text(title, 10, 20);
  doc.setFontSize(12);
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 10, 40);
  doc.save("report.pdf");
}`
  },
  {
    path: 'public/manifest.json',
    content: `{
  "name": "Privacy Training App",
  "short_name": "PrivacyApp",
  "start_url": "./index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2c3e50",
  "icons": []
}`
  },
  {
    path: 'CONTRIBUTING.md',
    content: `# Contributing\n\nRun \`npm install\` to start. Pull requests welcome!`
  }
];

// Create directories if they don't exist
['src/services', 'src/utils', 'public'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Write files
files.forEach(f => {
  fs.writeFileSync(f.path, f.content);
  console.log(`✅ Created ${f.path}`);
});

// Install jsPDF
console.log("📦 Installing dependencies...");
exec('npm install jspdf', (err, stdout, stderr) => {
  if (err) console.error(err);
  else console.log("✅ Installed jspdf. Ready to go!");
});
