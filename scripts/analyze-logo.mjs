import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const { data, info } = await sharp('./public/assets/images/logo-black-original.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // Find bounding box
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = data[(y * w + x) * 4 + 3];
      if (a > 50) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log({ minX, maxX, minY, maxY, glyphWidth: maxX - minX + 1, glyphHeight: maxY - minY + 1 });

  // Let's trace contours: downsample to 256x256 grid for clean vectorization
  const gridW = 256;
  const gridH = 256;

  // Let's resize trimmed logo to gridW x gridH with white on transparent
  const resized = await sharp('./public/assets/images/logo-black-original.png')
    .negate({ alpha: false })
    .trim()
    .resize(gridW, gridH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log('Resized grid ready:', resized.info);
}

main().catch(console.error);
