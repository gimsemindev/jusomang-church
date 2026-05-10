export const metadata = {
  title: '교회소개 | 주소망교회',
};

export default function AboutPage() {
  return (
    <>
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

        <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-900 mb-6">
          담임목사 소개
        </h2>
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h3 className="font-display font-bold text-xl text-primary-900 mb-4">교육 배경</h3>
          <ul className="text-primary-800 leading-relaxed space-y-1 mb-6">
            <li>• 서강대학교 졸업</li>
            <li>• 총신대학교 신학대학원 (M.Div) 신학석사</li>
            <li>• 총신대학교 일반대학원 (Th.M) 석사</li>
            <li>• 총신대학교 일반대학원 (Ph.D) 박사</li>
          </ul>

          <h3 className="font-display font-bold text-xl text-primary-900 mb-4">저술 활동</h3>
          <ul className="text-primary-800 leading-relaxed space-y-1 mb-6">
            <li>• 하이델베르크 제자양육</li>
            <li>• 특강 이사야 1·2</li>
            <li>• 성경은 읽기다</li>
            <li>• 언약따라 성경탐험</li>
            <li>• 욥, 하나님께 고난을 묻다</li>
            <li>• 욥, 하나님께 대답을 듣다</li>
            <li>• 외 다수의 저서</li>
          </ul>

          <h3 className="font-display font-bold text-xl text-primary-900 mb-4">목회 경력</h3>
          <p className="text-primary-800 leading-relaxed">
            서울남부교회 교육목사를 역임하였으며, 현재 주소망교회를 개척하여 담임목사로
            시무 중이십니다.
          </p>
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
