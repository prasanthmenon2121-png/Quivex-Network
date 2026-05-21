import sharp from 'sharp';

// Read the logo
const logo = sharp('public/logo.png');
const meta = await logo.metadata();

console.log('Original logo:', meta.width, 'x', meta.height);

// Get the background color from corner (top-left)
const cornerBuf = await sharp('public/logo.png')
  .extract({ left: 0, top: 0, width: 1, height: 1 })
  .raw()
  .toBuffer();

const bgR = cornerBuf[0];
const bgG = cornerBuf[1];
const bgB = cornerBuf[2];

console.log(`Background color to remove: RGB(${bgR}, ${bgG}, ${bgB})`);

// Create transparent version by removing background color
// We'll use a tolerance for gradient backgrounds
const tolerance = 40;

const { data, info } = await sharp('public/logo.png')
  .raw()
  .toBuffer({ resolveWithObject: true });

// Create new buffer with alpha channel
const newData = Buffer.alloc(info.width * info.height * 4);

for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * 3];
  const g = data[i * 3 + 1];
  const b = data[i * 3 + 2];
  
  // Check if pixel is close to any corner background color
  const isBackground = (
    (Math.abs(r - 33) < tolerance && Math.abs(g - 34) < tolerance && Math.abs(b - 38) < tolerance) || // top-left
    (Math.abs(r - 64) < tolerance && Math.abs(g - 65) < tolerance && Math.abs(b - 69) < tolerance) || // top-right
    (Math.abs(r - 15) < tolerance && Math.abs(g - 16) < tolerance && Math.abs(b - 18) < tolerance) || // bottom-left
    (Math.abs(r - 29) < tolerance && Math.abs(g - 30) < tolerance && Math.abs(b - 35) < tolerance)    // bottom-right
  );
  
  newData[i * 4] = r;
  newData[i * 4 + 1] = g;
  newData[i * 4 + 2] = b;
  newData[i * 4 + 3] = isBackground ? 0 : 255; // Alpha: 0 = transparent, 255 = opaque
}

// Save transparent logo
await sharp(newData, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4
  }
})
  .png()
  .toFile('public/logo-transparent.png');

console.log('✅ Created: public/logo-transparent.png');

// Also create sized versions for icons
const sizes = [192, 512];
for (const size of sizes) {
  await sharp(newData, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`public/icons/icon-${size}x${size}-transparent.png`);
  
  console.log(`✅ Created: public/icons/icon-${size}x${size}-transparent.png`);
}

console.log('\n🎉 Done! Transparent logos created.');
