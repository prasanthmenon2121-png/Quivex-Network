import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const iconsDir = join(publicDir, 'icons');
const sourceLogo = join(publicDir, 'logo.png');

const icons = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'qx-icon.png', size: 192 },
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateIcons() {
  console.log('🎨 Generating QUIVEX icons...\n');

  // Ensure icons directory exists
  await mkdir(iconsDir, { recursive: true });

  for (const icon of icons) {
    const outputPath = join(iconsDir, icon.name);
    
    await sharp(sourceLogo)
      .resize(icon.size, icon.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);

    console.log(`✅ ${icon.name} (${icon.size}x${icon.size})`);
  }

  // Maskable icon with padding (for Android)
  const maskableSize = 512;
  const padding = Math.round(maskableSize * 0.1);
  const innerSize = maskableSize - (padding * 2);

  await sharp({
    create: {
      width: maskableSize,
      height: maskableSize,
      channels: 4,
      background: { r: 5, g: 6, b: 7, alpha: 1 } // #050607
    }
  })
    .composite([{
      input: await sharp(sourceLogo)
        .resize(innerSize, innerSize, { fit: 'contain' })
        .toBuffer(),
      top: padding,
      left: padding
    }])
    .png()
    .toFile(join(iconsDir, 'maskable-icon.png'));

  console.log(`✅ maskable-icon.png (512x512 with padding)`);

  // Copy apple-touch-icon to root public folder
  await sharp(sourceLogo)
    .resize(180, 180, { fit: 'contain' })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'));

  console.log(`✅ apple-touch-icon.png (copied to public/)`);

  console.log('\n🎉 All icons generated successfully!');
  console.log(`📁 Location: public/icons/`);
}

generateIcons().catch(console.error);
