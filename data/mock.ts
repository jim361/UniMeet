import { Application, ApplicationField, Club, Notification, User } from '@/types';

type ClubSeed = {
  id: string;
  name: string;
  englishName?: string;
  category: string;
  description: string;
  activityPlan?: string;
  imageFile: string;
  members: number;
  isRecruiting?: boolean;
  tags?: string[];
};

const imagePath = (file: string) => `/clubs/${file}`;

const makeEnglishSummary = (name: string, category: string) =>
  `${name} is a real Sunmoon University club in the ${category} category. Students can check the original Korean introduction and apply through UniMeet.`;

const createClub = ({
  id,
  name,
  englishName,
  category,
  description,
  activityPlan,
  imageFile,
  members,
  isRecruiting = true,
  tags = [],
}: ClubSeed): Club => {
  const plan = activityPlan ?? '정기 모임 및 동아리별 활동';
  const tagline = description.split('.')[0] || description;

  return {
    id,
    name,
    englishName: englishName ?? name,
    category,
    description,
    descriptionTranslations: {
      en: makeEnglishSummary(name, category),
    },
    tagline,
    taglineTranslations: {
      en: makeEnglishSummary(name, category),
    },
    tags: [...new Set([category, '실제 동아리', isRecruiting ? '모집 중' : '모집 마감', ...tags])],
    language: 'ko',
    isRecruiting,
    safetyBadgeStatus: 'VERIFIED',
    members,
    imageUrl: imagePath(imageFile),
    meetingInfo: '정기 활동은 동아리 공지 후 진행',
    meetingInfoTranslations: {
      en: 'Regular activities are announced by the club.',
    },
    recruitInfo: plan,
    recruitInfoTranslations: {
      en: 'Recruitment and activity details are based on the club introduction card.',
    },
    recentActivities: plan
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4),
    recentActivityTranslations: {
      en: plan
        .split(',')
        .map((item) => `${item.trim()} activity`)
        .filter(Boolean)
        .slice(0, 4),
    },
  };
};

export const currentUser: User = {
  id: 'user-1',
  email: 'jihoon@sunmoon.ac.kr',
  name: '이지훈',
  studentId: '20241234',
  department: '컴퓨터공학부',
  nationality: 'Korea',
  language: 'ko',
  globalRole: 'MEMBER',
};

