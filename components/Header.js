'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/', label: '홈' },
  { href: '/about', label: '교회소개' },
  { href: '/sermon', label: '설교' },
  { href: '/youtube', label: '유튜브' },
  { href: '/contact', label: '오시는길' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-primary-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary-900 text-white flex items-center justify-center font-display font-bold">
              주
            </div>
            <span className="font-display font-bold text-lg sm:text-xl text-primary-900">
              주소망교회
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-primary-700 hover:text-accent-600 hover:bg-primary-50 rounded-md transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-primary-700"
            aria-label="메뉴 열기"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {open && (
          <nav className="md:hidden pb-4 border-t border-primary-100 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-primary-700 hover:bg-primary-50 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
