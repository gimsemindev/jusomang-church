const SITE_URL = 'https://jusomang-church.vercel.app';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // 네이버 검색 크롤러
      {
        userAgent: 'Yeti',
        allow: '/',
      },
      // 다음 카카오 검색 크롤러
      {
        userAgent: 'Daumoa',
        allow: '/',
      },
      // 빙
      {
        userAgent: 'bingbot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
