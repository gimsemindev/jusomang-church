import { supabase } from '@/lib/supabase';
import SermonCard from '@/components/SermonCard';
import Pagination from '@/components/Pagination';

export const revalidate = 60;

export const metadata = {
  title: '설교 | 주소망교회',
};

const PAGE_SIZE = 9;

async function getSermons(page) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count, error } = await supabase
    .from('sermons')
    .select('id, title, youtube_url, preached_at', { count: 'exact' })
    .order('preached_at', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('[sermon list] error:', error.message);
    return { data: [], total: 0 };
  }
  return { data: data || [], total: count || 0 };
}

export default async function SermonListPage({ searchParams }) {
  const page = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
  const { data: sermons, total } = await getSermons(page);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-300 text-sm font-bold mb-2">SERMON</p>
          <h1 className="font-display font-bold text-3xl md:text-4xl">설교</h1>
          <p className="text-primary-200 mt-2">하나님의 말씀을 통해 은혜를 나눕니다.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sermons.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((s) => <SermonCard key={s.id} sermon={s} />)}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} />
            <p className="text-center text-xs text-primary-500 mt-4">
              총 {total}개의 설교
            </p>
          </>
        ) : (
          <p className="text-center text-primary-500 py-20">아직 등록된 설교가 없습니다.</p>
        )}
      </section>
    </>
  );
}
