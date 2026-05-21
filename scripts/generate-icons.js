import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputImage = 'public/icons/qx-icon.png';
const iconsDir = 'public/icons';

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  console.log('Generating icons...');

  try {
    // Base configuration for standard icons
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 5, g: 5, b: 5, alpha: 1 } // #050505
        })
        .png()
        .toFile(path.join(iconsDir, `icon-${size}.png`));
      console.log(`Generated: icon-${size}.png`);
    }

    // Maskable icons (larger padding)
    const maskableSizes = [192, 512];
    for (const size of maskableSizes) {
      // For maskable icons, we want the logo to be smaller within the safe zone
      // 80% size ensures it stays in the safe zone
      const innerSize = Math.floor(size * 0.8);
      await sharp(inputImage)
        .resize(innerSize, innerSize, {
          fit: 'contain',
          background: { r: 5, g: 5, b: 5, alpha: 0 }
        })
        .extend({
          top: Math.floor((size - innerSize) / 2),
          bottom: Math.ceil((size - innerSize) / 2),
          left: Math.floor((size - innerSize) / 2),
          right: Math.ceil((size - innerSize) / 2),
          background: { r: 5, g: 5, b: 5, alpha: 1 }
        })
        .png()
        .toFile(path.join(iconsDir, `maskable-${size}.png`));
      console.log(`Generated: maskable-${size}.png`);
    }

    // apple-touch-icon.png (180x180)
    await sharp(inputImage)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 5, g: 5, b: 5, alpha: 1 }
      })
      .png()
      .toFile('public/apple-touch-icon.png');
    console.log('Generated: apple-touch-icon.png');

    // favicon.ico (Multiple sizes)
    // sharp doesn't directly support .ico, so we'll save as PNG first
    // Note: Most modern browsers handle favicon.png or svg better, 
    // but the user asked for .ico specifically.
    // For simplicity, we'll save a 32x32 png as favicon.ico or just a png
    // To properly create an .ico with multiple sizes, we'd need another lib.
    // However, a single 32x32 png renamed to .ico usually works for most browsers.
    await sharp(inputImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 5, g: 5, b: 5, alpha: 0 }
      })
      .png()
      .toFile('public/favicon.ico');
    console.log('Generated: favicon.ico (as PNG 32x32)');

    console.log('All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generateIcons();
