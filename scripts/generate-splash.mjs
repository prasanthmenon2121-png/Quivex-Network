import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../public/icons');
const SOURCE_ICON = path.join(ICONS_DIR, 'icon-512.png'); // നിങ്ങളുടെ PNG logo
const BACKGROUND_COLOR = { r: 6, g: 10, b: 6, alpha: 1 }; // #060A06

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

async function generateSplashScreens() {
  console.log('🖼️  Generating splash screens with your logo...\n');

  // Check if source icon exists
  if (!fs.existsSync(SOURCE_ICON)) {
    console.error('❌ Source icon not found: icon-512.png');
    process.exit(1);
  }

  // Generate splash screens
  for (const splash of SPLASH_SIZES) {
    try {
      // Logo size = 30% of smaller dimension
      const logoSize = Math.floor(Math.min(splash.width, splash.height) * 0.3);

      const logoImage = await sharp(SOURCE_ICON)
        .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
          top: Math.floor((splash.height - logoSize) / 2) - Math.floor(splash.height * 0.08) // Slightly above center
        }])
        .png()
        .toFile(path.join(ICONS_DIR, splash.name));

      console.log(`✅ ${splash.name} (${splash.width}x${splash.height})`);
    } catch (err) {
      console.error(`❌ Failed to generate ${splash.name}:`, err.message);
    }
  }

  console.log('\n🎉 Splash screens complete!');
  console.log(`📁 Saved to: ${ICONS_DIR}`);
}

generateSplashScreens().catch(console.error);
