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

// 임시 로컬 메모리 데이터 세트 (실제 앱 구동용 상태 시뮬레이션)
let clubs: Club[] = [
  { id: '1', name: 'UniMeet 코딩방', description: '앱 개발 동아리' }
];

let applications: Application[] = [
  {
    id: 'app_1',
    clubId: '1',
    clubName: 'UniMeet 코딩방',
    userId: 'minsu123',
    userName: '김민수',
    studentId: '20251111',
    applyDate: '2026.05.25',
    status: '대기'
  }
];

let notifications: Notification[] = [];

// 외부 컴포넌트에서 쓸 기능 함수 정의
export const clubStore = {
  getClubs: () => clubs,
  getApplications: () => applications,
  getNotifications: (userId: string) => notifications.filter(n => n.userId === userId),

  // [진짜로 동아리 생성하기]
  createClub: (name: string, description: string) => {
    const newClub: Club = {
      id: String(clubs.length + 1),
      name,
      description
    };
    clubs.push(newClub);
    return newClub;
  },

  // [기능 1] 일반 학생 사용자 계정에서 가입 신청서 제출
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

  // [기능 2] 관리자 계정에서 신청서 합격/불합격 심사 및 지정 문구 알림 생성
  reviewApplication: (id: string, status: '합격' | '불합격') => {
    applications = applications.map(app => {
      if (app.id === id) {
        const updatedApp = { ...app, status };
        
        // 문구 정확히 매핑 설정
        let alertMessage = "";
        if (status === '합격') {
          alertMessage = `축하합니다. [${app.clubName}] 가입 완료되었습니다.`;
        } else {
          alertMessage = `[${app.clubName}]에 지원해주셔서 감사합니다. 아쉽지만 다음 기회에 도전해주세요`;
        }

        // 알림 전송 저장
        notifications.unshift({
          id: `notif_${Date.now()}`,
          userId: app.userId,
          message: alertMessage,
          createdAt: '방금 전'
        });

        return updatedApp;
      }
      return app;
    });
  }
};
