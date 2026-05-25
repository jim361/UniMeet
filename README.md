# UniMeet (유니밋)

> 선문대학교 내·외국인 학생을 위한 동아리 탐색 및 지원 플랫폼

UniMeet은 선문대학교 학생들이 동아리를 쉽게 찾고, 다국어로 동아리 정보를 확인하며, 앱 안에서 지원서를 제출할 수 있도록 돕는 모바일 앱입니다. 동아리 회장과 운영자는 홍보카드, 지원서, 권한 관리 흐름을 한 곳에서 관리할 수 있습니다.

## 현재 상태

이 저장소는 이전 Claude 기반 프로토타입을 새 Expo 기반 MVP 앱으로 재구성한 버전입니다.

현재 구현은 mock 데이터를 사용하는 앱 화면 뼈대이며, 핵심 UX를 먼저 확인하는 단계입니다.

- 학생 하단 탭: 홈, 탐색, 지원내역, 알림, 마이페이지
- 동아리 카드 목록과 필터 기반 탐색
- 대표 사진, 동아리 정보, 모집 요강, 최근 활동이 포함된 동아리 상세 화면
- 지원서 작성 mock 플로우
- 회장 대시보드 mock 플로우
- 관리자 대시보드 mock 플로우
- UI 언어와 콘텐츠 번역 언어를 분리한 언어 설정
- 콘텐츠 번역 사용/미사용 토글
- 원문 + 번역문 동시 표시 구조

## 기술 스택

| 영역 | 기술 |
|---|---|
| 앱 | React Native + Expo |
| 라우팅 | Expo Router |
| 상태 관리 | Zustand |
| UI | React Native StyleSheet + Expo Vector Icons |
| 인증 예정 | Firebase Authentication |
| 데이터베이스 예정 | Cloud Firestore |
| 파일 저장 예정 | Firebase Storage |
| 번역 예정 | Firebase Callable Functions + Google Cloud Translation Advanced |

## 번역 정책

UniMeet은 앱 UI 언어와 동아리 콘텐츠 번역 언어를 분리합니다.

- **앱 UI 언어**: 버튼, 탭, 메뉴, 라벨은 사용자가 선택한 언어로만 표시합니다.
- **콘텐츠 번역**: 동아리 소개, 모집 요강, 공지는 원문과 번역문을 함께 표시할 수 있습니다.
- **번역 토글**: 사용자는 콘텐츠 번역 기능을 켜거나 끌 수 있습니다.
- **MVP mock 언어**: 한국어, 영어, 일본어, 중국어, 베트남어.

실서비스 번역 흐름은 아래 구조를 권장합니다.

```text
App
  -> Firebase Callable Function
  -> Google Cloud Translation Advanced
  -> Firestore 번역 캐시
  -> App에서 캐시된 번역 표시
```

Google Translation API 키는 앱 클라이언트에 직접 노출하지 않고, Firebase Functions에서 호출하는 방식으로 구현합니다.

## 프로젝트 구조

```text
app/
  (tabs)/              학생용 하단 탭 화면
  admin/               관리자 대시보드 mock
  club/[id]/           동아리 상세 및 지원서 작성 화면
  leader/              회장 대시보드 mock
  settings/language    언어 설정 화면
components/            공통 UI 컴포넌트
constants/             디자인 토큰
data/                  mock 데이터
store/                 Zustand 상태 관리
types/                 공통 TypeScript 타입
utils/                 유틸리티 및 i18n 헬퍼
```

## 실행 방법

의존성 설치:

```bash
npm install
```

Expo 웹 개발 서버 실행:

```bash
npm run web
```

Expo 개발 서버 실행:

```bash
npm start
```

TypeScript 검사:

```bash
npm run typecheck
```

웹 번들 export:

```bash
npx expo export --platform web
```

## MVP 범위

MVP 방향에 포함된 기능:

- 학교 이메일 기반 회원가입/로그인
- 언어 선택
- 동아리 탐색
- 동아리 상세 페이지
- 지원서 제출
- 지원 상태 확인
- 회장의 홍보카드 및 지원자 관리
- 운영자의 동아리 생성 및 회장 권한 부여
- 앱 내부 알림

이후 단계로 미룬 기능:

- 실시간 채팅
- 푸시 알림
- 행정 서류 제출 및 검토
- 통계 대시보드
- 신고/차단 워크플로우
- 관리자 웹 대시보드
- 실제 파일 업로드 플로우

## 문서

- `UNIMEET_PRD_v2.md`: 개발용 PRD
- `FUTURE_WORK.md`: Firebase, 번역, 권한, 이후 Phase 작업 목록

## 참고

현재 앱은 mock 데이터 기반입니다. Firebase Auth, Firestore, Storage, Security Rules, Google Translation API 연동은 이후 작업으로 남겨두었습니다.
