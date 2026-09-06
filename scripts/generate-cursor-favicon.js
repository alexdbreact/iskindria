const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processIcons() {
  try {
    const inputPath = path.join(process.cwd(), 'public', 'cursor.jfif');
    if (!fs.existsSync(inputPath)) {
      console.error('cursor.jfif not found in /public');
      return;
    }

    console.log('Reading cursor.jfif...');
    const image = sharp(inputPath);

    // 1. Generate 32x32 cursor
    await image
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-32.png'));
    console.log('Created public/cursor-32.png');

    // 2. Generate 48x48 cursor
    await image
      .clone()
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-48.png'));
    console.log('Created public/cursor-48.png');

    // 3. Generate 64x64 cursor & favicon
    await image
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-64.png'));
    console.log('Created public/cursor-64.png');

    // 4. Generate standard favicons
    await image
      .clone()
      .resize(32, 32)
      .png()
      .toFile(path.join(process.cwd(), 'public', 'favicon.png'));
    
    await image
      .clone()
      .resize(180, 180)
      .png()
      .toFile(path.join(process.cwd(), 'public', 'apple-touch-icon.png'));

    // Also update app/favicon.ico
    await image
      .clone()
      .resize(32, 32)
      .png()
      .toFile(path.join(process.cwd(), 'app', 'favicon.ico'));

    console.log('All cursor and favicon assets generated successfully!');
  } catch (err) {
    console.error('Error processing icons:', err);
  }
}

processIcons();
