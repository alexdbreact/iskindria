import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const aiDir = path.join(process.cwd(), 'public', 'AI');
    
    if (!fs.existsSync(aiDir)) {
      return NextResponse.json({
        videos: [
          {
            title: 'Alexandria in 240 BC (AI Reconstruction)',
            src: '/AI/ALEXANDRIA%20in%20240%20BC%20%20%20Experience%20Life%20In%20The%20Most%20Important%20City%20World%20%20%2024%20Hours%20in%20Alexandria.mp4',
            filename: 'ALEXANDRIA in 240 BC   Experience Life In The Most Important City World   24 Hours in Alexandria.mp4'
          },
          {
            title: 'الإسكندرية 300 قبل الميلاد (إعادة بناء بالذكاء الاصطناعي)',
            src: '/AI/%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9%20300%20%D9%82%D8%A8%D9%84%20%D8%A7%D9%84%D9%85%D9%8A%D9%84%D8%A7%D8%AF%20(%D8%A5%D8%B9%D8%A7%D8%AF%D8%A9%20%D8%A8%D9%86%D8%A7%D8%A1%20%D8%A8%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A).mp4',
            filename: 'الإسكندرية 300 قبل الميلاد (إعادة بناء بالذكاء الاصطناعي).mp4'
          }
        ]
      });
    }

    const files = fs.readdirSync(aiDir);
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
          src: `/AI/${encodeURIComponent(file)}`,
          filename: file
        };
      });

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error reading AI directory:', error);
    return NextResponse.json({ error: 'Failed to read AI videos' }, { status: 500 });
  }
}
