'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import QuillEditor from './QuillEditor';

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-primary-500">불러오는 중...</p>
      </div>
    );
  }

  return session ? <AdminDashboard /> : <LoginForm />;
}

// ============================================================
// 로그인 화면
// ============================================================
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message || '로그인에 실패했습니다.');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <h1 className="font-display font-bold text-2xl text-primary-900 mb-2">관리자 로그인</h1>
      <p className="text-sm text-primary-600 mb-8">
        관리자 계정으로 로그인하시면 게시글을 작성/수정/삭제할 수 있습니다.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-primary-800 mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-primary-200 rounded-md focus:outline-none focus:border-primary-500"
            placeholder="admin@jusomang.org"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-primary-800 mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-primary-200 rounded-md focus:outline-none focus:border-primary-500"
          />
        </div>
        {err && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {err}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-primary-900 text-white py-3 rounded-md hover:bg-primary-800 disabled:opacity-50"
        >
          {busy ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}

// ============================================================
// 관리자 대시보드
// ============================================================
function AdminDashboard() {
  const [tab, setTab] = useState('sermon');
  const [editing, setEditing] = useState(null); // null | 'new' | id
  const [refreshKey, setRefreshKey] = useState(0);

  const onLogout = async () => {
    await supabase.auth.signOut();
  };

  const onSaved = () => {
    setEditing(null);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-primary-900">관리자</h1>
        <button
          onClick={onLogout}
          className="text-sm text-primary-600 hover:text-primary-900 underline"
        >
          로그아웃
        </button>
      </div>

      {/* 탭 */}
      <div className="border-b border-primary-200 mb-6">
        <button
          onClick={() => { setTab('sermon'); setEditing(null); }}
          className={`px-4 py-2 font-bold ${tab === 'sermon' ? 'border-b-2 border-primary-900 text-primary-900' : 'text-primary-500'}`}
        >
          설교 관리
        </button>
        <button
          onClick={() => { setTab('youtube'); setEditing(null); }}
          className={`px-4 py-2 font-bold ${tab === 'youtube' ? 'border-b-2 border-primary-900 text-primary-900' : 'text-primary-500'}`}
        >
          유튜브 관리
        </button>
      </div>

      {/* 본문 */}
      {tab === 'sermon' && (
        editing !== null
          ? <SermonForm id={editing === 'new' ? null : editing} onSaved={onSaved} onCancel={() => setEditing(null)} />
          : <SermonList key={refreshKey} onNew={() => setEditing('new')} onEdit={(id) => setEditing(id)} />
      )}
      {tab === 'youtube' && (
        editing !== null
          ? <YoutubeForm id={editing === 'new' ? null : editing} onSaved={onSaved} onCancel={() => setEditing(null)} />
          : <YoutubeList key={refreshKey} onNew={() => setEditing('new')} onEdit={(id) => setEditing(id)} />
      )}
    </div>
  );
}

// ============================================================
// 설교 리스트
// ============================================================
function SermonList({ onNew, onEdit }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    supabase
      .from('sermons')
      .select('id, title, preached_at, created_at, view_count')
      .order('preached_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setItems(data || []);
      });
  }, []);

  const onDelete = async (id, title) => {
    if (!confirm(`"${title}" 설교를 삭제하시겠습니까? 되돌릴 수 없습니다.`)) return;
    const { error } = await supabase.from('sermons').delete().eq('id', id);
    if (error) {
      alert('삭제 실패: ' + error.message);
      return;
    }
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-primary-600">총 {items?.length ?? '...'}개</p>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 text-sm"
        >
          + 새 설교 작성
        </button>
      </div>
      {items === null ? (
        <p className="text-primary-500 text-center py-10">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="text-primary-500 text-center py-10">등록된 설교가 없습니다.</p>
      ) : (
        <div className="bg-white border border-primary-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary-50 text-primary-700">
              <tr>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left w-32 hidden sm:table-cell">설교일</th>
                <th className="px-4 py-3 text-center w-20 hidden md:table-cell">조회</th>
                <th className="px-4 py-3 text-center w-32">관리</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-t border-primary-100 hover:bg-primary-50">
                  <td className="px-4 py-3">{s.title}</td>
                  <td className="px-4 py-3 text-primary-600 hidden sm:table-cell">{s.preached_at || '-'}</td>
                  <td className="px-4 py-3 text-center text-primary-600 hidden md:table-cell">{s.view_count || 0}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => onEdit(s.id)}
                      className="text-primary-700 hover:text-primary-900 underline"
                    >수정</button>
                    <button
                      onClick={() => onDelete(s.id, s.title)}
                      className="text-red-600 hover:text-red-800 underline"
                    >삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 설교 작성/수정 폼
// ============================================================
function SermonForm({ id, onSaved, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    youtube_url: '',
    content: '',
    preached_at: new Date().toISOString().slice(0, 10),
    pdf_url: '',
    pdf_filename: '',
  });
  const [pdfFile, setPdfFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase.from('sermons').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({
        title: data.title || '',
        youtube_url: data.youtube_url || '',
        content: data.content || '',
        preached_at: data.preached_at || '',
        pdf_url: data.pdf_url || '',
        pdf_filename: data.pdf_filename || '',
      });
    });
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);

    let pdf_url = form.pdf_url;
    let pdf_filename = form.pdf_filename;

    // 1) PDF 업로드 (있는 경우)
    if (pdfFile) {
      if (pdfFile.size > 10 * 1024 * 1024) {
        setBusy(false);
        setErr('PDF 파일은 10MB 이하만 업로드 가능합니다.');
        return;
      }
      const safeName = pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `sermons/${Date.now()}_${safeName}`;
      const { error: upErr } = await supabase.storage
        .from('sermon-files')
        .upload(path, pdfFile, { contentType: 'application/pdf' });
      if (upErr) {
        setBusy(false);
        setErr('PDF 업로드 실패: ' + upErr.message);
        return;
      }
      const { data: pub } = supabase.storage.from('sermon-files').getPublicUrl(path);
      pdf_url = pub.publicUrl;
      pdf_filename = pdfFile.name;
    }

    const payload = {
      title: form.title.trim(),
      youtube_url: form.youtube_url.trim() || null,
      content: form.content || null,
      preached_at: form.preached_at || null,
      pdf_url: pdf_url || null,
      pdf_filename: pdf_filename || null,
    };

    if (!payload.title) {
      setBusy(false);
      setErr('제목은 필수입니다.');
      return;
    }

    let res;
    if (id) {
      res = await supabase.from('sermons').update(payload).eq('id', id);
    } else {
      res = await supabase.from('sermons').insert(payload);
    }
    setBusy(false);
    if (res.error) {
      setErr('저장 실패: ' + res.error.message);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <h2 className="font-display font-bold text-xl text-primary-900">
        {id ? '설교 수정' : '새 설교 작성'}
      </h2>

      <Field label="제목 *">
        <input
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
          className="input"
          placeholder="예) 요한복음 21장 강해설교"
        />
      </Field>

      <Field label="설교일자">
        <input
          type="date"
          value={form.preached_at}
          onChange={(e) => set('preached_at', e.target.value)}
          className="input"
        />
      </Field>

      <Field
        label="유튜브 URL"
        hint="예) https://www.youtube.com/watch?v=ABCD1234 또는 https://youtu.be/ABCD1234"
      >
        <input
          type="url"
          value={form.youtube_url}
          onChange={(e) => set('youtube_url', e.target.value)}
          className="input"
        />
      </Field>

      <Field label="본문" hint="굵게, 기울임, 제목, 목록, 링크, 이미지 등을 자유롭게 사용하실 수 있습니다.">
        <QuillEditor
          value={form.content}
          onChange={(html) => set('content', html)}
          placeholder="설교 본문을 입력하세요..."
        />
      </Field>

      <Field label="PDF 첨부 (선택, 10MB 이하)">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          className="block text-sm"
        />
        {form.pdf_url && !pdfFile && (
          <p className="text-xs text-primary-600 mt-1">
            현재 첨부: <a href={form.pdf_url} target="_blank" rel="noopener noreferrer" className="underline">{form.pdf_filename || 'PDF'}</a>
          </p>
        )}
      </Field>

      {err && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{err}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="px-6 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 disabled:opacity-50"
        >
          {busy ? '저장 중...' : (id ? '수정 완료' : '발행하기')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50"
        >
          취소
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #c7d0e0;
          border-radius: 0.375rem;
          outline: none;
        }
        .input:focus {
          border-color: #4d6388;
        }
      `}</style>
    </form>
  );
}

// ============================================================
// 유튜브 리스트
// ============================================================
function YoutubeList({ onNew, onEdit }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    supabase
      .from('youtube_posts')
      .select('id, title, created_at, view_count')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setItems(data || []);
      });
  }, []);

  const onDelete = async (id, title) => {
    if (!confirm(`"${title}" 영상을 삭제하시겠습니까?`)) return;
    const { error } = await supabase.from('youtube_posts').delete().eq('id', id);
    if (error) {
      alert('삭제 실패: ' + error.message);
      return;
    }
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-primary-600">총 {items?.length ?? '...'}개</p>
        <button
          onClick={onNew}
          className="px-4 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 text-sm"
        >
          + 새 영상 등록
        </button>
      </div>
      {items === null ? (
        <p className="text-primary-500 text-center py-10">불러오는 중...</p>
      ) : items.length === 0 ? (
        <p className="text-primary-500 text-center py-10">등록된 영상이 없습니다.</p>
      ) : (
        <div className="bg-white border border-primary-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary-50 text-primary-700">
              <tr>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left w-32 hidden sm:table-cell">등록일</th>
                <th className="px-4 py-3 text-center w-20 hidden md:table-cell">조회</th>
                <th className="px-4 py-3 text-center w-32">관리</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t border-primary-100 hover:bg-primary-50">
                  <td className="px-4 py-3">{p.title}</td>
                  <td className="px-4 py-3 text-primary-600 hidden sm:table-cell">
                    {p.created_at?.slice(0, 10)}
                  </td>
                  <td className="px-4 py-3 text-center text-primary-600 hidden md:table-cell">{p.view_count || 0}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button onClick={() => onEdit(p.id)} className="text-primary-700 hover:text-primary-900 underline">수정</button>
                    <button onClick={() => onDelete(p.id, p.title)} className="text-red-600 hover:text-red-800 underline">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================================
// 유튜브 작성/수정 폼
// ============================================================
function YoutubeForm({ id, onSaved, onCancel }) {
  const [form, setForm] = useState({ title: '', youtube_url: '', description: '' });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (!id) return;
    supabase.from('youtube_posts').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({
        title: data.title || '',
        youtube_url: data.youtube_url || '',
        description: data.description || '',
      });
    });
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);

    const payload = {
      title: form.title.trim(),
      youtube_url: form.youtube_url.trim(),
      description: form.description.trim() || null,
    };
    if (!payload.title || !payload.youtube_url) {
      setBusy(false);
      setErr('제목과 유튜브 URL은 필수입니다.');
      return;
    }

    let res;
    if (id) res = await supabase.from('youtube_posts').update(payload).eq('id', id);
    else    res = await supabase.from('youtube_posts').insert(payload);

    setBusy(false);
    if (res.error) {
      setErr('저장 실패: ' + res.error.message);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5 max-w-2xl">
      <h2 className="font-display font-bold text-xl text-primary-900">
        {id ? '영상 수정' : '새 영상 등록'}
      </h2>

      <Field label="제목 *">
        <input
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          required
          className="input"
          placeholder="영상 제목"
        />
      </Field>

      <Field label="유튜브 URL *">
        <input
          type="url"
          value={form.youtube_url}
          onChange={(e) => set('youtube_url', e.target.value)}
          required
          className="input"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </Field>

      <Field label="설명 (선택)">
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={4}
          className="input"
          placeholder="영상에 대한 짧은 설명"
        />
      </Field>

      {err && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">{err}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="px-6 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 disabled:opacity-50"
        >
          {busy ? '저장 중...' : (id ? '수정 완료' : '발행하기')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50"
        >
          취소
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #c7d0e0;
          border-radius: 0.375rem;
          outline: none;
        }
        .input:focus { border-color: #4d6388; }
      `}</style>
    </form>
  );
}

// ============================================================
// 공통 필드 라벨
// ============================================================
function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-bold text-primary-800 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-primary-500 mt-1">{hint}</p>}
    </div>
  );
}
