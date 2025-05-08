#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { select, input, confirm } from '@inquirer/prompts';
import fileUtils from './utils/fileUtils.js';
import stringUtils from './utils/stringUtils.js';
import configUtils from './utils/configUtils.js';  

async function run() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Usage:
  node component-generator.js [--template your-template-folder]

Options:
  --template   Specify a custom template folder (default is 'template')

Example:
  node component-generator.js --template my-templates
`);
    process.exit(0);
  }

  const {
    toPascalCase,
    toCamelCase,
    getFinalHookName,
  } = stringUtils();

  const { 
    loadTemplateFromFile,
    findTemplateFile,
    findComponentFolder,
    ensureTemplateFolder
  } = fileUtils();

  const {
    loadConfig
  } = configUtils(); 

  const componentDir = await findComponentFolder(); 
  const config = await loadConfig();  
  const templateFolderArgIndex = args.indexOf('--template');
  const cliTemplateFolder = templateFolderArgIndex !== -1 ? args[templateFolderArgIndex + 1] : null;
  const templateFolder = cliTemplateFolder 
    || (config?.templatePath ?? 'template');

  const templatePath = path.isAbsolute(templateFolder)
    ? templateFolder
    : path.join(componentDir, templateFolder);

  let templateType = 'ts';

  if (config?.templatePath) {
    console.log(`⚙️ Using custom template path from config: ${templatePath}`);
  }
  if (cliTemplateFolder) {
    console.log(`⚙️ Using template path from CLI: ${templatePath}`);
  }

  if (config?.defaultLanguage) {
    templateType = config.defaultLanguage;
    console.log(`⚙️ Using default language from config: ${templateType === 'ts' ? 'TypeScript' : 'JavaScript'}`);
  } else if (!fs.existsSync(templatePath)) {
    templateType = await select({
      message: 'Which language are you using?',
      choices: [
        { name: 'TypeScript (.ts/.tsx)', value: 'ts' },
        { name: 'JavaScript (.js/.jsx)', value: 'js' },
      ],
    });
  }

  ensureTemplateFolder(templatePath, templateType);

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

  // --- Generate Page ---
  if (target === 'page' || target === 'both') {
    const pageName = toPascalCase(baseName);
    const pageFileName = `${toCamelCase(baseName)}.${templateType}`;
    const pageFilePath = path.join(folderPath, pageFileName);

    const pageTemplateFile = findTemplateFile(templatePath, withProps ? 'PageWithProps' : 'Page', ['.tsx', '.jsx']);
    if (!pageTemplateFile) {
      console.error('❌ No page template found.');
      return;
    }

    const pageTemplate = loadTemplateFromFile(pageTemplateFile, {
      __COMPONENT_NAME__: pageName,
    });
    if (!pageTemplate) {
      console.error('❌ Failed to load page template content.');
      return;
    }

    const indexContent = `export { default } from './${toCamelCase(baseName)}';\n`;

    fs.writeFileSync(pageFilePath, pageTemplate.trim());
    fs.writeFileSync(path.join(folderPath, `index.${templateType}`), indexContent);
    console.log(`✅ Created Page: ${pageFilePath}`);
    console.log(`✅ Created index.${templateType}`);
  }

  // --- Generate Hook ---
  if (target === 'hook' || target === 'both') {
    const hookName = getFinalHookName(baseName);
    const hookFileName = `${toCamelCase(baseName)}.hook.${templateType}`;
    const hookFilePath = path.join(folderPath, hookFileName);

    const hookTemplateFile = findTemplateFile(templatePath, withProps ? 'HookWithProps' : 'Hook', ['.ts', '.js']);
    if (!hookTemplateFile) {
      console.error('❌ No hook template found.');
      return;
    }

    const hookTemplate = loadTemplateFromFile(hookTemplateFile, {
      __HOOK_NAME__: hookName,
    });
    if (!hookTemplate) {
      console.error('❌ Failed to load hook template content.');
      return;
    }

    fs.writeFileSync(hookFilePath, hookTemplate.trim());
    console.log(`✅ Created Hook: ${hookFilePath}`);
  }

  console.log('🎉 Generation complete!');
}

run();
