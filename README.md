# 주소망교회 홈페이지

말씀과 기도가 풍성한 주소망교회 공식 홈페이지.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **디자인**: Tailwind CSS
- **백엔드**: Supabase (PostgreSQL + Auth + Storage)
- **호스팅**: Vercel
- **언어**: JavaScript

## 주요 기능

- 메인페이지 (환영 메시지, 예배시간, 최근 설교/유튜브 미리보기)
- 설교 게시판 (유튜브 임베드 + 본문 + PDF 첨부)
- 유튜브 게시판 (영상 모음)
- 페이지네이션, 이전글/다음글 네비게이션
- 관리자 페이지 (`/admin`)
  - 이메일/비밀번호 로그인 (Supabase Auth)
  - 게시글 작성/수정/삭제
  - PDF 업로드 (Supabase Storage)

## 폴더 구조

```
.
├─ app/                      Next.js 페이지
│  ├─ page.js                / (메인)
│  ├─ about/page.js          /about
│  ├─ contact/page.js        /contact
│  ├─ sermon/page.js         /sermon (리스트)
│  ├─ sermon/[id]/page.js    /sermon/N (상세)
│  ├─ youtube/page.js        /youtube (리스트)
│  ├─ youtube/[id]/page.js   /youtube/N (상세)
│  ├─ admin/page.js          /admin (관리자)
│  ├─ layout.js              공통 레이아웃
│  └─ globals.css            전체 스타일
├─ components/               재사용 컴포넌트
│  ├─ Header.js
│  ├─ Footer.js
│  ├─ SermonCard.js
│  ├─ YoutubeCard.js
│  └─ Pagination.js
├─ lib/
│  └─ supabase.js            Supabase 클라이언트 + 유틸 함수
└─ public/                   정적 파일
```

## 환경변수

`.env.local` 파일을 프로젝트 루트에 만들고 다음을 입력:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Vercel 배포 시에는 Project Settings → Environment Variables에 동일하게 추가.

## 로컬 개발 (선택사항)

Node.js 18 이상이 설치되어 있어야 합니다.

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인.

## 배포

`03_배포가이드.md` 참고.

## 데이터베이스 설정

`02_Supabase_설정.sql` 참고. Supabase SQL Editor에서 실행하면 테이블/정책이 자동 생성됩니다.

## 라이선스

© 주소망교회. All rights reserved.
