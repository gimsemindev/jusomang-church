import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE_URL = 'https://jusomang-church.vercel.app';
const SITE_NAME = '주소망교회';
const SITE_DESCRIPTION =
  '하나님의 말씀이 살아있고 기도가 쉬지 않는 곳, 주소망교회에 오신 모든 분들을 진심으로 환영합니다. 서울 마포구 상암동에 위치한 대한예수교 장로회(합동) 소속 정통 개혁주의 교회입니다.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '주소망교회 | 말씀과 기도가 풍성한 교회',
    template: '%s | 주소망교회',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: '주소망교회' }],
  generator: 'Next.js',
  keywords: [
    '주소망교회',
    '상암동 교회',
    '마포구 교회',
    '서울 교회',
    '대한예수교 장로회',
    '예장합동',
    '합동교단',
    '개혁주의 교회',
    '정통 장로교회',
    '평북노회',
    '월드컵경기장 교회',
    '상암 교회',
    '말씀 교회',
    '기도 교회',
  ],
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: '주소망교회 | 말씀과 기도가 풍성한 교회',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '주소망교회',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '주소망교회 | 말씀과 기도가 풍성한 교회',
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
  verification: {
    // TODO: 네이버 서치어드바이저(https://searchadvisor.naver.com)에서 발급받은 코드 입력
    other: {
      'naver-site-verification': 'f926c21eabdda966a6508f273292cbad48963403',
    },
    // TODO: 구글 서치콘솔(https://search.google.com/search-console)에서 발급받은 코드 입력
    google: 'GOOGLE_VERIFICATION_CODE_HERE',
  },
  category: 'religion',
  other: {
    'og:locale': 'ko_KR',
    'theme-color': '#1e3a8a',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a8a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
