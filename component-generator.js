#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { select, input, confirm } from '@inquirer/prompts';
import { templates } from './template/component.js';

function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, g1) => g1.toUpperCase())
    .replace(/^(.)/, (_, g1) => g1.toUpperCase());
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function getFinalHookName(baseName) {
  const pascal = toPascalCase(baseName);
  return `use${pascal}`;
}

async function run() {
  const baseName = await input({ message: "What's the base name (e.g., userProfile)?" });
  const target = await select({
    message: 'What do you want to generate?',
    choices: [
      { name: 'Page only', value: 'page' },
      { name: 'Hook only', value: 'hook' },
      { name: 'Both Page + Hook', value: 'both' },
    ],
  });
  const withProps = await confirm({ message: 'Generate with props?' });

  const folderName = toPascalCase(baseName);
  const folderPath = path.join(process.cwd(), folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  if (target === 'page' || target === 'both') {
    const pageName = toPascalCase(baseName);
    const pageFile = path.join(folderPath, `${toCamelCase(baseName)}.tsx`);
    const pageTemplate = withProps ? templates.pageWithProps(pageName) : templates.pageNoProps(pageName);
    const indexContent = `export { default } from './${toCamelCase(baseName)}';\n`;

    fs.writeFileSync(pageFile, pageTemplate.trim());
    fs.writeFileSync(path.join(folderPath, 'index.ts'), indexContent);
    console.log(`✅ Created Page: ${pageFile}`);
    console.log('✅ Created index.ts');
  }

  if (target === 'hook' || target === 'both') {
    const hookName = getFinalHookName(baseName);
    const hookFile = path.join(folderPath, `${toCamelCase(baseName)}.hook.ts`);
    const hookTemplate = withProps ? templates.hookWithProps(hookName) : templates.hookNoProps(hookName);
    fs.writeFileSync(hookFile, hookTemplate.trim());
    console.log(`✅ Created Hook: ${hookFile}`);
  }

  console.log('🎉 Generation complete!');
}

run();
