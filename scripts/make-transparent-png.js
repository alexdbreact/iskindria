const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function removeWhiteBackground() {
  const input = path.join(process.cwd(), 'public', 'vision_image.png');
  const tempOutput = path.join(process.cwd(), 'public', 'vision_transparent.png');

  // Read input file to buffer first to release file lock
  const inputBuffer = fs.readFileSync(input);

  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = 245;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Check if pixel is white / near-white background
    if (r >= threshold && g >= threshold && b >= threshold) {
      data[i + 3] = 0; // Transparent
    } else if (r > 220 && g > 220 && b > 220) {
      // Soft edge antialiasing
      const diff = Math.min(r, g, b) - 220;
      data[i + 3] = Math.max(0, Math.round(255 - (diff / 25) * 255));
    }
  }

  const pngBuffer = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .png()
    .toBuffer();

  fs.writeFileSync(tempOutput, pngBuffer);
  fs.writeFileSync(input, pngBuffer);

  // Also create 32x32 and 48x48 transparent cursor PNGs
  const cursor32 = await sharp(pngBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'public', 'cursor-32.png'), cursor32);
  fs.writeFileSync(path.join(process.cwd(), 'public', 'fast-cursor-32.png'), cursor32);

  const cursor48 = await sharp(pngBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'public', 'cursor-48.png'), cursor48);

  const cursor64 = await sharp(pngBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(process.cwd(), 'public', 'cursor-64.png'), cursor64);

  console.log('Successfully created transparent PNG without background and updated cursor assets!');
}

removeWhiteBackground();
