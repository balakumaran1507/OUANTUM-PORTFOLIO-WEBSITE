import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const inputPath = './public/assets/images/logo-black-original.png';
  // Use backup if exists, else public/assets/images/logo.png
  const src = fs.existsSync(inputPath) ? inputPath : './public/assets/images/logo.png';
  if (!fs.existsSync(inputPath)) {
    fs.copyFileSync('./public/assets/images/logo.png', inputPath);
  }

  // 1. Negate colors (turns black to white, preserves transparency)
  // 2. Trim transparent borders
  const trimmedWhite = await sharp(src)
    .negate({ alpha: false })
    .trim()
    .toBuffer();

  const trimmedMeta = await sharp(trimmedWhite).metadata();
  console.log('Trimmed dimensions:', trimmedMeta.width, 'x', trimmedMeta.height);

  // The glyph is now tightly cropped and pure white!
  // To make it fill the favicon icon space as largely as possible, we place it in a square canvas
  // with tight padding (e.g. 12px on a 512px canvas, ~2.3%) so it touches near the edges.
  const targetSize = 512;
  const padding = 12;
  const contentSize = targetSize - (padding * 2);

  const resizedGlyph = await sharp(trimmedWhite)
    .resize(contentSize, contentSize, {
      fit: 'inside',
      kernel: sharp.kernel.lanczos3
    })
    .toBuffer();

  const final512 = await sharp({
    create: {
      width: targetSize,
      height: targetSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: resizedGlyph, gravity: 'centre' }])
    .png()
    .toBuffer();

  // Save full-res 512x512 logo.png (white, maximized)
  await sharp(final512).png().toFile('./public/assets/images/logo.png');

  // Also save standard favicon sizes for crisp tab display
  await sharp(final512).resize(32, 32, { kernel: sharp.kernel.lanczos3 }).png().toFile('./public/favicon-32x32.png');
  await sharp(final512).resize(16, 16, { kernel: sharp.kernel.lanczos3 }).png().toFile('./public/favicon-16x16.png');
  await sharp(final512).resize(48, 48, { kernel: sharp.kernel.lanczos3 }).png().toFile('./public/favicon.ico');
  await sharp(final512).resize(180, 180, { kernel: sharp.kernel.lanczos3 }).png().toFile('./public/apple-touch-icon.png');
  
  // Also save to assets/images
  await sharp(final512).resize(32, 32).png().toFile('./public/assets/images/favicon-32.png');

  // Also copy to dist if dist exists
  if (fs.existsSync('./dist/assets/images')) {
    await sharp(final512).png().toFile('./dist/assets/images/logo.png');
  }
  if (fs.existsSync('./dist')) {
    await sharp(final512).resize(32, 32).png().toFile('./dist/favicon-32x32.png');
    await sharp(final512).resize(48, 48).png().toFile('./dist/favicon.ico');
    await sharp(final512).resize(180, 180).png().toFile('./dist/apple-touch-icon.png');
  }

  console.log('SUCCESS: Generated pure white, enlarged favicon files across public/ and assets/!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
