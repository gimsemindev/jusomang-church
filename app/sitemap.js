import { supabase } from '@/lib/supabase';

const SITE_URL = 'https://jusomang-church.vercel.app';

export default async function sitemap() {
  // 정적 페이지
  const now = new Date();
  const staticRoutes = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sermon`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/youtube`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 설교 상세 페이지 (동적)
  let sermonRoutes = [];
  try {
    const { data } = await supabase
      .from('sermons')
      .select('id, preached_at, created_at')
      .order('preached_at', { ascending: false, nullsFirst: false });
    if (data) {
      sermonRoutes = data.map((s) => ({
        url: `${SITE_URL}/sermon/${s.id}`,
        lastModified: new Date(s.preached_at || s.created_at || now),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
    }
  } catch (e) {
    console.error('[sitemap] sermon fetch error:', e?.message);
  }

  // 유튜브 상세 페이지 (동적)
  let youtubeRoutes = [];
  try {
    const { data } = await supabase
      .from('youtube_posts')
      .select('id, created_at')
      .order('created_at', { ascending: false });
    if (data) {
      youtubeRoutes = data.map((p) => ({
        url: `${SITE_URL}/youtube/${p.id}`,
        lastModified: new Date(p.created_at || now),
        changeFrequency: 'monthly',
        priority: 0.5,
      }));
    }
  } catch (e) {
    console.error('[sitemap] youtube fetch error:', e?.message);
  }

  return [...staticRoutes, ...sermonRoutes, ...youtubeRoutes];
}
