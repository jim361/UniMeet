import { Application, ApplicationField, Club, Notification, User } from '@/types';

export const currentUser: User = {
  id: 'user-1',
  email: 'jihoon@sunmoon.ac.kr',
  name: '이지훈',
  studentId: '20241234',
  department: 'Computer Science Dept.',
  nationality: 'Korea',
  language: 'ko',
  globalRole: 'MEMBER',
};

export const clubs: Club[] = [
  {
    id: 'global-citizens',
    name: '글로벌 시민',
    englishName: 'Global Citizens',
    category: '문화',
    description:
      '다양한 국적의 학생들이 모여 언어 교환과 문화를 공유하는 동아리입니다. 누구나 환영합니다.',
    descriptionTranslations: {
      en: 'Global Citizens is a club where students from many nationalities share language and culture. Everyone is welcome.',
      ja: 'さまざまな国籍の学生が集まり、言語交換と文化交流を行うサークルです。誰でも歓迎します。',
      zh: '这是一个由不同国籍学生一起进行语言交换和文化交流的社团。欢迎所有人参加。',
      vi: 'Đây là câu lạc bộ nơi sinh viên từ nhiều quốc gia cùng trao đổi ngôn ngữ và văn hóa. Tất cả mọi người đều được chào đón.',
    },
    tagline: '언어와 문화를 함께 나누는 캠퍼스 교류 동아리',
    taglineTranslations: {
      en: 'A campus exchange club for sharing languages and cultures',
      ja: '言語と文化を一緒に分かち合うキャンパス交流サークル',
      zh: '一起分享语言和文化的校园交流社团',
      vi: 'Câu lạc bộ giao lưu trong khuôn viên để chia sẻ ngôn ngữ và văn hóa',
    },
    tags: ['English/Korean', '유학생 환영', '모집 중'],
    language: 'both',
    isRecruiting: true,
    safetyBadgeStatus: 'VERIFIED',
    members: 42,
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    meetingInfo: '매주 수요일 18:30, 학생회관 302호',
    meetingInfoTranslations: {
      en: 'Every Wednesday at 18:30, Student Center Room 302',
      ja: '毎週水曜日 18:30、学生会館302号室',
      zh: '每周三 18:30，学生会馆302室',
      vi: 'Thứ Tư hàng tuần lúc 18:30, Phòng 302 Trung tâm Sinh viên',
    },
    recruitInfo:
      '언어 교환, 문화 교류, 캠퍼스 투어 활동에 관심 있는 학생을 모집합니다. 한국어가 서툴러도 참여할 수 있습니다.',
    recruitInfoTranslations: {
      en: 'We are recruiting students interested in language exchange, cultural exchange, and campus tour activities. You can join even if your Korean is not fluent.',
      ja: '言語交換、文化交流、キャンパスツアー活動に関心のある学生を募集します。韓国語が得意でなくても参加できます。',
      zh: '招募对语言交换、文化交流和校园参观活动感兴趣的学生。即使韩语不流利也可以参加。',
      vi: 'Chúng tôi tuyển sinh viên quan tâm đến trao đổi ngôn ngữ, giao lưu văn hóa và tour tham quan khuôn viên. Bạn vẫn có thể tham gia dù tiếng Hàn chưa thành thạo.',
    },
    recentActivities: [
      '봄학기 웰컴 파티와 언어 교환 테이블 운영',
      '신입 유학생 캠퍼스 투어 진행',
      '한국어/영어 스터디 페어 참여',
    ],
    recentActivityTranslations: {
      en: [
        'Hosted a spring semester welcome party and language exchange tables',
        'Ran a campus tour for new international students',
        'Joined the Korean/English study fair',
      ],
    },
  },
  {
    id: 'debate-society',
    name: '토론 학회',
    englishName: 'Debate Society',
    category: '학술',
    description:
      '논리적 사고와 설득력 있는 말하기를 연습합니다. 매주 새로운 주제로 열린 토론을 진행합니다.',
    descriptionTranslations: {
      en: 'We practice logical thinking and persuasive speaking through open debates on new topics every week.',
    },
    tagline: '생각을 말로 정리하는 학술 커뮤니티',
    taglineTranslations: {
      en: 'An academic community for turning ideas into clear speech',
    },
    tags: ['Korean', '발표', '모집 중'],
    language: 'ko',
    isRecruiting: true,
    safetyBadgeStatus: 'PENDING_REVIEW',
    members: 28,
    imageUrl:
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    meetingInfo: '매주 목요일 19:00, 인문관 세미나실',
    meetingInfoTranslations: {
      en: 'Every Thursday at 19:00, Humanities Building seminar room',
    },
    recruitInfo:
      '발표와 토론을 연습하고 싶은 학생을 모집합니다. 초보자는 기초 스피치 세션부터 함께합니다.',
    recruitInfoTranslations: {
      en: 'We welcome students who want to practice presentations and debates. Beginners can start with basic speech sessions.',
    },
    recentActivities: [
      'AI 윤리 공개 토론회 진행',
      '신입생 발표 워크숍 개최',
      '교내 프레젠테이션 대회 참가',
    ],
    recentActivityTranslations: {
      en: [
        'Hosted an open debate on AI ethics',
        'Held a presentation workshop for first-year students',
        'Joined an on-campus presentation contest',
      ],
    },
  },
  {
    id: 'campus-basketball',
    name: '캠퍼스 농구팀',
    englishName: 'Campus Basketball Team',
    category: '체육',
    description:
      '땀 흘리며 스트레스를 날려버릴 신입 회원을 모집합니다. 초보자도 쉽게 배울 수 있습니다.',
    descriptionTranslations: {
      en: 'We welcome new members who want to sweat, play, and relieve stress. Beginners can learn easily.',
    },
    tagline: '함께 뛰는 팀 스포츠 동아리',
    taglineTranslations: {
      en: 'A team sports club where we run together',
    },
    tags: ['All', '모집 마감'],
    language: 'both',
    isRecruiting: false,
    safetyBadgeStatus: 'NONE',
    members: 36,
    imageUrl:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    meetingInfo: '매주 화요일 20:00, 체육관',
    meetingInfoTranslations: {
      en: 'Every Tuesday at 20:00, Gymnasium',
    },
    recruitInfo:
      '현재 정규 모집은 마감되었습니다. 다음 모집 기간에 초보자반과 정규반을 함께 모집할 예정입니다.',
    recruitInfoTranslations: {
      en: 'Regular recruitment is currently closed. Beginner and regular groups will open together in the next recruitment period.',
    },
    recentActivities: [
      '봄학기 교내 리그 준우승',
      '초보자 슈팅 클리닉 운영',
      '타 대학 친선 경기 참여',
    ],
    recentActivityTranslations: {
      en: [
        'Runner-up in the spring campus league',
        'Hosted a beginner shooting clinic',
        'Played friendly matches with other universities',
      ],
    },
  },
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
    id: 'language',
    label: '가능한 언어를 선택해주세요.',
    type: 'MULTIPLE_CHOICE',
    required: false,
    order: 2,
    options: ['Korean', 'English', 'Chinese', 'Japanese', 'Other'],
  },
  {
    id: 'availability',
    label: '정기 모임 가능 요일은 언제인가요?',
    type: 'SINGLE_CHOICE',
    required: true,
    order: 3,
    options: ['월요일', '화요일', '수요일', '목요일', '금요일'],
  },
];

