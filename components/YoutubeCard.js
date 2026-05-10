import Link from 'next/link';
import { getYoutubeThumb, formatDate } from '@/lib/supabase';

export default function YoutubeCard({ post }) {
  const thumb = getYoutubeThumb(post.youtube_url);

  return (
    <Link
      href={`/youtube/${post.id}`}
      className="group block bg-white rounded-lg overflow-hidden border border-primary-100 hover:shadow-lg hover:border-accent-300 transition"
    >
      <div className="relative aspect-video bg-primary-100">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-400 text-sm">
            (영상 없음)
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/30">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-primary-900 line-clamp-2 group-hover:text-accent-700 transition">
          {post.title}
        </h3>
        {post.created_at && (
          <p className="text-xs text-primary-500 mt-2">
            {formatDate(post.created_at)}
          </p>
        )}
      </div>
    </Link>
  );
}
