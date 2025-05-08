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

  // ✨ NEW: Pass templateType ('ts' or 'js')
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

  return {
    loadTemplateFromFile,
    findTemplateFile,
    ensureTemplateFolder
  };
}