export const myApplications: Application[] = [
  {
    id: 'app-1',
    clubId: 'global-citizens',
    applicantName: '이지훈',
    applicantStudentId: '20241234',
    status: 'REVIEWING',
    submittedAt: '2026.05.24',
    formSnapshot: applicationFields,
  },
  {
    id: 'app-2',
    clubId: 'debate-society',
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
    clubId: 'global-citizens',
    applicantName: '김민수',
    applicantStudentId: '20251111',
    status: 'PENDING',
    submittedAt: '2026.05.25',
    formSnapshot: applicationFields,
  },
  {
    id: 'leader-app-2',
    clubId: 'global-citizens',
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
    body: '글로벌 시민 지원서가 검토 중으로 변경되었습니다.',
    detail:
      '글로벌 시민 회장이 지원서를 확인하기 시작했습니다. 검토가 완료되면 합격 또는 불합격 알림이 다시 전달됩니다.',
    actionLabel: '지원내역 보기',
    actionHref: '/(tabs)/applications',
    createdAt: '방금 전',
    isRead: false,
  },
  {
    id: 'noti-2',
    type: 'ADMIN_APPROVAL',
    title: '권한 승인 안내',
    body: '운영자 승인 요청이 접수되었습니다.',
    detail:
      '운영자 권한 신청이 접수되었습니다. 학교 관리자 또는 기존 운영자가 승인하면 관리자 대시보드 접근 권한이 활성화됩니다.',
    actionLabel: '마이페이지 보기',
    actionHref: '/(tabs)/profile',
    createdAt: '2시간 전',
    isRead: false,
  },
  {
    id: 'noti-3',
    type: 'NOTICE',
    title: '새 공지사항',
    body: '2026년 1학기 글로벌 멘토링 프로그램 안내',
    detail:
      '글로벌 멘토링 프로그램은 내국인 학생과 유학생이 함께 교류하는 활동입니다. 자세한 모집 내용은 동아리 상세 페이지에서 확인할 수 있습니다.',
    actionLabel: '동아리 상세 보기',
    actionHref: '/club/global-citizens',
    createdAt: '어제',
    isRead: true,
  },
];
