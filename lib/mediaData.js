// Verified YouTube media library for Alexandria videos across 4 categories:
// 1. Tour (جولات سياحية)
// 2. Documentary (أفلام وثائقية)
// 3. AI Reconstructions (ذكاء اصطناعي)
// 4. Historical & Domestic (تاريخ وتراث)

export const VIDEO_CATEGORIES = [
  { id: 'all', label: { en: 'All Videos', ar: 'جميع الفيديوهات' }, icon: 'Film' },
  { id: 'tour', label: { en: 'Tour', ar: 'جولات سياحية' }, icon: 'Compass' },
  { id: 'documentary', label: { en: 'Documentary', ar: 'أفلام وثائقية' }, icon: 'Clapperboard' },
  { id: 'ai', label: { en: 'AI Reconstructions', ar: 'ذكاء اصطناعي' }, icon: 'Bot' },
  { id: 'historical', label: { en: 'Historical', ar: 'تاريخ وتراث' }, icon: 'Landmark' }
];

export const YOUTUBE_VIDEOS = [
  // 1. TOUR (جولات سياحية)
  {
    id: 'tour-1',
    youtubeId: 'C2LutvE6YEo',
    category: 'tour',
    categoryName: { en: 'Tour', ar: 'جولة سياحية' },
    title: {
      en: 'Alexandria, Egypt 🇪🇬 - By Drone [4K]',
      ar: 'الإسكندرية، مصر 🇪🇬 - لقطات جوية بالدرون [4K]'
    },
    author: 'Drone Snap',
    description: {
      en: 'Ultra HD 4K aerial cinematic drone footage covering the Alexandria coastline, Citadel of Qaitbay, and Mediterranean harbour.',
      ar: 'لقطات جوية سينمائية فائقة الدقة 4K تغطي كورنيش الإسكندرية وقلعة قايتباي والميناء الشرقي.'
    },
    thumbnail: 'https://img.youtube.com/vi/C2LutvE6YEo/hqdefault.jpg'
  },
  {
    id: 'tour-2',
    youtubeId: 'XPYxYp4UYdg',
    category: 'tour',
    categoryName: { en: 'Tour', ar: 'جولة سياحية' },
    title: {
      en: 'Alexandria, Egypt | Amazing Aerial Drone View 4K',
      ar: 'الإسكندرية، مصر | مناظر جوية ساحرة بدقة 4K'
    },
    author: 'Gazetica Explorer',
    description: {
      en: 'Stunning aerial overview capturing the architectural marvels, modern waterfront, and Mediterranean sunset over Alexandria.',
      ar: 'نظرة جوية ساحرة تسلط الضوء على المعالم المعمارية وكورنيش البحر وغروب الشمس في الإسكندرية.'
    },
    thumbnail: 'https://img.youtube.com/vi/XPYxYp4UYdg/hqdefault.jpg'
  },

  // 2. DOCUMENTARY (أفلام وثائقية)
  {
    id: 'doc-1',
    youtubeId: '6QhH56N-kbs',
    category: 'documentary',
    categoryName: { en: 'Documentary', ar: 'فيلم وثائقي' },
    title: {
      en: 'Documentary | Greek-Egyptian Heritage in Alexandria',
      ar: 'الوثائقية | الفيلم الوثائقي «يوناني مصري»'
    },
    author: 'الوثائقية - AlWathaeqya',
    description: {
      en: 'A profound documentary tracing the Greek community and rich multicultural heritage deeply woven into Alexandrian society.',
      ar: 'فيلم وثائقي عميق يسرد تاريخ وحكايات الجالية اليونانية في الإسكندرية وتأثيرها الثقافي الخالد.'
    },
    thumbnail: 'https://img.youtube.com/vi/6QhH56N-kbs/hqdefault.jpg'
  },
  {
    id: 'doc-2',
    youtubeId: 'X0J2bpPIRyE',
    category: 'documentary',
    categoryName: { en: 'Documentary', ar: 'فيلم وثائقي' },
    title: {
      en: 'Best Things to Do in Alexandria, Egypt | Travel Guide',
      ar: 'أفضل المعالم والتجارب في الإسكندرية | دليل السفر'
    },
    author: 'GeoTrails',
    description: {
      en: 'Comprehensive travel documentary visiting Bibliotheca Alexandrina, Roman Amphitheatre, Montaza Palace, and local culinary gems.',
      ar: 'دليل وثائقي شامل يزور مكتبة الإسكندرية والمسرح الروماني وقصر المنتزه وأسرار المدينة العريقة.'
    },
    thumbnail: 'https://img.youtube.com/vi/X0J2bpPIRyE/hqdefault.jpg'
  },
  {
    id: 'doc-3',
    youtubeId: 'HJVT8Ibb9kY',
    category: 'documentary',
    categoryName: { en: 'Documentary', ar: 'فيلم وثائقي' },
    title: {
      en: 'Alexandria 300 BC | Historical Reconstruction Documentary',
      ar: 'الإسكندرية 300 قبل الميلاد | وثائقي إعادة البناء التاريخي'
    },
    author: 'Matt Reconstructed Realms',
    description: {
      en: 'Historical documentary detailing the founding, urban grid, and grandeur of ancient Alexandria under Ptolemy I and II.',
      ar: 'وثائقي تاريخي يوضح التخطيط الحضري وعظمة تأسيس الإسكندرية القديمة في عصر البطالمة.'
    },
    thumbnail: 'https://img.youtube.com/vi/HJVT8Ibb9kY/hqdefault.jpg'
  },

  // 3. AI RECONSTRUCTIONS (ذكاء اصطناعي)
  {
    id: 'ai-1',
    youtubeId: 'f8C7kkB6BYU',
    category: 'ai',
    categoryName: { en: 'AI Recreation', ar: 'ذكاء اصطناعي' },
    title: {
      en: 'What Ancient Alexandria ACTUALLY Looked Like (AI Reconstruction)',
      ar: 'كيف كانت الإسكندرية القديمة تبدو بالفعل (إعادة بناء بالذكاء الاصطناعي)'
    },
    author: 'Arthur Revives the Past',
    description: {
      en: 'Hyper-realistic AI visual reconstruction of the Pharos Lighthouse, Great Library of Alexandria, and the royal quarter.',
      ar: 'إعادة بناء بصرية مذهلة بالذكاء الاصطناعي لمنارة الإسكندرية ومكتبة الإسكندرية الملكية والحي الملكي.'
    },
    thumbnail: 'https://img.youtube.com/vi/f8C7kkB6BYU/hqdefault.jpg'
  },
  {
    id: 'ai-2',
    youtubeId: 'mUGUbgjOYig',
    category: 'ai',
    categoryName: { en: 'AI Recreation', ar: 'ذكاء اصطناعي' },
    title: {
      en: 'Alexandria: The Greatest City That Ever Existed (AI Reconstruction)',
      ar: 'الإسكندرية: أعظم مدينة في العالم القديم (إعادة بناء بالذكاء الاصطناعي)'
    },
    author: 'Lost Worlds',
    description: {
      en: 'AI cinematic journey through Cleopatra’s Alexandria, exploring the ancient harbour, palace terraces, and bustling agora.',
      ar: 'رحلة سينمائية بالذكاء الاصطناعي في إسكندرية كليوباترا لاستكشاف الميناء الملكي والقصور وشوارع المدينة القديمة.'
    },
    thumbnail: 'https://img.youtube.com/vi/mUGUbgjOYig/hqdefault.jpg'
  },

  // 4. HISTORICAL & DOMESTIC (تاريخ وتراث)
  {
    id: 'hist-1',
    youtubeId: 'G9eruYS3FbU',
    category: 'historical',
    categoryName: { en: 'Historical', ar: 'تاريخ وتراث' },
    title: {
      en: 'A Nostalgic Journey for Alexandria Lovers (Vintage Archives)',
      ar: 'رحلة لعشاق الإسكندرية في الماضي (صور زمان وتاريخ عريق)'
    },
    author: 'k cocktail',
    description: {
      en: 'Rare vintage photographs and historical chronicles capturing the golden age of cosmopolitan Alexandria in the 19th and 20th centuries.',
      ar: 'صور وأرشيفات نادرة توثق العصر الذهبي لكوزموبوليتانية الإسكندرية وسحر شواطئها ومبانيها الكلاسيكية.'
    },
    thumbnail: 'https://img.youtube.com/vi/G9eruYS3FbU/hqdefault.jpg'
  },
  {
    id: 'hist-2',
    youtubeId: 'OQuHTtLDFRg',
    category: 'historical',
    categoryName: { en: 'Historical', ar: 'تاريخ وتراث' },
    title: {
      en: 'Alexandria, Egypt | Walking Tour 4K',
      ar: 'الإسكندرية، مصر | جولة مشي سينمائية 4K'
    },
    author: 'Egypt Walker',
    description: {
      en: 'Immersive 4K walking tour exploring the historic streets, Stanley Bridge, and authentic Mediterranean ambience.',
      ar: 'جولة مشي واقعية 4K بين شوارع الإسكندرية التاريخية وكوبري ستانلي وأجواء المدينة الساحرة.'
    },
    thumbnail: 'https://img.youtube.com/vi/OQuHTtLDFRg/hqdefault.jpg'
  }
];

