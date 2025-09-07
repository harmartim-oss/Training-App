#!/usr/bin/env node

/**
 * verify-deployment.js
 * Usage: node scripts/verify-deployment.js
 *
 * This script verifies that the deployment is ready for GitHub Pages by:
 * - Checking that the dist folder exists and contains required files
 * - Verifying that assets use the correct base path
 * - Ensuring resources are properly copied
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

async function verifyDeployment() {
  console.log('🔍 Verifying deployment readiness for GitHub Pages...\n');

  try {
    // Check if dist folder exists
    if (!await fs.pathExists(distDir)) {
      console.error('❌ dist folder not found. Run `npm run build` first.');
      process.exit(1);
    }

    // Check required files
    const requiredFiles = ['index.html', '404.html'];
    const requiredDirs = ['assets', 'resources'];

    for (const file of requiredFiles) {
      const filePath = path.join(distDir, file);
      if (!await fs.pathExists(filePath)) {
        console.error(`❌ Required file missing: ${file}`);
        process.exit(1);
      }
      console.log(`✅ Found required file: ${file}`);
    }

    for (const dir of requiredDirs) {
      const dirPath = path.join(distDir, dir);
      if (!await fs.pathExists(dirPath)) {
        console.error(`❌ Required directory missing: ${dir}`);
        process.exit(1);
      }
      console.log(`✅ Found required directory: ${dir}`);
    }

    // Check base path in index.html
    const indexPath = path.join(distDir, 'index.html');
    const indexContent = await fs.readFile(indexPath, 'utf8');
    
    if (!indexContent.includes('/Training-App/assets/')) {
      console.error('❌ Base path not correctly set in index.html');
      process.exit(1);
    }
    console.log('✅ Base path correctly set in index.html');

    // Check resources
    const resourcesDir = path.join(distDir, 'resources');
    const resourceFiles = await fs.readdir(resourcesDir);
    const expectedResources = [
      'PIA_Checklist.md', 'PIA_Checklist.pdf',
      'Breach_Notification_Templates.md', 'Breach_Notification_Templates.pdf',
      'Microlearning_Modules.md', 'Microlearning_Modules.pdf'
    ];

    for (const resource of expectedResources) {
      if (!resourceFiles.includes(resource)) {
        console.error(`❌ Missing resource: ${resource}`);
        process.exit(1);
      }
    }
    console.log(`✅ All ${expectedResources.length} resources found`);

    // Check 404.html redirect
    const notFoundPath = path.join(distDir, '404.html');
    const notFoundContent = await fs.readFile(notFoundPath, 'utf8');
    
    if (!notFoundContent.includes('/Training-App/')) {
      console.error('❌ 404.html redirect path not correctly set');
      process.exit(1);
    }
    console.log('✅ 404.html redirect correctly configured');

    console.log('\n🎉 Deployment verification successful!');
    console.log('📦 Ready for GitHub Pages deployment at: https://harmartim-oss.github.io/Training-App/');

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    process.exit(1);
  }
}

verifyDeployment();