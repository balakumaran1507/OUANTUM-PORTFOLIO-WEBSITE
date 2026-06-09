import sharp from 'sharp';
import { readdirSync } from 'fs';
import path from 'path';

const dirs = [
  './public/assets/images/ai-engineers',
  './public/assets/images/data-engineers',
  './public/assets/images/fullstack-developers',
];

for (const dir of dirs) {
  try {
    const files = readdirSync(dir).filter(f => /\.(png|jpe?g)$/i.test(f));
    for (const file of files) {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace(/\.(png|jpe?g)$/i, '.webp'));
      await sharp(input).webp({ quality: 80 }).toFile(output);
      console.log(`Converted: ${file} -> ${path.basename(output)}`);
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}