export const clubs: Club[] = [
  createClub({
    id: 'jinggeomdari',
    name: '징검다리',
    category: '봉사',
    description:
      '풍선아트를 주제로 아이들에게 즐거운 추억을 만들어주며 봉사활동을 진행하는 봉사 동아리입니다.',
    activityPlan: '풍선아트 봉사, 지역 아동 대상 체험 활동',
    imageFile: 'KakaoTalk_20260526_140113204.png',
    members: 31,
    tags: ['아동 봉사', '풍선아트'],
  }),
  createClub({
    id: 'sunmoon-ymca',
    name: '선문대학YMCA',
    englishName: 'Sunmoon YMCA',
    category: '봉사',
    description:
      '청년들의 문제를 스스로 인식하고 공부하여 해결하며, 환경 정화와 멘토링 프로그램을 통해 지역사회에 도움이 되는 활동을 합니다.',
    activityPlan: '선문대학교 플로깅, 만들기 활동, 지역사회 봉사',
    imageFile: 'KakaoTalk_20260526_140113204_01.png',
    members: 26,
    tags: ['플로깅', '멘토링'],
  }),
  createClub({
    id: 'sunmoon-rcy',
    name: '선문대 RCY',
    englishName: 'Sunmoon RCY',
    category: '봉사',
    description:
      '우리 주위의 이웃을 돕고 서로를 이해하는 봉사 동아리입니다. 요양원, 헌혈 캠페인, 플로깅, 빵 나눔 등 다양한 봉사를 진행합니다.',
    activityPlan: '요양원 봉사, 헌혈 캠페인, 플로깅, 빵 나눔',
    imageFile: 'KakaoTalk_20260526_140113204_02.png',
    members: 34,
    tags: ['헌혈', '나눔'],
  }),
  createClub({
    id: 'sunmoon-rotaract',
    name: '선문ROTARACT',
    englishName: 'Sunmoon Rotaract',
    category: '봉사',
    description:
      '다른 인근 대학교 연합 봉사와 다양한 봉사에 참여하며, 소통과 협업을 통해 의미 있는 대학 생활을 만들어가는 동아리입니다.',
    activityPlan: '헌혈 캠페인, 대동제, 로타랙트 정규봉사',
    imageFile: 'KakaoTalk_20260526_140113204_03.png',
    members: 29,
    tags: ['연합 봉사', '협업'],
  }),
  createClub({
    id: 'sharp-musician',
    name: '샾뮤지션',
    englishName: 'Sharp Musician',
    category: '문화예술',
    description:
      '어쿠스틱 창작가요 봉사 동아리입니다. 악기 배우기, 자작곡 만들기, 공연과 봉사활동을 함께 진행합니다.',
    activityPlan: '공연 및 봉사활동, 악기 연습, 자작곡 제작',
    imageFile: 'KakaoTalk_20260526_140113204_04.png',
    members: 37,
    tags: ['음악', '공연'],
  }),
  createClub({
    id: 'sarakdari',
    name: '사락다리',
    category: '봉사',
    description:
      '학교 근처 아동센터에서 아이들과 다양한 체험활동 프로그램을 진행하며 정서발달 추구와 심리적 안정을 목적으로 하는 봉사 동아리입니다.',
    activityPlan: '정기 봉사, 우주선 만들기, 젠가로 도미노 세우기',
    imageFile: 'KakaoTalk_20260526_140113204_05.png',
    members: 28,
    tags: ['아동센터', '체험활동'],
  }),
  createClub({
    id: 'project-borderless',
    name: 'Project Borderless by sunmoon',
    englishName: 'Project Borderless',
    category: '국제교류',
    description:
      '한국에 유학하고 있는 일본 유학생들을 중심으로 한일평화에 기여하며, 한일해저터널을 알아보고 한국과 일본의 미래를 위해 활동합니다.',
    activityPlan: '세계평화도로재단 행사 참여, 축제 내 한일터널 앙케이트 진행',
    imageFile: 'KakaoTalk_20260526_140113204_06.png',
    members: 24,
    tags: ['한일교류', '유학생'],
  }),
  createClub({
    id: 'asez-smu',
    name: 'ASEZ-SMU',
    englishName: 'ASEZ-SMU',
    category: '봉사',
    description:
      'SAVE THE EARTH FROM A TO Z라는 슬로건으로 환경 오염 속에서 고통 받는 지구를 살리는 행사를 진행합니다.',
    activityPlan: '선문대학교 거리 정화, 환경 세미나, 배방 거리 정화',
    imageFile: 'KakaoTalk_20260526_140113204_07.png',
    members: 33,
    tags: ['환경', '정화활동'],
  }),
  createClub({
    id: 'ivf',
    name: 'IVF',
    englishName: 'Inter-Varsity Christian Fellowship',
    category: '종교',
    description:
      '전국 150여 개 캠퍼스와 세상 속의 하나님 나라 운동이라는 비전을 갖고 있는 복음주의 학생 운동 단체입니다.',
    activityPlan: '성경 공부, 천안 아산 대학 연합, 말씀 묵상',
    imageFile: 'KakaoTalk_20260526_140158131_19.png',
    members: 22,
    tags: ['기독교', '성경공부'],
  }),
  createClub({
    id: 'ice',
    name: 'ICE',
    englishName: 'ICE',
    category: '학술',
    description:
      '소프트웨어를 이용하여 기계장치를 제어하고 자율적으로 동작할 수 있도록 설계하는 동아리입니다. 자율주행 자동차 설계와 제작을 중심으로 활동합니다.',
    activityPlan: '정기모임 스터디, 자율주행 자동차 설계',
    imageFile: 'KakaoTalk_20260526_140158131_20.png',
    members: 19,
    tags: ['소프트웨어', '자율주행'],
  }),
  createClub({
    id: 'global-family',
    name: '글로벌패밀리',
    englishName: 'Global Family',
    category: '국제교류',
    description:
      '선문대 유학생들과 함께 어울리며 국가와 인종을 넘어서 서로의 문화를 배우고 이해하며 평화로운 세상을 기원하는 동아리입니다.',
    activityPlan: '문화교류회, 보드게임, 스포츠 소모임',
    imageFile: 'KakaoTalk_20260526_140158131_18.png',
    members: 58,
    tags: ['유학생', '문화교류'],
  }),
  createClub({
    id: 'sunmoon-ysp',
    name: '선문 YSP',
    englishName: 'Sunmoon YSP',
    category: '국제교류',
    description:
      'UN에서 지정한 SDGS를 실천하여 Peace Designers를 양성하고, 통일과 평화 활동을 통해 글로벌 시민의식을 향상시키는 동아리입니다.',
    activityPlan: '선문클리너스, 통일스터디, POK아무튼 통일',
    imageFile: 'KakaoTalk_20260526_140158131_17.png',
    members: 32,
    tags: ['SDGS', '평화'],
  }),
  createClub({
    id: 'why-wonrihoe',
    name: '와이원리회',
    englishName: 'Why 원리회',
    category: '취미',
    description:
      '신학생들과 함께 대화하고 생각하고 즐기는 자기 계발 동아리입니다. 공강 시간에 모여 대화하고 다양한 활동 프로그램을 진행합니다.',
    activityPlan: '대화 모임, 자기 계발 프로그램',
    imageFile: 'KakaoTalk_20260526_140158131_15.png',
    members: 30,
    tags: ['자기계발', '대화'],
  }),
  createClub({
    id: 'sido',
    name: '시도',
    category: '학술',
    description:
      '금융자산 투자로 자본증식을 목적으로 한 투자 동아리입니다. 다양한 시야를 공유하고 올바른 투자 가치관을 형성합니다.',
    activityPlan: '투자 스터디, 금융시장 분석',
    imageFile: 'KakaoTalk_20260526_140158131_16.png',
    members: 21,
    tags: ['금융', '투자'],
  }),
  createClub({
    id: 'wonri-academy',
    name: '원리아카데미',
    englishName: 'Wonri Academy',
    category: '종교',
    description:
      '원리를 단순히 머리로만 이해하는 것이 아니라 생활 속에서 실천하기 위한 동아리입니다. 원리 스터디, 독서, 토론, 교외 활동, 봉사활동을 진행합니다.',
    activityPlan: '매달 2회 독서 토론, 매달 2회 성탄지 방송',
    imageFile: 'KakaoTalk_20260526_140158131_14.png',
    members: 25,
    tags: ['독서', '토론'],
  }),
  createClub({
    id: 'japanese-student-association',
    name: '일본인유학생회',
    englishName: 'Japanese Student Association',
    category: '국제교류',
    description:
      '일본 유학생들을 통괄하는 동아리입니다. 일본 유학생 교류 이벤트를 운영하고 생활 불편 해결을 돕는 활동을 합니다.',
    activityPlan: '선문대 대동제 포장마차 운영, 일본인 유학생회 졸업식',
    imageFile: 'KakaoTalk_20260526_140158131_13.png',
    members: 36,
    tags: ['일본', '유학생'],
  }),
  createClub({
    id: 'cheongbaji',
    name: '청바지',
    category: '취미',
    description:
      '청춘은 바로 지금이라는 뜻으로, 자신만의 청춘을 의미 있고 함께 만들어 가는 자기 계발 동아리입니다.',
    activityPlan: '자기 계발 모임, 교류 활동',
    imageFile: 'KakaoTalk_20260526_140158131_12.png',
    members: 18,
    tags: ['청춘', '자기계발'],
  }),
  createClub({
    id: 'calotype',
    name: '칼로타입',
    englishName: 'Calotype',
    category: '문화예술',
    description:
      '본인의 예술 세계를 사진으로 표현하는 동아리입니다. 교내외 출사, 사진전, 동아리 MT, 사진전 관람을 진행합니다.',
    activityPlan: '교내외 출사, 교내 사진전 게시, 동아리 MT, 사진전 관람',
    imageFile: 'KakaoTalk_20260526_140158131_11.png',
    members: 27,
    tags: ['사진', '출사'],
  }),
  createClub({
    id: 'pieta',
    name: '피에타',
    englishName: 'Pieta',
    category: '종교',
    description:
      '가톨릭에 관심 있는 학우들이 모여 함께 신앙생활을 즐기는 동아리입니다. 다양한 활동을 기획하여 즐겁게 활동합니다.',
    activityPlan: '개강/종강미사, 피정, 명례방, 대가대협 활동',
    imageFile: 'KakaoTalk_20260526_140158131_09.png',
    members: 17,
    tags: ['가톨릭', '신앙'],
  }),
  createClub({
    id: 'palette',
    name: '팔레트',
    englishName: 'Palette',
    category: '문화예술',
    description:
      '미술 전공자가 아니어도 그림에 관심 있거나 그림 그리기가 취미인 사람들이 함께 창작 모임을 하는 동아리입니다.',
    activityPlan: '크로키 활동, 합작 활동, 야외 활동',
    imageFile: 'KakaoTalk_20260526_140158131_10.png',
    members: 23,
    tags: ['미술', '창작'],
  }),
  createClub({
    id: 'hyojeong-dna',
    name: '효정DNA',
    englishName: 'Hyojeong DNA',
    category: '문화예술',
    description:
      '1996년부터 지금까지 이어져 온 전통 있는 선문대학교 밴드 동아리입니다. 가족 같은 분위기로 즐겁게 활동합니다.',
    activityPlan: '밴드 합주, 공연 준비',
    imageFile: 'KakaoTalk_20260526_140158131_08.png',
    members: 35,
    tags: ['밴드', '공연'],
  }),
  createClub({
    id: 'etc-toeic',
    name: 'etc.',
    englishName: 'etc.',
    category: '학술',
    description:
      '대학생활에 필수로 손꼽히는 토익을 함께 준비하는 동아리입니다. 학습 자세, 공부법, 시험 스킬까지 다양하게 탐구하고 학습합니다.',
    activityPlan: '리딩문제 풀기, 문제 확인, 영단어 테스트, 모의토익',
    imageFile: 'KakaoTalk_20260526_140158131.png',
    members: 20,
    tags: ['토익', '스터디'],
  }),
  createClub({
    id: 'ccc',
    name: 'CCC',
    englishName: 'CCC',
    category: '종교',
    description:
      '전 세계 207개국, 국내 355개 대학에서 활동하는 글로벌 기독 대학생 단체로서 대학생들의 생활과 신앙을 돕는 건강한 동아리입니다.',
    activityPlan: '여름 수련회, IBS, 신앙 강좌, 해외 비전트립, 금식 수련회',
    imageFile: 'KakaoTalk_20260526_140158131_01.png',
    members: 41,
    tags: ['기독교', '리더십'],
  }),
  createClub({
    id: 'cat2flag',
    name: 'cat2flag',
    englishName: 'cat2flag',
    category: '학술',
    description:
      '사이버 보안에 관심 있는 학생들이 모여 함께 활동하는 곳입니다. 해킹과 방어 기술을 배우고 대회와 프로젝트로 실력을 키울 수 있습니다.',
    activityPlan: '회식, 보안 공부, 프로젝트, 대회 준비',
    imageFile: 'KakaoTalk_20260526_140158131_02.png',
    members: 16,
    tags: ['보안', '해킹'],
  }),
  createClub({
    id: 'bogeumjari',
    name: '보금자리',
    category: '취미',
    description:
      '보드게임 활동을 통해 다양한 사람들을 사귀고 스트레스를 풀 수 있는 동아리입니다.',
    activityPlan: '보드게임 모임, 친목 활동',
    imageFile: 'KakaoTalk_20260526_140158131_03.png',
    members: 28,
    tags: ['보드게임', '친목'],
  }),
  createClub({
    id: 'culture-in',
    name: '문화in',
    englishName: 'Culture in',
    category: '문화예술',
    description:
      '학생들의 문화 향상을 위해 놀이문화 콘텐츠를 기획하고 실행하여 신입생과 기존 학우들의 문화생활 증진을 돕는 동아리입니다.',
    activityPlan: '벚꽃 문화교류, 동아리 피크닉, 동아리 회식',
    imageFile: 'KakaoTalk_20260526_140158131_04.png',
    members: 24,
    tags: ['문화기획', '놀이문화'],
  }),
  createClub({
    id: 'cinest',
    name: '시네스트',
    englishName: 'Cinest',
    category: '문화예술',
    description:
      '영상을 좋아하는 학생들이 함께 영상 이론 강의를 진행하고 작품 감상과 분석, 영상 제작을 진행하는 동아리입니다.',
    activityPlan: '공모전, 유튜브 채널 운영, 영상 제작',
    imageFile: 'KakaoTalk_20260526_140158131_05.png',
    members: 19,
    tags: ['영상', '공모전'],
  }),
  createClub({
    id: 'abuji-muhasino',
    name: '아부지 뭐하시노',
    englishName: 'Abuji Muhasino',
    category: '문화예술',
    description:
      '영화, 전시, 아트전, 연극 등 문화활동을 관람한 뒤 주관적인 견해를 공유하고 다양한 시각으로 작품을 리뷰하는 동아리입니다.',
    activityPlan: '영화관람, 소극장 관람, 전시회 구경, 팝업 스토어 체험',
    imageFile: 'KakaoTalk_20260526_140158131_06.png',
    members: 18,
    tags: ['영화', '리뷰'],
  }),
  createClub({
    id: 'magi',
    name: 'MAGI',
    englishName: 'MAGI',
    category: '문화예술',
    description:
      '마술과 타로를 배우고 즐기는 동아리입니다. 창립 20주년을 맞이한 동아리로 학교 행사와 연말 공연 등 다양한 활동을 진행합니다.',
    activityPlan: '학교 행사, 연말 공연, 마술과 타로 연습',
    imageFile: 'KakaoTalk_20260526_140221574.png',
    members: 39,
    tags: ['마술', '타로'],
  }),
];

