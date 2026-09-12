import { NextResponse } from 'next/server';
import { YOUTUBE_VIDEOS } from '@/lib/mediaData';

export const dynamic = 'force-dynamic';

export async function GET() {
  const aiVideos = YOUTUBE_VIDEOS.filter(v => v.category === 'ai');
  return NextResponse.json({ videos: aiVideos });
}
