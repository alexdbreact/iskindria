import "./globals.css";
import JsonLd from "@/components/seo/JsonLd";

export const metadata = {
  metadataBase: new URL("https://www.iskindria.com"),
  title: {
    default: "إسكندرية | ISKINDRIA - منصة وتجارب الويب التفاعلية ثلاثية الأبعاد",
    template: "%s | إسكندرية - ISKINDRIA"
  },
  description:
    "منصة إسكندرية (ISKINDRIA) - تجربة ويب تفاعلية ثلاثية الأبعاد تستعرض سحر وتاريخ عروس البحر الأبيض المتوسط. منصة رقمية متطورة ومعرض أعمال تفاعلي بواسطة مطور ويب متكامل ومصمم تجارب رقمية في الإسكندرية، مصر. Interactive 3D web platform & portfolio exploring Alexandria's heritage by Senior Web Developer WebAlex.",
  applicationName: "ISKINDRIA",
  authors: [
    {
      name: "WebAlex",
      url: "https://webalex-ten.vercel.app/"
    }
  ],
  generator: "Next.js",
  keywords: [
    // Arabic keyword variations for Alexandria & Developer
    "الاسكندرية",
    "الإسكندرية",
    "الاسكندريه",
    "الإسكندريه",
    "إسكندرية",
    "اسكندرية",
    "منصة الاسكندرية",
    "منصة الإسكندرية",
    "مطور مواقع في الاسكندرية",
    "مطور ويب في الإسكندرية",
    "مبرمج في الاسكندرية",
    "تصميم مواقع الإسكندرية",
    "شركة برمجة في الاسكندرية",
    "تطوير مواقع الويب مصر",
    "معرض ثلاثي الأبعاد الإسكندرية",
    "قلعة قايتباي",
    "مكتبة الإسكندرية",
    "كورنيش الإسكندرية",
    // English keywords
    "Alexandria",
    "Alex",
    "iskindria",
    "iskandaria",
    "Egypt",
    "senior web developer alexandria",
    "full stack developer alexandria",
    "creative web developer egypt",
    "3D web experience alexandria",
    "Next.js developer alexandria",
    "WebGL developer Egypt",
    "web development agency alexandria"
  ],
  referrer: "origin-when-cross-origin",
  creator: "WebAlex",
  publisher: "WebAlex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  alternates: {
    canonical: "https://www.iskindria.com",
    languages: {
      "ar-EG": "https://www.iskindria.com",
      "en-US": "https://www.iskindria.com",
      "x-default": "https://www.iskindria.com"
    }
  },
  openGraph: {
    title: "إسكندرية | ISKINDRIA - منصة وتجارب الويب التفاعلية ثلاثية الأبعاد",
    description:
      "اكتشف الإسكندرية كما لم ترها من قبل عبر معرض 3D تفاعلي وموسيقى وسينما بصرية. منصة مطورة بواسطة WebAlex، مطور برمجيات ومواقع في الإسكندرية، مصر.",
    url: "https://www.iskindria.com",
    siteName: "ISKINDRIA - إسكندرية",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/vision_image.png",
        width: 1200,
        height: 630,
        alt: "منصة إسكندرية - ISKINDRIA 3D Interactive Sphere Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "إسكندرية | ISKINDRIA - Interactive 3D Web Experience",
    description:
      "Experience the timeless beauty of Alexandria through an interactive 3D Dome Gallery by Senior Web Developer WebAlex in Alexandria, Egypt.",
    images: ["/vision_image.png"],
    creator: "@webalex"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/vision_image.png" },
      { url: "/cursor.jfif" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/vision_image.png" }],
    shortcut: "/vision_image.png"
  },
  category: "technology"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className="dark min-h-screen bg-[#120F17] text-white"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/vision_image.png" />
        <link rel="shortcut icon" href="/vision_image.png" />
        <link rel="apple-touch-icon" href="/vision_image.png" />
        <JsonLd />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen w-full bg-[#120F17] font-sans antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
