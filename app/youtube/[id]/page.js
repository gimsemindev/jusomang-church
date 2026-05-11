import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase, toYoutubeEmbed, formatDate } from '@/lib/supabase';

export const revalidate = 60;

async function getPost(id) {
  const { data, error } = await supabase
    .from('youtube_posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data;
}

async function getAdjacent(id) {
  const [prev, next] = await Promise.all([
    supabase
      .from('youtube_posts')
      .select('id, title')
      .lt('id', id)
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('youtube_posts')
      .select('id, title')
      .gt('id', id)
      .order('id', { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return { prev: prev.data, next: next.data };
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.id);
  if (!post) return { title: '유튜브' };

  const desc = post.description
    ? String(post.description).replace(/\s+/g, ' ').trim().slice(0, 150)
    : `${post.title} - 주소망교회 유튜브 영상`;

  return {
    title: post.title,
    description: desc,
    alternates: { canonical: `/youtube/${post.id}` },
    openGraph: {
      title: `${post.title} | 주소망교회`,
      description: desc,
      url: `/youtube/${post.id}`,
      type: 'video.other',
      publishedTime: post.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: desc,
    },
  };
}

export default async function YoutubeDetailPage({ params }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  supabase.rpc('increment_youtube_views', { post_id: Number(params.id) }).then(() => {});

  const embedUrl = toYoutubeEmbed(post.youtube_url);
  const { prev, next } = await getAdjacent(Number(params.id));

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-primary-500 mb-3">
        <Link href="/youtube" className="hover:text-primary-700">유튜브</Link>
        <span className="mx-2">/</span>
        <span>상세</span>
      </nav>

      <h1 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-3">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-primary-500 mb-8 pb-4 border-b border-primary-100">
        {post.created_at && <span>{formatDate(post.created_at)}</span>}
        <span>조회 {post.view_count || 0}</span>
      </div>

      {embedUrl && (
        <div className="video-container mb-8 rounded-lg overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {post.description && (
        <div className="prose-church mb-8 whitespace-pre-wrap">
          {post.description}
        </div>
      )}

      <div className="border-t border-primary-200 pt-6 flex items-center justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/youtube/${prev.id}`} className="flex-1 hover:text-accent-700">
            <span className="block text-xs text-primary-500">‹ 이전 영상</span>
            <span className="block truncate">{prev.title}</span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/youtube/${next.id}`} className="flex-1 text-right hover:text-accent-700">
            <span className="block text-xs text-primary-500">다음 영상 ›</span>
            <span className="block truncate">{next.title}</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/youtube"
          className="inline-block px-5 py-2 border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50 transition text-sm"
        >
          목록으로
        </Link>
      </div>
    </article>
  );
}
