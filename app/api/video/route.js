import { NextResponse } from 'next/server';
import { YOUTUBE_VIDEOS } from '@/lib/mediaData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ videos: YOUTUBE_VIDEOS });
}
