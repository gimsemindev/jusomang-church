import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '주소망교회 | 말씀과 기도가 풍성한 교회',
  description:
    '하나님의 말씀이 살아있고 기도가 쉬지 않는 곳, 주소망교회에 오신 모든 분들을 진심으로 환영합니다.',
  keywords: ['주소망교회', '교회', '예수교 장로회', '합동', '개혁주의', '마포구', '상암동'],
  openGraph: {
    title: '주소망교회',
    description: '말씀과 기도가 풍성한 주소망교회',
    type: 'website',
    locale: 'ko_KR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
