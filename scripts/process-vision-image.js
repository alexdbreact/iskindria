const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processVisionImage() {
  try {
    const inputPath = path.join(process.cwd(), 'public', 'vision_image.png');
    if (!fs.existsSync(inputPath)) {
      console.error('vision_image.png not found');
      return;
    }

    const image = sharp(inputPath);

    await image
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-32.png'));

    await image
      .clone()
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-48.png'));

    await image
      .clone()
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(process.cwd(), 'public', 'cursor-64.png'));

    await image
      .clone()
      .resize(32, 32)
      .png()
      .toFile(path.join(process.cwd(), 'app', 'favicon.ico'));

    console.log('Processed vision_image.png into cursor and favicon assets successfully!');
  } catch (err) {
    console.error('Error processing vision_image.png:', err);
  }
}

processVisionImage();
