// 일반 학생이 '가입 신청' 누를 때 호출할 메서드 예시
import { clubStore } from '../store/clubStore';

const handleApply = () => {
  clubStore.submitApplication(
    '1',                // clubId
    'UniMeet 코딩방',     // clubName
    'minsu123',         // 학생 고유 유저 ID
    '김민수',            // 이름
    '20251111'          // 학번
  );
  alert('가입 신청서가 제출되었습니다. 지원자 관리 화면에서 확인해보세요!');
};
