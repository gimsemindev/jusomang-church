import PastorImage from './PastorImage';
import StructuredData from '@/components/StructuredData';

export const metadata = {
  title: '교회소개',
  description:
    '주소망교회는 대한예수교 장로회(합동) 평북노회 소속의 정통 개혁주의 장로교회입니다. 사도신경·니케아 신경·웨스트민스터 신앙고백을 따르며, 말씀과 기도가 살아있는 공동체입니다. 담임 김영민 목사.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: '교회소개 | 주소망교회',
    description: '말씀과 기도가 풍성한 정통 개혁주의 장로교회',
    url: '/about',
  },
};

// 담임목사 정보 — 여기를 수정하시면 됩니다
const PASTOR = {
  name: '김영민 목사',
  photo: '/pastor.jpg',  // public 폴더에 pastor.jpg 파일을 두면 자동 표시됨
  title: '주소망교회 담임목사',
};

export default function AboutPage() {
  return (
    <>
      <StructuredData type="church" />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: '홈', url: '/' },
          { name: '교회소개', url: '/about' },
        ]}
      />
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl">교회소개</h1>
          <p className="text-primary-200 mt-2">주소망교회에 대해 알려드립니다.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-6">
          정통 개혁주의 신앙의 교회
        </h2>
        <p className="text-primary-800 leading-relaxed mb-4">
          정통 개혁주의 신앙을 바탕으로 세워진 주소망교회는 말씀과 기도가 살아있는 공동체입니다.
          하나님의 말씀이 영원하며, 기도가 끊이지 않는 곳, 그곳이 바로 주소망교회입니다.
        </p>
        <p className="text-primary-800 leading-relaxed mb-12">
          사도신경, 니케아 신경, 칼케돈 신경을 기초로 하며, 하이델베르크 요리문답과
          웨스트민스터 신앙고백을 따르는 정통 장로교회로서, 종교개혁자 칼빈의 신학을
          계승하고 있습니다. 대한예수교 장로회(합동) 평북노회에 소속된 건전한 교회입니다.
        </p>

        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-8">
          담임목사 소개
        </h2>

        {/* 사진 + 이름 영역 */}
        <div className="bg-primary-50 rounded-lg p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-8">
            {/* 사진 */}
            <PastorImage src={PASTOR.photo} alt={PASTOR.name} />

            {/* 이름과 직책 */}
            <div className="text-center md:text-left">
              <h3 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-2">
                {PASTOR.name}
              </h3>
              <p className="text-primary-600 mb-4">{PASTOR.title}</p>
              <p className="text-sm text-primary-700 leading-relaxed">
                정통 개혁주의 신앙에 기초하여 하나님의 말씀을 가르치고, 양들을 돌보며,
                주소망교회 공동체를 섬기고 있습니다.
              </p>
            </div>
          </div>

          {/* 학력/저술/경력 */}
          <div className="border-t border-primary-200 pt-6 space-y-6">
            <div>
              <h4 className="font-display font-bold text-lg text-primary-900 mb-3">
                📚 교육 배경
              </h4>
              <ul className="text-primary-800 leading-relaxed space-y-1 text-sm md:text-base">
                <li>• 서강대학교 졸업</li>
                <li>• 총신대학교 신학대학원 (M.Div) 신학석사</li>
                <li>• 총신대학교 일반대학원 (Th.M) 석사</li>
                <li>• 총신대학교 일반대학원 (Ph.D) 박사</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg text-primary-900 mb-3">
                ✍️ 저술 활동
              </h4>
              <ul className="text-primary-800 leading-relaxed space-y-1 text-sm md:text-base">
                <li>• 하이델베르크 제자양육</li>
                <li>• 특강 이사야 1·2</li>
                <li>• 성경은 읽기다</li>
                <li>• 언약따라 성경탐험</li>
                <li>• 욥, 하나님께 고난을 묻다</li>
                <li>• 욥, 하나님께 대답을 듣다</li>
                <li>• 외 다수의 저서</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg text-primary-900 mb-3">
                🎓 강의 활동
              </h4>
              <ul className="text-primary-800 leading-relaxed space-y-1 text-sm md:text-base">
                <li>• 총신대학교 목회신학전문대학원 겸임교수</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg text-primary-900 mb-3">
                ⛪ 목회 경력
              </h4>
              <p className="text-primary-800 leading-relaxed text-sm md:text-base">
                서울남부교회 교육목사를 역임하였으며, 현재 주소망교회를 개척하여 담임목사로
                시무 중이십니다.
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-6">
          교회의 사명
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-l-4 border-accent-400 pl-4">
            <h3 className="font-bold text-primary-900 mb-2">모든 세대가 함께</h3>
            <p className="text-sm text-primary-700">
              유아부터 어른까지 모든 세대가 함께 예배하며 하나님의 사랑을 나누는
              공동체입니다.
            </p>
          </div>
          <div className="border-l-4 border-accent-400 pl-4">
            <h3 className="font-bold text-primary-900 mb-2">삶의 변화와 축복</h3>
            <p className="text-sm text-primary-700">
              하나님의 말씀을 통해 삶이 변화되고 참된 축복을 누리는 은혜의 자리입니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
