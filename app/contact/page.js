export const metadata = {
  title: '오시는길 | 주소망교회',
};

export default function ContactPage() {
  const address = '서울 마포구 월드컵로 42길 40 상암근린상가 330-333호';
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(address)}`;

  return (
    <>
      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl">오시는 길</h1>
          <p className="text-primary-200 mt-2">주소망교회에 오시는 길을 안내합니다.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="font-display font-bold text-xl text-primary-900 mb-4">
              📍 교회 위치
            </h2>
            <p className="text-primary-800 leading-relaxed">
              {address}
            </p>
            <p className="text-sm text-primary-600 mt-2">
              서부운전면허시험장 옆에 위치해 있어 찾아오시기 편리합니다.
            </p>
            <a
              href={naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-5 py-2 bg-primary-900 text-white rounded-md hover:bg-primary-800 transition text-sm"
            >
              네이버 지도에서 보기 →
            </a>
          </div>

          <div>
            <h2 className="font-display font-bold text-xl text-primary-900 mb-4">
              📞 연락처
            </h2>
            <p className="text-primary-800">
              전화:{' '}
              <a href="tel:02-302-1038" className="text-accent-700 hover:underline font-bold">
                02-302-1038
              </a>
            </p>
          </div>
        </div>

        <h2 className="font-display font-bold text-xl text-primary-900 mb-4">
          🚗 대중교통 안내
        </h2>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="bg-primary-50 rounded-lg p-5">
            <h3 className="font-bold text-primary-900 mb-2">🚇 지하철</h3>
            <p className="text-sm text-primary-700">
              6호선 디지털미디어시티역 또는 마포구청역에서 도보 가능
            </p>
          </div>
          <div className="bg-primary-50 rounded-lg p-5">
            <h3 className="font-bold text-primary-900 mb-2">🚌 버스</h3>
            <p className="text-sm text-primary-700">
              상암동/월드컵경기장 인근 정류장 이용 가능
            </p>
          </div>
        </div>

        <div className="bg-primary-900 text-white rounded-lg p-8 text-center">
          <h2 className="font-display font-bold text-xl mb-3">
            주소망교회와 함께하는 영적 여정에 여러분을 초대합니다
          </h2>
          <p className="text-primary-200 text-sm leading-relaxed">
            주소망교회는 언제나 여러분을 기다리고 있습니다.
            <br />
            하나님의 사랑과 은혜가 넘치는 이곳에서 새로운 영적 여정을 시작하세요.
          </p>
        </div>
      </section>
    </>
  );
}
