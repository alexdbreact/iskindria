import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { DEFAULT_PLAYLIST } from '@/lib/mediaData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mp3Dir = path.join(process.cwd(), 'public', 'mp3');
    
    if (!fs.existsSync(mp3Dir)) {
      return NextResponse.json({ playlist: DEFAULT_PLAYLIST });
    }

    const files = fs.readdirSync(mp3Dir);
    const validAudioExts = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']);

    const localPlaylist = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validAudioExts.has(ext);
      })
      .map(file => {
        let title = file.replace(/\.[^/.]+$/, '').trim();
        title = title.replace(/\s+/g, ' ');
        return {
          title,
          src: `/mp3/${encodeURIComponent(file)}`,
          filename: file
        };
      });

    const playlist = localPlaylist.length > 0 ? localPlaylist : DEFAULT_PLAYLIST;
    return NextResponse.json({ playlist });
  } catch (error) {
    console.warn('API /api/audio falling back to default playlist:', error);
    return NextResponse.json({ playlist: DEFAULT_PLAYLIST });
  }
}
