/**
 * apply_improvements.js
 * 
 * Run this script with: node apply_improvements.js
 * It will:
 * 1. Install 'jspdf'
 * 2. Create the StorageService and PdfExporter files
 * 3. Create manifest.json and CONTRIBUTING.md
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// --- Configuration ---
const dirsToCreate = [
    'src/services',
    'src/utils',
    'public' // Ensure public exists for manifest
];

const filesToCreate = [
    {
        path: 'src/services/StorageService.ts',
        content: `export class StorageService {
  private STORAGE_KEY = 'training_app_progress';

  /**
   * Save the current state of the application
   */
  public saveState(data: any): void {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this.STORAGE_KEY, serialized);
      console.log('Progress saved locally.');
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  }

  /**
   * Load saved data when the app starts
   */
  public loadState(): any | null {
    try {
      const serialized = localStorage.getItem(this.STORAGE_KEY);
      return serialized ? JSON.parse(serialized) : null;
    } catch (error) {
      console.error('Error loading from local storage', error);
      return null;
    }
  }

  public clearState(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}`
    },
    {
        path: 'src/utils/PdfExporter.ts',
        content: `import { jsPDF } from "jspdf";

export const downloadReport = (title: string, contentLines: string[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(title, 10, 20);
  
  doc.setFontSize(10);
  doc.text(\`Generated on: \${new Date().toLocaleString()}\`, 10, 30);
  
  doc.setFontSize(12);
  let y = 50;
  
  contentLines.forEach((line) => {
    if (y > 280) { doc.addPage(); y = 20; }
    const splitText = doc.splitTextToSize(line, 180);
    doc.text(splitText, 10, y);
    y += (splitText.length * 7);
  });
  
  doc.save(\`\${title.replace(/\\s+/g, '_')}.pdf\`);
};`
    },
    {
        path: 'public/manifest.json',
        content: `{
  "name": "Data Privacy Training App",
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
        content: `# Contributing to Training-App

1. **Clone**: \`git clone https://github.com/harmartim-oss/Training-App.git\`
2. **Install**: \`npm install\`
3. **Run**: \`npm start\`

## How to add Content
- Update \`src/data/questions.json\` to add new questions.
- Pull Requests are welcome!`
    }
];

// --- Execution ---

console.log("🚀 Starting improvements setup...");

// 1. Create Directories
dirsToCreate.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
    }
});

// 2. Create Files
filesToCreate.forEach(file => {
    fs.writeFileSync(file.path, file.content);
    console.log(`✅ Created file: ${file.path}`);
});

// 3. Install jsPDF
console.log("📦 Installing 'jspdf' dependency...");
exec('npm install jspdf', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Error installing dependencies: ${error.message}`);
        return;
    }
    console.log("✅ Dependencies installed.");
    console.log("\n🎉 Setup complete! You just need to import these services in your App.ts now.");
});
