'use client';

/**
 * ChurchMap
 * 교회 약도 이미지를 표시하는 공용 컴포넌트.
 * 이미지 파일은 /public/map.jpg 에 위치해야 합니다.
 *
 * props:
 *  - className: 외부 컨테이너에 적용할 추가 클래스 (보통 max-w-* 로 폭 제어)
 *  - showCaption: 하단 캡션 표시 여부 (기본 true)
 */
export default function ChurchMap({ className = 'max-w-md', showCaption = true }) {
  return (
    <div className={`w-full mx-auto ${className}`}>
      <div className="rounded-lg overflow-hidden border border-primary-100 bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/map.jpg"
          alt="주소망교회 찾아오시는 길 약도"
          className="w-full h-auto block"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.nextElementSibling) {
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }
          }}
        />
        <div
          className="w-full aspect-[4/3] bg-primary-50 items-center justify-center text-primary-500 text-sm flex-col text-center px-4 hidden"
          style={{ display: 'none' }}
        >
          <span className="text-3xl mb-2">🗺️</span>
          <span>약도 이미지를 준비 중입니다.</span>
          <span className="text-xs mt-1 text-primary-400">
            (public/map.jpg)
          </span>
        </div>
      </div>
      {showCaption && (
        <p className="text-center text-xs text-primary-500 mt-3">
          서울 마포구 상암동 1680번지 상암근린상가 3층 330호 · 주소망교회
        </p>
      )}
    </div>
  );
}
