import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SermonCard from '@/components/SermonCard';
import YoutubeCard from '@/components/YoutubeCard';
import ChurchMap from '@/components/ChurchMap';
import StructuredData from '@/components/StructuredData';

// ISR - 1분마다 데이터 갱신
export const revalidate = 60;

async function getRecentSermons() {
  const { data, error } = await supabase
    .from('sermons')
    .select('id, title, youtube_url, preached_at')
    .order('preached_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .limit(3);
  if (error) {
    console.error('[main] sermons fetch error:', error.message);
    return [];
  }
  return data || [];
}

async function getRecentYoutube() {
  const { data, error } = await supabase
    .from('youtube_posts')
    .select('id, title, youtube_url, created_at')
    .order('created_at', { ascending: false })
    .limit(3);
  if (error) {
    console.error('[main] youtube fetch error:', error.message);
    return [];
  }
  return data || [];
}

export default async function HomePage() {
  const [sermons, youtube] = await Promise.all([
    getRecentSermons(),
    getRecentYoutube(),
  ]);

  return (
    <>
      <StructuredData type="church" />
      <StructuredData type="website" />
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            말씀과 기도가 풍성한
            <br />
            <span className="text-accent-300">주소망교회</span>에 오신 것을 환영합니다
          </h1>
          <p className="text-primary-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            하나님의 말씀이 살아있고 기도가 쉬지 않는 곳,
            <br className="hidden sm:block" />
            주소망교회에 오신 모든 분들을 진심으로 환영합니다.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-primary-900 font-bold hover:bg-accent-100 transition"
            >
              교회 둘러보기
            </Link>
            <Link
              href="/sermon"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border-2 border-white text-white font-bold hover:bg-white hover:text-primary-900 transition"
            >
              설교 듣기
            </Link>
          </div>
        </div>
      </section>

      {/* 교회 소개 (3단 카드) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12 text-primary-900">
          주소망교회 소개
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-primary-100 rounded-lg p-6 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 text-xl mb-4">
              ✝
            </div>
            <h3 className="font-display font-bold text-lg mb-2">개혁주의 신앙의 계승</h3>
            <p className="text-sm text-primary-700 leading-relaxed">
              사도신경, 니케아 신경, 칼케돈 신경을 기초로 하며, 하이델베르크 요리문답과
              웨스트민스터 신앙고백을 따르는 정통 장로교회입니다. 종교개혁자 칼빈의
              신학을 계승합니다.
            </p>
          </div>
          <div className="bg-white border border-primary-100 rounded-lg p-6 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 text-xl mb-4">
              ⛪
            </div>
            <h3 className="font-display font-bold text-lg mb-2">교단 소속</h3>
            <p className="text-sm text-primary-700 leading-relaxed">
              대한예수교 장로회(합동) 평북노회에 소속된 건전한 교회로서, 성경적 질서와
              전통을 중시합니다.
            </p>
          </div>
          <div className="bg-white border border-primary-100 rounded-lg p-6 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 text-xl mb-4">
              📖
            </div>
            <h3 className="font-display font-bold text-lg mb-2">교회의 사명</h3>
            <p className="text-sm text-primary-700 leading-relaxed">
              성경말씀 읽기와 기도를 통한 영적 성장, 그리고 전도와 선교를 통한 하나님
              나라 확장에 힘쓰는 교회입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 예배시간 안내 */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-12 text-primary-900">
            예배시간 안내
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border-l-4 border-accent-400">
              <h3 className="font-display font-bold text-lg mb-3 text-primary-900">주일예배</h3>
              <ul className="text-sm space-y-1 text-primary-700">
                <li><strong>오전 11시</strong> · 주일 대예배</li>
                <li><strong>오후 2시</strong> · 찬양예배</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-accent-400">
              <h3 className="font-display font-bold text-lg mb-3 text-primary-900">기도모임</h3>
              <ul className="text-sm space-y-1 text-primary-700">
                <li><strong>수요저녁예배</strong> · 저녁 8시</li>
                <li><strong>금요밤기도회</strong> · 저녁 8시 30분</li>
                <li><strong>평일기도회</strong> · 밤 9시 30분</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-accent-400">
              <h3 className="font-display font-bold text-lg mb-3 text-primary-900">다니엘학교</h3>
              <ul className="text-sm space-y-1 text-primary-700">
                <li><strong>주일학교</strong> · 주일 오후 12시 50분</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-primary-600 mt-8">
            모든 예배에 여러분을 초대합니다. 하나님의 임재를 경험하고 은혜를 나누는 시간이 되시길 바랍니다.
          </p>
        </div>
      </section>

      {/* 최근 설교 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-accent-600 font-bold mb-1">SERMON</p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900">
              최근 설교
            </h2>
          </div>
          <Link href="/sermon" className="text-sm text-primary-700 hover:text-accent-600">
            더보기 →
          </Link>
        </div>
        {sermons.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.map((s) => <SermonCard key={s.id} sermon={s} />)}
          </div>
        ) : (
          <p className="text-center text-primary-500 py-12">아직 등록된 설교가 없습니다.</p>
        )}
      </section>

      {/* 최근 유튜브 */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-accent-600 font-bold mb-1">YOUTUBE</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900">
                유튜브 영상
              </h2>
            </div>
            <Link href="/youtube" className="text-sm text-primary-700 hover:text-accent-600">
              더보기 →
            </Link>
          </div>
          {youtube.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtube.map((p) => <YoutubeCard key={p.id} post={p} />)}
            </div>
          ) : (
            <p className="text-center text-primary-500 py-12">아직 등록된 영상이 없습니다.</p>
          )}
        </div>
      </section>

      {/* 위치 안내 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-center mb-8 text-primary-900">
          교회 위치
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <ChurchMap showCaption={false} />
          <div className="bg-white border border-primary-100 rounded-lg p-8 text-center md:text-left">
            <p className="text-primary-800 text-lg">
              <strong>주소:</strong> 서울 마포구 월드컵로 42길 40 상암근린상가 330-333호
            </p>
            <p className="text-sm text-primary-600 mt-3">
              서부운전면허시험장 옆에 위치해 있어 찾아오시기 편리합니다.
            </p>
            <p className="text-primary-800 text-lg mt-4">
              <strong>전화:</strong>{' '}
              <a href="tel:02-302-1038" className="text-accent-700 hover:underline">02-302-1038</a>
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 px-5 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 transition"
            >
              오시는 길 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
