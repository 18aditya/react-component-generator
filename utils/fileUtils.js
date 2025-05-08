import fs from 'fs';
import path from 'path';
import { defaultTemplatesTS } from '../constants/defaultTemplatesTS.js';
import { defaultTemplatesJS } from '../constants/defaultTemplatesJS.js';

export default function fileUtils() {

  function loadTemplateFromFile(filePath, replacements = {}) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Template file not found: ${filePath}`);
      return null;
    }
    let content = fs.readFileSync(filePath, "utf8");
    Object.entries(replacements).forEach(([placeholder, value]) => {
      const regex = new RegExp(placeholder, "g");
      content = content.replace(regex, value);
    });
    return content;
  }

  function findTemplateFile(basePath, baseName, extensions) {
    for (const ext of extensions) {
      const fullPath = path.join(basePath, `${baseName}${ext}`);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    return null;
  }

  function ensureTemplateFolder(templatePath, templateType = 'ts') {
    if (!fs.existsSync(templatePath)) {
      fs.mkdirSync(templatePath);

      const templates = templateType === 'js' ? defaultTemplatesJS : defaultTemplatesTS;

      for (const [filename, content] of Object.entries(templates)) {
        fs.writeFileSync(path.join(templatePath, filename), content.trim());
      }
      console.log(`🛠️ Created default ${templateType.toUpperCase()} templates in "${templatePath}". You can customize them!`);
    }
  }

  async function findProjectRoot() {
    let currentDir = process.cwd();

    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        throw new Error('Could not find the project root');
      }
      currentDir = parentDir;
    }

    return currentDir;
  }

  async function findComponentFolder() {
    const projectRoot = await findProjectRoot();
    
    const srcFolderPath = path.join(projectRoot, 'src');
    if (!fs.existsSync(srcFolderPath)) {
      console.error('❌ "src" folder not found in the project root.');
      process.exit(1);
    }
  
    const componentsFolderPath = path.join(srcFolderPath, 'components');
    if (!fs.existsSync(componentsFolderPath)) {
      console.log('⚠️ "components" folder not found inside src.');
      return null;
    }
  
    return componentsFolderPath;
  }

  return {
    findComponentFolder,
    findProjectRoot,
    loadTemplateFromFile,
    findTemplateFile,
    ensureTemplateFolder
  };
}
