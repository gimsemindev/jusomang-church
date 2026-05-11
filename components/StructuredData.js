/**
 * StructuredData
 * JSON-LD 구조화 데이터를 페이지에 삽입합니다.
 * Google/Naver 등 검색엔진이 교회 정보를 더 잘 이해하도록 돕습니다.
 *
 * 종류:
 *  - "church"  : 메인/소개 페이지용 Church + LocalBusiness
 *  - "contact" : 오시는길 페이지용 (주소/지도 강조)
 *  - "website" : 사이트 전체 검색 박스용 WebSite
 *  - "breadcrumb" : 빵부스러기 (props.items 필요)
 */

const SITE_URL = 'https://jusomang-church.vercel.app';
const SITE_NAME = '주소망교회';

const CHURCH_INFO = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  '@id': `${SITE_URL}/#church`,
  name: '주소망교회',
  alternateName: ['대한예수교장로회 주소망교회', '주소망 교회'],
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    '하나님의 말씀이 살아있고 기도가 쉬지 않는 곳, 서울 마포구 상암동에 위치한 대한예수교 장로회(합동) 소속 정통 개혁주의 교회입니다.',
  telephone: '+82-2-302-1038',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '상암동 1680번지 상암근린상가 3층 330호',
    addressLocality: '마포구',
    addressRegion: '서울특별시',
    postalCode: '03900',
    addressCountry: 'KR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.5793,
    longitude: 126.8869,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '11:00',
      closes: '15:00',
      description: '주일 대예배 11:00 / 찬양예배 14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Wednesday',
      opens: '20:00',
      closes: '21:00',
      description: '수요 저녁예배',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '20:30',
      closes: '22:00',
      description: '금요 밤기도회',
    },
  ],
  sameAs: [
    // TODO: 교회 SNS/유튜브 채널이 있으면 여기에 추가
    // 'https://www.youtube.com/@jusomangchurch',
  ],
  knowsLanguage: ['ko'],
  areaServed: {
    '@type': 'City',
    name: '서울',
  },
  religion: 'Christianity',
};

const WEBSITE_INFO = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: '주소망교회 공식 웹사이트',
  inLanguage: 'ko-KR',
  publisher: {
    '@id': `${SITE_URL}/#church`,
  },
};

export default function StructuredData({ type = 'church', items }) {
  let payload;

  switch (type) {
    case 'church':
      payload = CHURCH_INFO;
      break;
    case 'contact':
      payload = {
        ...CHURCH_INFO,
        '@type': ['Church', 'LocalBusiness'],
      };
      break;
    case 'website':
      payload = WEBSITE_INFO;
      break;
    case 'breadcrumb':
      payload = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: (items || []).map((it, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: it.name,
          item: it.url?.startsWith('http') ? it.url : `${SITE_URL}${it.url}`,
        })),
      };
      break;
    default:
      payload = CHURCH_INFO;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
