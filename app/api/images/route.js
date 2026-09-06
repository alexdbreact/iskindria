import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { LOCAL_PUBLIC_IMAGES } from '@/lib/localImages';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: LOCAL_PUBLIC_IMAGES });
    }

    const files = fs.readdirSync(imagesDir);
    const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.avif', '.svg']);

    const localImages = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validExtensions.has(ext);
      })
      .map(file => ({
        src: `/images/${encodeURIComponent(file)}`,
        alt: `Iskindria ${file.replace(/\.[^/.]+$/, '')}`
      }));

    const images = localImages.length > 0 ? localImages : LOCAL_PUBLIC_IMAGES;
    return NextResponse.json({ images });
  } catch (error) {
    console.warn('API /api/images falling back to local public images:', error);
    return NextResponse.json({ images: LOCAL_PUBLIC_IMAGES });
  }
}
