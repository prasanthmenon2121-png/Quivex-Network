import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../public/icons');
const SOURCE_ICON = path.join(ICONS_DIR, 'icon-152x152.png');
const BACKGROUND_COLOR = { r: 6, g: 10, b: 6, alpha: 1 }; // #060A06

// Icon sizes needed for all platforms
const ICON_SIZES = [16, 32, 48, 72, 96, 128, 144, 152, 167, 180, 192, 256, 310, 384, 512];

// Splash screen sizes for iOS
const SPLASH_SIZES = [
  { width: 640, height: 1136, name: 'splash-640x1136.png' },
  { width: 750, height: 1334, name: 'splash-750x1334.png' },
  { width: 1242, height: 2208, name: 'splash-1242x2208.png' },
  { width: 1125, height: 2436, name: 'splash-1125x2436.png' },
  { width: 1536, height: 2048, name: 'splash-1536x2048.png' },
  { width: 1668, height: 2224, name: 'splash-1668x2224.png' },
  { width: 2048, height: 2732, name: 'splash-2048x2732.png' },
];

async function generateIcons() {
  console.log('🎨 Generating QuiVex icons from icon-512x512.png...\n');

  // Check if source icon exists
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error('❌ Source icon not found: icon-512x512.png');
    console.log('Please place your icon-512x512.png in public/icons/ folder');
    process.exit(1);
  }

  // Generate each icon size from source
  for (const size of ICON_SIZES) {
    const filename = `icon-${size}.png`;
    const filepath = path.join(ICONS_DIR, filename);

    try {
      await sharp(SOURCE_ICON)
        .resize(size, size, { fit: 'contain', background: BACKGROUND_COLOR })
        .png({ quality: 100 })
        .toFile(filepath);

      console.log(`✅ ${filename} (${size}x${size})`);
    } catch (err) {
      console.error(`❌ Failed to generate ${filename}:`, err.message);
    }
  }

  // Generate Windows wide tile (310x150)
  try {
    const wideWidth = 310;
    const wideHeight = 150;
    const logoSize = 120;

    const logoImage = await sharp(SOURCE_ICON)
      .resize(logoSize, logoSize, { fit: 'contain', background: BACKGROUND_COLOR })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: wideWidth,
        height: wideHeight,
        channels: 4,
        background: BACKGROUND_COLOR
      }
    })
      .composite([{
        input: logoImage,
        left: Math.floor((wideWidth - logoSize) / 2),
        top: Math.floor((wideHeight - logoSize) / 2)
      }])
      .png()
      .toFile(path.join(ICONS_DIR, 'icon-310x150.png'));

    console.log(`✅ icon-310x150.png (310x150)`);
  } catch (err) {
    console.error('❌ Failed to generate wide tile:', err.message);
  }

  console.log('\n🖼️  Generating splash screens...\n');

  // Generate splash screens
  for (const splash of SPLASH_SIZES) {
    try {
      const logoSize = Math.floor(Math.min(splash.width, splash.height) * 0.3);

      const logoImage = await sharp(SOURCE_ICON)
        .resize(logoSize, logoSize, { fit: 'contain', background: BACKGROUND_COLOR })
        .png()
        .toBuffer();

      await sharp({
        create: {
          width: splash.width,
          height: splash.height,
          channels: 4,
          background: BACKGROUND_COLOR
        }
      })
        .composite([{
          input: logoImage,
          left: Math.floor((splash.width - logoSize) / 2),
          top: Math.floor((splash.height - logoSize) / 2) - Math.floor(splash.height * 0.05)
        }])
        .png()
        .toFile(path.join(ICONS_DIR, splash.name));

      console.log(`✅ ${splash.name} (${splash.width}x${splash.height})`);
    } catch (err) {
      console.error(`❌ Failed to generate ${splash.name}:`, err.message);
    }
  }

  console.log('\n🎉 Icon generation complete!');
  console.log(`📁 Icons saved to: ${ICONS_DIR}`);
}

generateIcons().catch(console.error);
