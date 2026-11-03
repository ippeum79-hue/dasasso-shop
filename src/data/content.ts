export interface ServiceItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  priceTag?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface ReviewItem {
  name: string;
  role: string;
  category: string;
  rating: number;
  content: string;
  result: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  name: "황금 돌고래 사주",
  slogan: "운명을 읽고, 성공을 설계합니다",
  contact: {
    kakaoChannel: "https://pf.kakao.com", // 카카오톡 채널 링크
    phone: "010-0000-0000",
    operatingHours: "매일 10:00 ~ 22:00 (100% 사전 예약제)",
  },
  stats: [
    { label: "누적 상담 및 프로젝트", value: "1,200건+" },
    { label: "고객 만족도", value: "98.7%" },
    { label: "비즈니스 문의 전환율 상승", value: "평균 240%" },
    { label: "재방문 및 추천율", value: "89%" },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "saju",
    badge: "1:1 심층 상담",
    title: "황금 돌고래 프리미엄 사주",
    subtitle: "대운과 세운의 흐름을 짚어 최적의 타이밍과 재물운을 밝혀냅니다.",
    features: [
      "선천적 기운 및 오행(五行) 에너지 밸런스 정밀 분석",
      "평생 대운의 흐름과 올해의 세운·월운 상세 진단",
      "사업운, 재물운, 직업/이직, 인간관계 및 귀인운 풀이",
      "상담 녹음 파일 및 맞춤 운명 요약 리포트 제공"
    ],
    ctaText: "사주 상담 예약하기"
  },
  {
    id: "website",
    badge: "고전환 웹 구축",
    title: "전환율 200% 맞춤형 홈페이지",
    subtitle: "고객의 시선을 사로잡고 바로 결제·문의로 연결되는 반응형 웹사이트.",
    features: [
      "심리학 기반 설득 카피라이팅 & UX 동선 완벽 기획",
      "초고속 로딩 Next.js & 모바일 100% 반응형 최적화",
      "네이버·구글 상위 노출을 위한 테크니컬 SEO 세팅",
      "카카오톡 상담 연동 & 간편 문의 폼 무상 구축"
    ],
    ctaText: "홈페이지 제작 문의하기"
  },
  {
    id: "blog",
    badge: "트래픽 파이프라인",
    title: "블로그 디자인 & 타깃 포스팅",
    subtitle: "매일 잠재 고객이 알아서 찾아오는 마르지 않는 유입 창구를 만듭니다.",
    features: [
      "신뢰감을 극대화하는 프리미엄 홈페이지형 블로그 스킨",
      "타깃 고객 구매 전환을 유도하는 킬러 키워드 발굴",
      "전문성과 스토리를 담은 고품질 포스팅 대행",
      "위젯, 모바일 커버, 카카오톡 실시간 상담 배너 세팅"
    ],
    ctaText: "블로그 패키지 문의"
  },
  {
    id: "all-in-one",
    badge: "★ 대표 추천 패키지",
    title: "올인원 성공 비즈니스 패키지",
    subtitle: "사주 운명 진단부터 홈페이지 제작, 블로그 마케팅까지 원스톱 완성.",
    isPopular: true,
    priceTag: "월 3팀 한정",
    features: [
      "[사주 컨설팅] 대표자 사주 기반 비즈니스 시기 & 오행 컬러 가이드",
      "[웹사이트] 고전환 랜딩페이지 풀세팅 (Next.js)",
      "[블로그] 홈페이지형 디자인 + 초기 핵심 전략 포스팅 10건",
      "1:1 비즈니스 브랜딩 밀착 코칭 및 런칭 후 30일 무상 케어"
    ],
    ctaText: "올인원 패키지 신청하기"
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    name: "김*진 대표",
    role: "심리상담센터 운영",
    category: "올인원 패키지",
    rating: 5,
    content: "사주로 제 성향과 맞는 고객층을 명확히 짚어주시고, 그에 맞춰 홈페이지와 블로그를 만들어 주셨습니다. 런칭 2주 만에 다음 달 상담 예약이 모두 마감되었습니다.",
    result: "월 매출 320% 증가"
  },
  {
    name: "이*호 님",
    role: "예비 외식업 창업자",
    category: "사업운 심층 사주",
    rating: 5,
    content: "무리해서 매장을 확장하려다 원장님 조언으로 시기를 6개월 늦추고 온라인 채널을 먼저 팠는데, 그게 신의 한 수였습니다. 불필요한 손실 수천만 원을 아꼈습니다.",
    result: "오픈 첫 주 전석 만석"
  },
  {
    name: "박*아 원장",
    role: "타로 및 힐링 아카데미",
    category: "홈페이지 & 블로그 제작",
    rating: 5,
    content: "기존 홈페이지는 1년에 문의 한 통 없었는데, 황금 돌고래에서 리뉴얼 후 카피라이팅이 완전히 달라졌습니다. 읽는 사람마다 '여기서 꼭 상담받고 싶다'고 말합니다.",
    result: "문의 전환율 4.8배 상승"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "사주 상담만 받거나, 홈페이지 제작만 단독으로 의뢰할 수도 있나요?",
    answer: "네, 물론입니다! 1:1 심층 사주 상담, 홈페이지 제작, 블로그 디자인/포스팅 서비스는 각각 단독으로도 최고 수준의 퀄리티로 제공됩니다. 다만 사업을 시작하거나 리브랜딩 중이시라면 두 영역을 결합한 올인원 패키지가 시너지와 비용 측면에서 가장 유리합니다."
  },
  {
    question: "사주 상담은 대면으로만 진행되나요?",
    answer: "전국 및 해외 어디서든 편하게 받아보실 수 있도록 전화 상담, Zoom 화상 상담, 카카오톡 상담을 모두 지원합니다. 대면과 동일한 깊이의 명식 풀이와 질의응답이 이루어지며, 상담 후 핵심 요약 리포트를 전달해 드립니다."
  },
  {
    question: "홈페이지나 블로그 제작 기간은 얼마나 소요되나요?",
    answer: "기본형 랜딩페이지 및 블로그 세팅은 자료 전달 후 영업일 기준 7~10일, 올인원 패키지는 심층 기획과 브랜딩을 포함하여 약 2~3주 정도 소요됩니다. 꼼꼼한 마감과 전환율을 위해 매월 작업 건수를 제한하여 진행합니다."
  },
  {
    question: "홈페이지를 한 번도 관리해본 적이 없는데 운영이 어렵지 않을까요?",
    answer: "전혀 걱정하지 않으셔도 됩니다. 텍스트나 사진을 직접 쉽게 수정하실 수 있도록 직관적인 관리 가이드를 영상 및 매뉴얼로 제공하며, 오픈 후 30일간 오류 수정 및 운영 질문에 대한 무상 지원을 보장합니다."
  }
];
