import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase, toYoutubeEmbed, formatDate } from '@/lib/supabase';

export const revalidate = 60;

async function getSermon(id) {
  const { data, error } = await supabase
    .from('sermons')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data;
}

async function getAdjacent(id, preached_at) {
  // 이전글: 더 오래된 설교 중 가장 최근
  // 다음글: 더 최근 설교 중 가장 오래된
  const [prev, next] = await Promise.all([
    supabase
      .from('sermons')
      .select('id, title')
      .lt('preached_at', preached_at || '9999-12-31')
      .order('preached_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('sermons')
      .select('id, title')
      .gt('preached_at', preached_at || '0001-01-01')
      .order('preached_at', { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return { prev: prev.data, next: next.data };
}

export async function generateMetadata({ params }) {
  const sermon = await getSermon(params.id);
  if (!sermon) return { title: '설교 | 주소망교회' };
  return { title: `${sermon.title} | 주소망교회` };
}

export default async function SermonDetailPage({ params }) {
  const sermon = await getSermon(params.id);
  if (!sermon) notFound();

  // 조회수 증가 (실패해도 페이지는 계속 보여줌)
  supabase.rpc('increment_sermon_views', { sermon_id: Number(params.id) }).then(() => {});

  const embedUrl = toYoutubeEmbed(sermon.youtube_url);
  const { prev, next } = await getAdjacent(sermon.id, sermon.preached_at);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-primary-500 mb-3">
        <Link href="/sermon" className="hover:text-primary-700">설교</Link>
        <span className="mx-2">/</span>
        <span>상세</span>
      </nav>

      <h1 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-3">
        {sermon.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-primary-500 mb-8 pb-4 border-b border-primary-100">
        {sermon.preached_at && <span>{formatDate(sermon.preached_at)}</span>}
        <span>조회 {sermon.view_count || 0}</span>
      </div>

      {embedUrl && (
        <div className="video-container mb-8 rounded-lg overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {sermon.content && (
        <div
          className="prose-church mb-8"
          dangerouslySetInnerHTML={{ __html: sermon.content }}
        />
      )}

      {sermon.pdf_url && (
        <div className="bg-primary-50 rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-accent-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 012-2h6l4 4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            <div>
              <p className="font-bold text-primary-900 text-sm">설교 자료 다운로드</p>
              <p className="text-xs text-primary-600">{sermon.pdf_filename || 'PDF 파일'}</p>
            </div>
          </div>
          <a
            href={sermon.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary-900 text-white text-sm rounded-md hover:bg-primary-800 transition"
          >
            다운로드
          </a>
        </div>
      )}

      {/* 이전/다음 글 */}
      <div className="border-t border-primary-200 pt-6 flex items-center justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/sermon/${prev.id}`} className="flex-1 hover:text-accent-700">
            <span className="block text-xs text-primary-500">‹ 이전 설교</span>
            <span className="block truncate">{prev.title}</span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/sermon/${next.id}`} className="flex-1 text-right hover:text-accent-700">
            <span className="block text-xs text-primary-500">다음 설교 ›</span>
            <span className="block truncate">{next.title}</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/sermon"
          className="inline-block px-5 py-2 border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50 transition text-sm"
        >
          목록으로
        </Link>
      </div>
    </article>
  );
}
