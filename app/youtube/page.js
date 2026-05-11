import { supabase } from '@/lib/supabase';
import YoutubeCard from '@/components/YoutubeCard';
import Pagination from '@/components/Pagination';

export const revalidate = 60;

export const metadata = {
  title: '유튜브',
  description:
    '주소망교회 유튜브 영상 모음 — 설교, 찬양, 교회 행사 영상을 한 곳에서 만나보세요.',
  alternates: { canonical: '/youtube' },
  openGraph: {
    title: '유튜브 | 주소망교회',
    description: '주소망교회 유튜브 영상',
    url: '/youtube',
  },
};

const PAGE_SIZE = 9;

async function getPosts(page) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from('youtube_posts')
    .select('id, title, youtube_url, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[youtube list] error:', error.message);
    return { data: [], total: 0 };
  }
  return { data: data || [], total: count || 0 };
}

export default async function YoutubeListPage({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const { data: posts, total } = await getPosts(page);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-300 text-sm font-bold mb-2">YOUTUBE</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl">유튜브</h1>
          <p className="text-primary-200 mt-2">주소망교회의 다양한 영상을 만나보세요.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => <YoutubeCard key={p.id} post={p} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
            <p className="text-center text-xs text-primary-500 mt-4">
              총 {total}개의 영상
            </p>
          </>
        ) : (
          <p className="text-center text-primary-500 py-20">아직 등록된 영상이 없습니다.</p>
        )}
      </section>
    </>
  );
}
