'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// react-quill-new는 window를 사용하므로 SSR 비활성화 필수
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="border border-primary-200 rounded-md p-4 bg-primary-50 text-primary-500 text-sm">
      에디터 불러오는 중...
    </div>
  ),
});

// 툴바 옵션 (필요한 기능만 골라 사용)
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote'],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'blockquote',
  'link', 'image',
];

export default function QuillEditor({ value, onChange, placeholder }) {
  return (
    <div className="quill-wrap">
      <ReactQuill
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || '설교 본문을 입력하세요...'}
      />
      <style jsx global>{`
        .quill-wrap .ql-container {
          min-height: 280px;
          font-size: 15px;
          font-family: inherit;
        }
        .quill-wrap .ql-editor {
          min-height: 280px;
          line-height: 1.7;
        }
        .quill-wrap .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-color: #c7d0e0;
        }
        .quill-wrap .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-color: #c7d0e0;
        }
      `}</style>
    </div>
  );
}
