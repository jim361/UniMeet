// store/clubStore.ts

export interface Club {
  id: string;
  name: string;
  description: string;
}

export interface Application {
  id: string;
  clubId: string;
  clubName: string;
  userId: string;
  userName: string;
  studentId: string;
  applyDate: string;
  status: '대기' | '합격' | '불합격';
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  createdAt: string;
}

// 초기 앱 구동을 위한 더미 데이터들
let clubs: Club[] = [
  { id: '1', name: 'UniMeet 코딩방', description: '앱 개발 동아리' }
];

let applications: Application[] = [
  {
    id: 'app_minsu',
    clubId: '1',
    clubName: 'UniMeet 코딩방',
    userId: 'student_minsu',
    userName: '김민수',
    studentId: '20251111',
    applyDate: '2026.05.25',
    status: '대기'
  }
];

let notifications: Notification[] = [];

export const clubStore = {
  getClubs: () => clubs,
  getApplications: () => applications,
  getNotifications: (userId: string) => notifications.filter(n => n.userId === userId),

  // [진짜로 동아리 생성] 버튼 누를 때 호출될 함수
  createClub: (name: string, description: string) => {
    const newClub: Club = {
      id: String(clubs.length + 1),
      name,
      description
    };
    clubs.push(newClub);
    return clubs;
  },

  // 1. 일반 학생 가입 신청서 제출 함수
  submitApplication: (clubId: string, clubName: string, userId: string, userName: string, studentId: string) => {
    const today = new Date();
    const applyDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    
    const newApp: Application = {
      id: `app_${Date.now()}`,
      clubId,
      clubName,
      userId,
      userName,
      studentId,
      applyDate,
      status: '대기'
    };
    applications.push(newApp);
    return newApp;
  },

  // 2. 관리자 계정에서 합격/불합격 선택 및 지정 알림 발송 함수
  reviewApplication: (id: string, status: '합격' | '불합격') => {
    applications = applications.map(app => {
      if (app.id === id) {
        // 합격/불합격 상태 업데이트
        const updatedApp = { ...app, status };
        
        // 요청하신 고정 알림 메시지 분기 처리
        let targetMessage = "";
        if (status === '합격') {
          targetMessage = `축하합니다. [${app.clubName}] 가입 완료되었습니다.`;
        } else {
          targetMessage = `[${app.clubName}]에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요`;
        }

        // 알림 생성 및 최상단 삽입
        notifications.unshift({
          id: `notif_${Date.now()}`,
          userId: app.userId,
          message: targetMessage,
          createdAt: '방금 전'
        });

        return updatedApp;
      }
      return app;
    });
  }
};
