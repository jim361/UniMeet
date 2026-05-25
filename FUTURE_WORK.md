# UniMeet Future Work

> MVP mock 화면 이후 실제 서비스화를 위해 남겨둘 작업 목록

## 1. Firebase 연동

- Firebase 프로젝트 생성 후 Auth, Firestore, Storage, Functions를 활성화한다.
- `.env` 또는 Expo 환경 변수로 Firebase 설정값을 분리한다.
- 현재 `data/mock.ts`의 데이터를 Firestore 컬렉션으로 이전한다.
- 주요 컬렉션:
  - `users`
  - `clubs`
  - `clubMembers`
  - `promotionCards`
  - `applicationForms`
  - `applications`
  - `notifications`
  - `auditLogs`

## 2. 인증과 권한

- Firebase Auth 이메일/비밀번호 가입을 구현한다.
- `@sunmoon.ac.kr` 이메일 도메인만 허용한다.
- 이메일 인증 완료 전 주요 화면 접근을 막는다.
- 운영자/학교 관리자 가입자는 승인 전 제한 상태로 둔다.
- 회장 권한은 `clubMembers`에서 동아리별 역할로 관리한다.
- 클라이언트 라우팅 가드와 Firestore Security Rules를 함께 적용한다.

## 3. 번역 시스템

- UI 언어와 콘텐츠 번역 언어를 분리한다.
- UI 텍스트는 정적 i18n 파일로 관리한다.
  - `ko.json`
  - `en.json`
- 동아리 소개, 모집 요강, 공지만 Google Cloud Translation Advanced(v3)로 번역한다.
- 앱에서 Google Translate API를 직접 호출하지 않는다.
- 앱은 Firebase Callable Function을 호출한다.
- Callable Function은 Google Translate API를 호출하고 Firestore에 번역 결과를 캐싱한다.
- 번역 캐시 키는 콘텐츠 ID, 원문 해시, 대상 언어를 조합한다.
- 지원서 답변, 개인정보, 채팅은 자동 번역 대상에서 제외한다.
- 번역 실패 시 원문만 표시하고 짧은 안내를 보여준다.

## 4. 지원서 기능 고도화

- 지원서 양식 CRUD를 구현한다.
- 이름과 학번은 시스템 필수 항목으로 유지한다.
- 질문 타입:
  - 단답형
  - 장문형
  - 객관식
  - 체크박스
  - 파일 첨부
- 지원서 제출 시 `formSnapshot`을 저장한다.
- 동일 사용자의 동일 동아리 중복 지원을 차단한다.
- 회장 합격/불합격 처리 시 앱 내부 알림을 생성한다.

## 5. 앱 내부 알림

- Firestore `notifications` 컬렉션 기반으로 구현한다.
- 지원 상태 변경, 승인 상태 변경, 공지 등록을 알림 대상으로 둔다.
- MVP에서는 푸시 알림 없이 앱 내부 알림함만 사용한다.
- Phase 2에서 Expo Notifications 또는 FCM을 검토한다.

## 6. 관리자와 감사 로그

- 운영자는 동아리 생성, 비활성화, 회장 권한 부여를 할 수 있어야 한다.
- 학교 관리자는 운영자 승인, 정지, 복구를 할 수 있어야 한다.
- 관리자성 작업은 `auditLogs`에 기록한다.
- 기록 대상:
  - 운영자 승인
  - 회장 권한 부여
  - 계정 정지/복구
  - 동아리 비활성화
  - 홍보카드 검토 상태 변경

## 7. Phase 2 이후

- 채팅 기능
- 일정잡기
- 푸시 알림
- 신고/차단
- 콘텐츠 검토 워크플로우
- 지원서 파일 첨부 실제 업로드
- 이미지 업로드 및 최적화

## 8. Phase 3 이후

- 행정 서류 제출
- 운영자 서류 검토
- 학교 관리자 통계 대시보드
- 관리자 웹 대시보드
- 성공 지표 이벤트 수집

## 9. 검증 기준

- 학생: 가입, 로그인, 탐색, 상세, 지원서 제출, 지원내역 확인
- 회장: 홍보카드 관리, 양식 설정, 지원자 확인, 합격/불합격 처리
- 운영자: 동아리 생성, 회장 권한 부여
- 권한: 일반 학생이 회장/운영자 화면에 접근할 수 없어야 함
- 번역: 원문과 선택 언어 번역문이 함께 표시되어야 함

