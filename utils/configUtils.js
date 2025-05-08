import fs from 'fs';
import path from 'path';
import fileUtils from './fileUtils.js';

export default function configUtils() {

const {
    findProjectRoot
} = fileUtils()

  async function loadConfig() {
    try {
      const rootDir = await findProjectRoot();  
      const configPath = path.join(rootDir, 'component-generator.config.json'); 

      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (
          config.defaultLanguage &&
          !['ts', 'js'].includes(config.defaultLanguage)
        ) {
          console.error(
            '❌ Invalid "default language" in config. Use "ts" or "js".'
          );
          process.exit(1);
        }
        return config;
      }

      return null;
    } catch (err) {
      console.error('❌ Error finding project root or loading config:', err.message);
      process.exit(1);
    }
  }

  return {
    loadConfig,
  };
}
