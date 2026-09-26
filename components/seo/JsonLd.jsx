export default function JsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ISKINDRIA | إسكندرية',
    alternateName: ['منصة إسكندرية', 'Iskindria Platform', 'Iskindria'],
    url: 'https://www.iskindria.com',
    description:
      'منصة إسكندرية - تجارب رقمية ثلاثية الأبعاد ومعرض تفاعلي لمدينة الإسكندرية بتطوير إبداعي بواسطة مطور ويب متكامل.',
    inLanguage: ['ar-EG', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.iskindria.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': 'https://www.iskindria.com/#localbusiness',
    name: 'Iskindria | Senior Web Developer in Alexandria',
    alternateName: 'منصة إسكندرية لتطوير المواقع والبرمجيات في الإسكندرية',
    description:
      'Senior Web Developer & Creative Full Stack Architect based in Alexandria, Egypt. Specialized in high-performance Next.js web applications, 3D WebGL platforms, custom software engineering, and digital solutions.',
    url: 'https://www.iskindria.com',
    telephone: '+201159666279',
    priceRange: '$$',
    image: 'https://www.iskindria.com/vision_image.png',
    logo: 'https://www.iskindria.com/vision_image.png',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.2001,
      longitude: 29.9187
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Alexandria',
      addressRegion: 'Alexandria Governorate',
      addressCountry: 'EG'
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Alexandria',
        alternateName: ['الإسكندرية', 'الاسكندرية', 'Alex']
      },
      {
        '@type': 'City',
        name: 'Cairo',
        alternateName: 'القاهرة'
      },
      {
        '@type': 'Country',
        name: 'Egypt',
        alternateName: 'مصر'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Worldwide Remote'
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '09:00',
        closes: '22:00'
      }
    ],
    sameAs: [
      'https://webalex-ten.vercel.app/',
      'https://historical-alex.vercel.app/'
    ]
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.iskindria.com/#developer',
    name: 'WebAlex',
    alternateName: ['مطور مواقع الإسكندرية', 'Senior Web Developer Alexandria'],
    jobTitle: 'Senior Full Stack & Creative Web Developer',
    description:
      'Senior Web Developer specializing in React, Next.js, 3D WebGL engineering, and modern digital platform architecture in Alexandria, Egypt.',
    url: 'https://webalex-ten.vercel.app/',
    telephone: '+201159666279',
    worksFor: {
      '@type': 'Organization',
      name: 'Iskindria',
      url: 'https://www.iskindria.com'
    },
    sameAs: [
      'https://webalex-ten.vercel.app/'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
