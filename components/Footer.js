import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 교회 정보 */}
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-3">
              주소망교회
            </h3>
            <p className="text-sm text-primary-200 leading-relaxed">
              말씀과 기도가 풍성한 교회<br />
              대한예수교 장로회(합동) 평북노회 소속
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="font-bold text-white mb-3">연락처</h3>
            <p className="text-sm text-primary-200 leading-relaxed">
              서울 마포구 월드컵로 42길 40<br />
              상암근린상가 330-333호<br />
              <span className="block mt-2">전화: 02-302-1038</span>
            </p>
          </div>

          {/* 빠른 메뉴 */}
          <div>
            <h3 className="font-bold text-white mb-3">메뉴</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about" className="text-primary-200 hover:text-white">교회소개</Link></li>
              <li><Link href="/sermon" className="text-primary-200 hover:text-white">설교</Link></li>
              <li><Link href="/youtube" className="text-primary-200 hover:text-white">유튜브</Link></li>
              <li><Link href="/contact" className="text-primary-200 hover:text-white">오시는길</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 text-center text-xs text-primary-300">
          © {new Date().getFullYear()} 주소망교회. All rights reserved.
          <span className="ml-3">
            <Link href="/admin" className="hover:text-white">관리자</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
