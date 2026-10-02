import sharp from 'sharp';
import fs from 'fs';

async function main() {
  // Let's load the trimmed high-res white logo
  // 512x512 with tight padding
  const trimmed = await sharp('./public/assets/images/logo-black-original.png')
    .negate({ alpha: false })
    .trim()
    .toBuffer();

  // Create an ultra-crisp 512x512 PNG, maximized to 98% of the square
  const targetSize = 512;
  const padding = 6; // only 6px padding on 512px canvas (over 97% fill!)
  const contentSize = targetSize - (padding * 2);

  const resizedGlyph = await sharp(trimmed)
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

  // Also create a high-contrast base64 data URI embedded in an SVG
  // When an SVG has viewBox="0 0 512 512" and contains the crisp PNG image,
  // browsers treat it as an SVG favicon with crisp rendering!
  const base64Png = final512.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="512" height="512" style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
</svg>`;

  fs.writeFileSync('./public/favicon.svg', svgContent);
  fs.writeFileSync('./public/assets/images/favicon.svg', svgContent);

  // Write 512x512
  await sharp(final512).png({ compressionLevel: 9 }).toFile('./public/assets/images/logo.png');
  await sharp(final512).png({ compressionLevel: 9 }).toFile('./public/favicon-512x512.png');

  // Generate crisp 32x32, 16x16 with slight sharpening to avoid any softness/blur
  await sharp(final512)
    .resize(64, 64, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1.0, m1: 1.5, m2: 0.7 })
    .png()
    .toFile('./public/favicon-64x64.png');

  await sharp(final512)
    .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 2.0, m2: 1.0 })
    .png()
    .toFile('./public/favicon-32x32.png');

  await sharp(final512)
    .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.6, m1: 2.5, m2: 1.2 })
    .png()
    .toFile('./public/favicon-16x16.png');

  await sharp(final512)
    .resize(48, 48, { kernel: sharp.kernel.lanczos3 })
    .toFile('./public/favicon.ico');

  await sharp(final512)
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .toFile('./public/apple-touch-icon.png');

  // Also sync dist if it exists
  if (fs.existsSync('./dist')) {
    fs.writeFileSync('./dist/favicon.svg', svgContent);
    await sharp(final512).png().toFile('./dist/assets/images/logo.png');
    await sharp(final512).resize(32, 32).png().toFile('./dist/favicon-32x32.png');
    await sharp(final512).resize(16, 16).png().toFile('./dist/favicon-16x16.png');
    await sharp(final512).resize(48, 48).toFile('./dist/favicon.ico');
    await sharp(final512).resize(180, 180).toFile('./dist/apple-touch-icon.png');
  }

  console.log('Successfully generated maximized white crisp favicons with SVG!');
}

main().catch(console.error);
