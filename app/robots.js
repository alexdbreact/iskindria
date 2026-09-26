export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/']
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: 'https://www.iskindria.com/sitemap.xml',
    host: 'https://www.iskindria.com'
  };
}