export const applicationFields: ApplicationField[] = [
  {
    id: 'motivation',
    label: '지원 동기를 알려주세요.',
    type: 'LONG_TEXT',
    required: true,
    order: 1,
  },
  {
    id: 'interest',
    label: '관심 있는 활동을 선택해주세요.',
    type: 'MULTIPLE_CHOICE',
    required: false,
    order: 2,
    options: ['정기 모임', '봉사', '공연/전시', '스터디', '친목'],
  },
  {
    id: 'availability',
    label: '정기 활동 참여 가능 요일은 언제인가요?',
    type: 'SINGLE_CHOICE',
    required: true,
    order: 3,
    options: ['월요일', '화요일', '수요일', '목요일', '금요일'],
  },
];

export const myApplications: Application[] = [
  {
    id: 'app-1',
    clubId: 'global-family',
    applicantName: '이지훈',
    applicantStudentId: '20241234',
    status: 'REVIEWING',
    submittedAt: '2026.05.24',
    formSnapshot: applicationFields,
  },
  {
    id: 'app-2',
    clubId: 'cat2flag',
    applicantName: '이지훈',
    applicantStudentId: '20241234',
    status: 'PENDING',
    submittedAt: '2026.05.23',
    formSnapshot: applicationFields.slice(0, 2),
  },
];

