import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const videoDir = path.join(process.cwd(), 'public', 'video');
    
    if (!fs.existsSync(videoDir)) {
      return NextResponse.json({
        videos: [
          {
            title: 'Alexandria, Egypt - Drone [4K]',
            src: '/video/Alexandria%20%2C%20Egypt%20%F0%9F%87%AA%F0%9F%87%AC-%20by%20drone%20%5B4K%5D.mp4',
            filename: 'Alexandria , Egypt 🇪🇬- by drone [4K].mp4'
          }
        ]
      });
    }

    const files = fs.readdirSync(videoDir);
    const validVideoExts = new Set(['.mp4', '.webm', '.mov', '.mkv', '.ogg']);

    const videos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validVideoExts.has(ext);
      })
      .map(file => {
        let title = file.replace(/\.[^/.]+$/, '').trim();
        title = title.replace(/\s+/g, ' ');
        return {
          title,
          src: `/video/${encodeURIComponent(file)}`,
          filename: file
        };
      });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error reading video directory:', error);
    return NextResponse.json({ error: 'Failed to read video files' }, { status: 500 });
  }
}
