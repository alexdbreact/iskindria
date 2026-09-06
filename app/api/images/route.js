import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(imagesDir);
    const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.avif', '.svg']);

    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validExtensions.has(ext);
      })
      .map(file => ({
        src: `/images/${encodeURIComponent(file)}`,
        alt: `Iskindria ${file.replace(/\.[^/.]+$/, '')}`
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
  }
}
