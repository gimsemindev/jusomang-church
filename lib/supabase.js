// Supabase 클라이언트 (브라우저 + 서버 양쪽에서 사용)
//
// 환경변수는 Vercel(또는 .env.local)에 설정합니다:
//   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // 빌드 시점에 환경변수가 없으면 즉시 알 수 있도록 콘솔에 경고
  // (런타임에서는 supabase 호출이 실패하면 페이지에서 안내 처리)
  console.warn(
    '[Supabase] 환경변수가 비어 있습니다. .env.local 또는 Vercel 환경변수를 확인하세요.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// 유튜브 URL을 임베드 URL로 변환
// 입력 예) https://www.youtube.com/watch?v=ABCDEFG
//        https://youtu.be/ABCDEFG
//        https://www.youtube.com/embed/ABCDEFG
// 출력) https://www.youtube.com/embed/ABCDEFG
export function toYoutubeEmbed(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    let videoId = '';
    if (u.hostname.includes('youtu.be')) {
      videoId = u.pathname.slice(1);
    } else if (u.pathname.startsWith('/embed/')) {
      videoId = u.pathname.replace('/embed/', '');
    } else {
      videoId = u.searchParams.get('v') || '';
    }
    if (!videoId) return url;
    const start = u.searchParams.get('start') || u.searchParams.get('t');
    const startParam = start ? `?start=${parseInt(start, 10)}` : '';
    return `https://www.youtube.com/embed/${videoId}${startParam}`;
  } catch {
    return url;
  }
}

// 유튜브 URL에서 비디오 ID 추출 (썸네일 가져오기용)
export function getYoutubeId(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
    if (u.pathname.startsWith('/embed/')) return u.pathname.replace('/embed/', '');
    return u.searchParams.get('v') || '';
  } catch {
    return '';
  }
}

// 유튜브 썸네일 URL
export function getYoutubeThumb(url) {
  const id = getYoutubeId(url);
  if (!id) return '';
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

// 날짜 포맷터 (yyyy. MM. dd.)
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd}.`;
}
