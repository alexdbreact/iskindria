const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createSuperFastCursor() {
  try {
    const inputPath = path.join(process.cwd(), 'public', 'vision_image.png');
    if (!fs.existsSync(inputPath)) return;

    // Create crisp 32x32 cursor with hotspot at the lighthouse top
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'fast-cursor-32.png'));

    // Create crisp 40x40 cursor for retina
    await sharp(inputPath)
      .resize(40, 40, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'fast-cursor-40.png'));

    console.log('Optimized cursor assets created successfully!');
  } catch (err) {
    console.error('Error generating fast cursor:', err);
  }
}

createSuperFastCursor();
