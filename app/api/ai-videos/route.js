import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { DEFAULT_AI_VIDEOS } from '@/lib/mediaData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const aiDir = path.join(process.cwd(), 'public', 'AI');
    
    if (!fs.existsSync(aiDir)) {
      return NextResponse.json({ videos: DEFAULT_AI_VIDEOS });
    }

    const files = fs.readdirSync(aiDir);
    const validVideoExts = new Set(['.mp4', '.webm', '.mov', '.mkv', '.ogg']);

    const localVideos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return validVideoExts.has(ext);
      })
      .map(file => {
        let title = file.replace(/\.[^/.]+$/, '').trim();
        title = title.replace(/\s+/g, ' ');
        return {
          title,
          src: `/AI/${encodeURIComponent(file)}`,
          fallbackSrc: '/title.mp4',
          filename: file
        };
      });

    const videos = localVideos.length > 0 ? localVideos : DEFAULT_AI_VIDEOS;
    return NextResponse.json({ videos });
  } catch (error) {
    console.warn('API /api/ai-videos falling back to default AI videos:', error);
    return NextResponse.json({ videos: DEFAULT_AI_VIDEOS });
  }
}
