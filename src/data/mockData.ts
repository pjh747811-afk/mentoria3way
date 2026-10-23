export interface Mentor {
  id: string;
  name: string;
  company: string;
  role: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  avatar: string;
  hourlyRate: string;
  badge?: string;
  description: string;
  availableNext: string;
}

export interface SupportGrant {
  id: string;
  title: string;
  organization: string;
  dDay: number;
  category: string;
  budget: string;
  target: string;
  summary: string;
  deadline: string;
  isBookmarked?: boolean;
}

export interface MentoringSession {
  id: string;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  mentorAvatar: string;
  dateTime: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'pending';
  topic: string;
  meetingLink?: string;
}

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'm1',
    name: '김현직 멘토',
    company: '네카라쿠배 테크',
    role: '시니어 백엔드 아키텍트 & 테크리드',
    experienceYears: 11,
    rating: 4.95,
    reviewCount: 142,
    tags: ['대용량 분산처리', 'Spring Boot', 'Kafka', '이직/커리어코칭'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    hourlyRate: '바우처 지원 (무료)',
    badge: '인기 멘토 1위',
    description: '트래픽 100만 TPS를 처리한 실무 아키텍처 노하우와 서류 통과율 90% 이력서 피드백을 전달합니다.',
    availableNext: '오늘 19:00',
  },
  {
    id: 'm2',
    name: '이민영 멘토',
    company: '시리즈B 핀테크 스타트업',
    role: 'CPO / 프로덕트 총괄',
    experienceYears: 9,
    rating: 4.98,
    reviewCount: 88,
    tags: ['프로덕트 기획', 'PMF 검증', '정부지원사업 합격', '린스타트업'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    hourlyRate: '바우처 지원 (무료)',
    badge: '정부지원 4관왕',
    description: '예비창업패키지, 초기창업패키지 총 1.5억 수혜 경험과 사업계획서 1:1 심층 리뷰를 제공합니다.',
    availableNext: '내일 14:00',
  },
  {
    id: 'm3',
    name: '박준호 멘토',
    company: '글로벌 AI 연구소',
    role: 'Principal AI/ML 엔지니어',
    experienceYears: 8,
    rating: 4.92,
    reviewCount: 64,
    tags: ['LLM 파인튜닝', 'RAG 파이프라인', 'AI 스타트업', 'Python'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    hourlyRate: '바우처 지원 (무료)',
    badge: 'AI 추천 멘토',
    description: '최신 생성형 AI 서비스 개발부터 모델 경량화 및 실무 배포까지 꼼꼼히 짚어드립니다.',
    availableNext: '10월 25일',
  },
  {
    id: 'm4',
    name: '정유진 멘토',
    company: '토스 커뮤니티',
    role: '리드 프로덕트 디자이너',
    experienceYears: 7,
    rating: 4.96,
    reviewCount: 110,
    tags: ['UX/UI 디자인', '디자인 시스템', '포트폴리오 클리닉', '사용자 리서치'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    hourlyRate: '바우처 지원 (무료)',
    badge: '디자인 Top',
    description: '전환율을 300% 높인 모바일 UX 설계 전략 및 실무 포트폴리오 첨삭을 진행합니다.',
    availableNext: '10월 26일',
  },
];

export const MOCK_GRANTS: SupportGrant[] = [
  {
    id: 'g1',
    title: '2024년 청년창업사관학교 가을 학기 추가모집',
    organization: '중소벤처기업진흥공단',
    dDay: 3,
    category: '사업화 자금',
    budget: '최대 1억원',
    target: '만 39세 이하 청년 창업 3년 이내',
    summary: '창업 공간 무상 제공, 사업화 자금(시제품 제작비) 최대 1억원 지원 및 1:1 전담 코칭 프로그램',
    deadline: '2024-10-26 18:00',
    isBookmarked: true,
  },
  {
    id: 'g2',
    title: '2025 초기창업패키지 사전 준비 트랙',
    organization: '창업진흥원',
    dDay: 8,
    category: '기술 실증(PoC)',
    budget: '최대 7,000만원',
    target: '창업 1년~3년차 혁신 스타트업',
    summary: '아이템 고도화 및 판로 개척, 글로벌 스케일업 멘토링 연계 지원',
    deadline: '2024-10-31 17:00',
    isBookmarked: false,
  },
  {
    id: 'g3',
    title: '기술보증기금 청년창업우대보증 및 R&D 바우처',
    organization: '기술보증기금',
    dDay: 14,
    category: '금융/보증',
    budget: '보증비율 100% (최대 3억)',
    target: '기술 기반 혁신 청년 기업',
    summary: '보증료 0.3%p 감면 및 지식재산권(IP) 보유 기업 대상 특별 우대 한도 제공',
    deadline: '2024-11-06 18:00',
    isBookmarked: true,
  },
];

export const MOCK_SESSIONS: MentoringSession[] = [
  {
    id: 's1',
    mentorName: '김현직 멘토',
    mentorRole: '시니어 백엔드 테크리드',
    mentorCompany: '네카라쿠배',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dateTime: '오늘 19:00 ~ 19:50',
    duration: '50분',
    status: 'upcoming',
    topic: '백엔드 아키텍처 및 대용량 트래픽 대비 질문지 리뷰',
    meetingLink: 'https://meet.google.com/abc-mentoria-live',
  },
  {
    id: 's2',
    mentorName: '이민영 멘토',
    mentorRole: 'CPO / 프로덕트 총괄',
    mentorCompany: '핀테크 스타트업',
    mentorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    dateTime: '2024년 10월 28일 (월) 14:00',
    duration: '50분',
    status: 'upcoming',
    topic: '청년창업사관학교 사업계획서 1차 피드백 세션',
    meetingLink: 'https://meet.google.com/xyz-grant-review',
  },
  {
    id: 's3',
    mentorName: '정유진 멘토',
    mentorRole: '리드 프로덕트 디자이너',
    mentorCompany: '토스 커뮤니티',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    dateTime: '2024년 10월 05일 (토) 11:00',
    duration: '50분',
    status: 'completed',
    topic: '모바일 온보딩 전환율 개선 및 디자인 시스템 가이드',
  },
];

export interface SubModuleInfo {
  id: string;
  name: string;
  category: string;
  desc: string;
  badge: string;
  targetRole: 'institution' | 'mentor' | 'mentee';
  targetRoleName: string;
  targetTab: 'dashboard' | 'explore' | 'calendar' | 'grants' | 'mypage';
  actionName: string;
  buttonColor: string;
  highlights: string[];
}

export type PrototypeScreenInfo = SubModuleInfo;

export const SUB_MODULES: SubModuleInfo[] = [
  // 1. 기관/거버넌스 주제의 서브 서비스 모듈 (8종)
  {
    id: 'inst-budget',
    name: '기관 바우처 총괄 예산 집행 센터',
    category: '기관/거버넌스',
    desc: '15억원 공공 멘토링 바우처의 집행률(68.4%) 및 잔여액 실시간 분석',
    badge: '예산 집행',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '예산 총괄 모니터링',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['총 예산 15억원', '집행액 10억 2,600만', '잔여 예산 4억 7,400만'],
  },
  {
    id: 'inst-outcome',
    name: '수혜 스타트업 128개사 성과 추적 센터',
    category: '기관/거버넌스',
    desc: '지원 기업의 생존율(94.2%), 후속 투자 유치 42.8억, 고용 342명 지표',
    badge: '기업 성과',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '수혜 기업 성과 트래커',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['스타트업 생존율 94.2%', '후속 투자 42.8억원', '신규 일자리 342명'],
  },
  {
    id: 'inst-audit',
    name: '실시간 매칭 품질 및 공공 감사 포털',
    category: '기관/거버넌스',
    desc: '총 1,842회 멘토링 세션 만족도(4.94/5.0) 및 부정수급 이상징후 0건',
    badge: '품질 감사',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '매칭 품질 & 감사 대시보드',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['부정수급 이상 징후 0건', '평균 만족도 4.94점', '멘티 피드백 검증'],
  },
  {
    id: 'inst-settle',
    name: '멘토링비 회계 정산 일괄 승인 센터',
    category: '기관/거버넌스',
    desc: '멘토가 제출한 코칭 완료 증빙서 및 출석부 검토 후 원클릭 회계 승인',
    badge: '정산 승인',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '정산 승인 큐 처리',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['2건 대기 정산액 300만원', '원클릭 일괄 승인', '회계 시스템 전송'],
  },
  {
    id: 'inst-grants',
    name: '공공 지원사업 트랙 및 공고 관리 센터',
    category: '기관/거버넌스',
    desc: '청창사, 초기창업패키지, 기보 바우처 트랙별 접수 현황 및 배정',
    badge: '공고 관리',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '지원사업 트랙 관리',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['경쟁률 4.8:1 실시간 집계', '멘토 풀 50인 매핑', '심사위원단 관리'],
  },
  {
    id: 'inst-report',
    name: '공공 감사용 분기별 성과 리포트 센터',
    category: '기관/거버넌스',
    desc: '감사원 및 중기부 제출용 2024년도 공식 멘토링 예산 집행 보고서 출력',
    badge: '감사 리포트',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '공식 감사 리포트 생성',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['공식 PDF 리포트 발행', '분기별 예산 대사', '수혜 기업 증빙 첨부'],
  },
  {
    id: 'inst-ai-monitor',
    name: '이상징후 AI 모니터링 & 출석 검증 시스템',
    category: '기관/거버넌스',
    desc: '화상 세션 실제 진행 시간, 멘티 서명, 질문지 일치 여부 자동 대조',
    badge: 'AI 검증',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: 'AI 부정수급 방지 시스템',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['화상 접속 로그 검증', 'GPS/IP 중복 방지', '부정수급 원천 차단'],
  },
  {
    id: 'inst-quota',
    name: '권역별 테크노파크 거버넌스 연계 센터',
    category: '기관/거버넌스',
    desc: '수도권 및 지역 거점 스타트업을 위한 지역 균형 멘토링 쿼터제 관리',
    badge: '지역 균형',
    targetRole: 'institution',
    targetRoleName: '기관 / 거버넌스',
    targetTab: 'dashboard',
    actionName: '권역별 쿼터제 관리',
    buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    highlights: ['지역 균형 바우처 40%', '지자체 협력 프로그램', '지역 스타트업 매칭'],
  },

  // 2. 전문가/멘토 주제의 서브 서비스 모듈 (6종)
  {
    id: 'mentor-revenue',
    name: '멘토 수익 & 바우처 정산 센터',
    category: '전문가/멘토',
    desc: '이번 달 정산 예정액 4,250,000원, 누적 2,845만원 정산 청구서 발송',
    badge: '수익 정산',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '수익 정산 센터',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['이번 달 정산 425만원', '누적 총액 2,845만원', '정산 청구 원클릭'],
  },
  {
    id: 'mentor-requests',
    name: '신규 멘토링 신청 접수 & 질문지 심사 큐',
    category: '전문가/멘토',
    desc: '김멘티 사전 질문지 및 이력서 검토 후 즉시 수락 또는 일정 조율',
    badge: '신청 심사',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '멘토링 신청 큐 심사',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['사전 질문 2건 검토', '첨부 이력서 열람', '즉시 수락 인터랙션'],
  },
  {
    id: 'mentor-slots',
    name: '예약 가능 슬롯 및 스케줄러 관리기',
    category: '전문가/멘토',
    desc: '바쁜 현직 일정에 맞춰 주간 코칭 가능 시간대 실시간 토글 제어',
    badge: '슬롯 제어',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '예약 슬롯 제어',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['예약 접수 ON/OFF 토글', '주간 시간표 슬롯 설정', '자동 캘린더 동기화'],
  },
  {
    id: 'mentor-report',
    name: '멘티 코칭 피드백 리포트 & 실천 과제 발행기',
    category: '전문가/멘토',
    desc: '세션 후 실천 과제(Action Items)와 아키텍처 피드백을 멘티에게 전송',
    badge: '코칭 리포트',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '코칭 피드백 리포트 작성',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['Action Item 에디터', '정부 바우처 필수 증빙', '멘티에게 즉시 발송'],
  },
  {
    id: 'mentor-room',
    name: '1:1 온라인 LIVE 화상 멘토링 룸 입장 센터',
    category: '전문가/멘토',
    desc: '확정된 세션 시간 10분 전 Google Meet 멘토 전용 룸 즉시 입장',
    badge: '화상 룸',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '멘토 화상 룸 입장',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['세션 10분 전 자동 대기실', '화상 오디오 점검', '화면 공유 지원'],
  },
  {
    id: 'mentor-profile',
    name: '멘토 프로필 및 후기·평점 분석 센터',
    category: '전문가/멘토',
    desc: '평점 4.95점 유지 현황, 대표 커리큘럼 업데이트 및 멘티 후기 분석',
    badge: '평판 관리',
    targetRole: 'mentor',
    targetRoleName: '전문가 / 멘토',
    targetTab: 'dashboard',
    actionName: '멘토 평판 분석',
    buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    highlights: ['Top 1% 슈퍼멘토 뱃지', '수료 멘티 142명 통계', '우수 멘토 보너스 연계'],
  },

  // 3. 멘티/창업자 주제의 서브 서비스 모듈 (11종)
  {
    id: 'mentee-daily',
    name: '데일리 브리핑 & 라이브 매칭 센터',
    category: '멘티/창업자',
    desc: '오늘의 멘토링 세션 사전 알림, 체크리스트, 모닝 브리핑 위젯',
    badge: '모닝 브리핑',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'dashboard',
    actionName: '데일리 리포트 확인',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['당일 19:00 세션 카운트다운', '맞춤형 체크리스트', '라이브 매칭 상태'],
  },
  {
    id: 'mentee-session-detail',
    name: '세션 상세 커리큘럼 & 수강 신청 게이지',
    category: '멘티/창업자',
    desc: '네카라쿠배 백엔드 리드 세션 커리큘럼, 모집 마감 임박 게이지 바',
    badge: '세션 상세',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'explore',
    actionName: '세션 상세 보기',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['모집 인원 잔여 게이지', '온라인 LIVE 화상 안내', '리뷰 별점 4.9'],
  },
  {
    id: 'mentee-search',
    name: '멘토 통합 검색 & 다중 필터 센터',
    category: '멘티/창업자',
    desc: '직무(백엔드, AI, 기획), 경력 년수, 바우처 적용 여부별 원클릭 필터',
    badge: '멘토 검색',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'explore',
    actionName: '멘토 탐색·다중 필터',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['실시간 검색어 자동 완성', '직무별 카테고리 칩', '바우처 지원 멘토 필터'],
  },
  {
    id: 'mentee-grants',
    name: '맞춤 정책자금 / 지원사업 D-Day 트래커',
    category: '멘티/창업자',
    desc: '청년창업사관학교, 초창패 등 마감 임박 지원사업 및 자격 요건 요약',
    badge: '지원사업',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'grants',
    actionName: '지원사업 큐레이션',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['D-3 마감 카운트다운', '청년 우대 가점 해당', '원문 공고 K-Startup 연동'],
  },
  {
    id: 'mentee-mentor-profile',
    name: '멘토 상세 프로필 & 검증 후기 센터',
    category: '멘티/창업자',
    desc: '실무 경력 11년차 아키텍트의 주요 프로젝트 약력과 멘티 생생 후기',
    badge: '멘토 프로필',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'explore',
    actionName: '멘토 프로필 확인',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['검증된 리뷰 142건', '평점 4.95', '전문 분야 태그'],
  },
  {
    id: 'mentee-room',
    name: '온라인 LIVE 화상 미팅 룸 입장 센터',
    category: '멘티/창업자',
    desc: '1:1 Google Meet 화상룸 원클릭 입장 및 실시간 화면 공유 메모',
    badge: '화상 룸',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'calendar',
    actionName: '화상 멘토링 룸 입장',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['Google Meet 링크 연동', '음성/화상 상태 점검', '세션 타이머 50분'],
  },
  {
    id: 'mentee-review',
    name: '세션 피드백 및 별점 코칭 평가 센터',
    category: '멘티/창업자',
    desc: '멘토링 종료 후 5개 세부 항목 평가 및 바우처 자동 정산 반영',
    badge: '세션 평가',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'mypage',
    actionName: '후기 및 평가 작성',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['5점 만점 별점 리뷰', '세부 코칭 만족도 설문', '바우처 사용 완료 처리'],
  },
  {
    id: 'mentee-proposal',
    name: '지원사업 사업계획서 첨삭 클리닉',
    category: '멘티/창업자',
    desc: '청창사 합격 멘토에게 사업계획서 초안 첨삭 및 피드백 신청',
    badge: '서류 첨삭',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'grants',
    actionName: '사업계획서 첨삭 신청',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['합격자 멘토 전담 배정', '문단별 피드백 노트', 'D-Day 내 보완 완성'],
  },
  {
    id: 'mentee-roadmap',
    name: '스타트업 4단계 성장 로드맵 관리기',
    category: '멘티/창업자',
    desc: 'BM 검증부터 MVP 코드리뷰, 청창사 합격, 시드 투자까지 진척도 관리',
    badge: '성장 로드맵',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'dashboard',
    actionName: '성장 로드맵 보기',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['4단계 마일스톤', '현재 2단계 70% 진행', '전담 멘토 코칭 연계'],
  },
  {
    id: 'mentee-wallet',
    name: '멘토링 바우처 포인트 지갑 & 충전 센터',
    category: '멘티/창업자',
    desc: '12,500P 잔액 관리, 사용 내역 확인 및 청년 창업 바우처 추가 수혜 신청',
    badge: '바우처 지갑',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'mypage',
    actionName: '바우처 지갑 & 충전',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['바우처 잔액 12,500P', '0원 본인부담금', '추가 10,000P 충전'],
  },
  {
    id: 'mentee-questionnaire',
    name: '사전 질문지 작성 및 세션 확정 (STEP 2/2)',
    category: '멘티/창업자',
    desc: '신청 목적 선택, 상세 질문 1000자 작성, 이력서 첨부 및 바우처 적용',
    badge: '사전 질문지',
    targetRole: 'mentee',
    targetRoleName: '멘티 / 창업자',
    targetTab: 'dashboard',
    actionName: '사전 질문지(STEP 2/2)',
    buttonColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    highlights: ['목적별 선택 칩', '질문 내용 에디터', '바우처 0원 결제 승인'],
  },
];

export const PROTOTYPE_SCREENS = SUB_MODULES;
