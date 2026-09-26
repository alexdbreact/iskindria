export default function sitemap() {
  const baseUrl = 'https://www.iskindria.com';
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          'ar-EG': `${baseUrl}`,
          'en-US': `${baseUrl}`,
          'x-default': `${baseUrl}`
        }
      }
    },
    {
      url: `${baseUrl}/start`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'ar-EG': `${baseUrl}/start`,
          'en-US': `${baseUrl}/start`,
          'x-default': `${baseUrl}/start`
        }
      }
    }
  ];
}