export const leaderApplications: Application[] = [
  {
    id: 'leader-app-1',
    clubId: 'global-family',
    applicantName: '김민수',
    applicantStudentId: '20251111',
    status: 'PENDING',
    submittedAt: '2026.05.25',
    formSnapshot: applicationFields,
  },
  {
    id: 'leader-app-2',
    clubId: 'global-family',
    applicantName: 'Michael Chen',
    applicantStudentId: '20252222',
    status: 'REVIEWING',
    submittedAt: '2026.05.25',
    formSnapshot: applicationFields,
  },
];

export const notifications: Notification[] = [
  {
    id: 'noti-1',
    type: 'APPLICATION_STATUS',
    title: '지원서 상태 변경',
    body: '글로벌패밀리 지원서가 검토 중으로 변경되었습니다.',
    detail:
      '글로벌패밀리 회장이 지원서를 확인하기 시작했습니다. 검토가 완료되면 합격 또는 불합격 알림이 다시 전달됩니다.',
    actionLabel: '지원내역 보기',
    actionHref: '/(tabs)/applications',
    createdAt: '방금 전',
    isRead: false,
  },
  {
    id: 'noti-2',
    type: 'NOTICE',
    title: '실제 동아리 데이터 업데이트',
    body: '탐색 화면에 선문대학교 실제 동아리 소개 카드가 반영되었습니다.',
    detail:
      '총동아리연합회 소개 이미지 기반으로 봉사, 국제교류, 종교, 학술, 문화예술, 취미 카테고리를 구성했습니다.',
    actionLabel: '동아리 탐색하기',
    actionHref: '/(tabs)/explore',
    createdAt: '2시간 전',
    isRead: false,
  },
  {
    id: 'noti-3',
    type: 'NOTICE',
    title: '새 추천 동아리',
    body: '문화교류 동아리 글로벌패밀리를 확인해보세요.',
    detail:
      '글로벌패밀리는 유학생과 함께 문화교류회, 보드게임, 스포츠 소모임을 진행하는 국제교류 동아리입니다.',
    actionLabel: '동아리 상세 보기',
    actionHref: '/club/global-family',
    createdAt: '어제',
    isRead: true,
  },
];