// Helper to filter videos by category
export function getVideosByCategory(category = 'all') {
  if (!category || category === 'all') return YOUTUBE_VIDEOS;
  return YOUTUBE_VIDEOS.filter(v => v.category === category);
}

// Default Audio Playlist
export const DEFAULT_PLAYLIST = [
  {
    title: 'Alexandria - Yiannis Kotsiras',
    src: '/mp3/ALEXANDRIA%20%20%20Yiannis%20Kotsiras.mp3',
    filename: 'ALEXANDRIA   Yiannis Kotsiras.mp3'
  },
  {
    title: 'Hamza Namira - Eskendereya (حمزة نمرة - اسكندرية)',
    src: '/mp3/Hamza%20Namira%20-%20Eskendereya%20_%20%D8%AD%D9%85%D8%B2%D8%A9%20%D9%86%D9%85%D8%B1%D8%A9%20-%20%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9.mp3',
    filename: 'Hamza Namira - Eskendereya.mp3'
  },
  {
    title: 'Fatma Said - Alexandria (كان في مرة ولد صغير)',
    src: '/mp3/Fatma%20Said%20%20Alexandria%20(Eskendereya%20%D9%83%D8%A7%D9%86%20%D9%81%D9%8A%20%D9%85%D8%B1%D8%A9%20%D9%88%D9%84%D8%AF%20%D8%B5%D8%BA%D9%8A%D8%B1).mp3',
    filename: 'Fatma Said  Alexandria.mp3'
  }
];
