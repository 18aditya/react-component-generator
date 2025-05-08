import fs from 'fs';
import path from 'path';
import { select, input, confirm } from '@inquirer/prompts';
import { templates as defaultTemplates } from './template/component.js';

// 1️⃣ Try to load custom templates
async function loadTemplates() {
  const configPath = path.join(process.cwd(), 'component-generator.config.js');
  if (fs.existsSync(configPath)) {
    try {
      const { customTemplates } = await import(configPath);
      console.log('✅ Loaded custom templates from component-generator.config.js');
      return { ...defaultTemplates, ...customTemplates };
    } catch (err) {
      console.error('⚠️ Failed to load custom templates. Using default templates.', err.message);
    }
  }
  return defaultTemplates;
}

function toPascalCase(str) {
  return str
    .replace(/(^\w|[-_]\w)/g, (match) => match.replace(/[-_]/, '').toUpperCase());
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
  const templates = await loadTemplates();  // 👈 Use merged templates

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
    fs.mkdirSync(folderPath, { recursive: true });
  }

  if (target === 'page' || target === 'both') {
    const pageName = toPascalCase(baseName);
    const pageFile = path.join(folderPath, `${toCamelCase(baseName)}.tsx`);
    const pageTemplate = withProps
      ? templates.pageWithProps(pageName)
      : templates.pageNoProps(pageName);
    const indexContent = `export { default } from './${toCamelCase(baseName)}';\n`;

    fs.writeFileSync(pageFile, pageTemplate.trim());
    fs.writeFileSync(path.join(folderPath, 'index.ts'), indexContent);
    console.log(`✅ Created Page: ${pageFile}`);
    console.log('✅ Created index.ts');
  }

  if (target === 'hook' || target === 'both') {
    const hookName = getFinalHookName(baseName);
    const hookFile = path.join(folderPath, `${toCamelCase(baseName)}.hook.ts`);
    const hookTemplate = withProps
      ? templates.hookWithProps(hookName)
      : templates.hookNoProps(hookName);
    fs.writeFileSync(hookFile, hookTemplate.trim());
    console.log(`✅ Created Hook: ${hookFile}`);
  }

  console.log('🎉 Generation complete!');
}

run();
