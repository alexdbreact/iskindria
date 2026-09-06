import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mp3Dir = path.join(process.cwd(), 'public', 'mp3');
    
    if (!fs.existsSync(mp3Dir)) {
      return NextResponse.json({
        playlist: [
          {
            title: 'Alexandria - Yiannis Kotsiras',
            src: '/mp3/ALEXANDRIA%20%20%20Yiannis%20Kotsiras.mp3',
            filename: 'ALEXANDRIA   Yiannis Kotsiras.mp3'
          },
          {
            title: 'Alexandria (كان في مرة ولد صغير) - Fatma Said',
            src: '/mp3/Fatma%20Said%20%20Alexandria%20(Eskendereya%20%D9%83%D8%A7%D9%86%20%D9%81%D9%8A%20%D9%85%D8%B1%D8%A9%20%D9%88%D9%84%D8%AF%20%D8%B5%D8%BA%D9%8A%D8%B1).mp3',
            filename: 'Fatma Said  Alexandria (Eskendereya كان في مرة ولد صغير).mp3'
          }
        ]
      });
    }

    const files = fs.readdirSync(mp3Dir);
    const validAudioExts = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac']);

    const playlist = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validAudioExts.has(ext);
      })
      .map(file => {
        // Clean up title for elegant display
        let title = file.replace(/\.[^/.]+$/, '').trim();
        // Replace multiple spaces with a single space
        title = title.replace(/\s+/g, ' ');
        return {
          title,
          src: `/mp3/${encodeURIComponent(file)}`,
          filename: file
        };
      });

    return NextResponse.json({ playlist });
  } catch (error) {
    console.error('Error reading mp3 directory:', error);
    return NextResponse.json({ error: 'Failed to read audio files' }, { status: 500 });
  }
}
