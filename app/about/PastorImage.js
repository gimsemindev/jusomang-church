'use client';

export default function PastorImage({ src, alt }) {
  return (
    <div className="flex-shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover bg-primary-200 shadow-md"
        onError={(e) => {
          // 사진 파일이 없을 때 대체 표시
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.nextElementSibling) {
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }
        }}
      />
      <div
        className="w-40 h-40 md:w-48 md:h-48 rounded-lg bg-primary-200 items-center justify-center text-primary-500 text-sm flex-col text-center px-3 hidden"
        style={{ display: 'none' }}
      >
        <span className="text-3xl mb-2">📷</span>
        <span>사진 준비중</span>
      </div>
    </div>
  );
}
