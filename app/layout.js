import "./globals.css";

export const metadata = {
  title: "ISKINDRIA | As You Never Seen Before",
  description: "Experience the timeless beauty of Alexandria through an interactive 3D Dome Gallery with music and video.",
  icons: {
    icon: [
      { url: '/vision_image.png' },
      { url: '/cursor.jfif' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/vision_image.png' }
    ],
    shortcut: '/vision_image.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark h-full bg-[#120F17] text-white"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/vision_image.png" />
        <link rel="shortcut icon" href="/vision_image.png" />
        <link rel="apple-touch-icon" href="/vision_image.png" />
      </head>
      <body
        suppressHydrationWarning
        className="h-full w-full overflow-hidden bg-[#120F17] font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
