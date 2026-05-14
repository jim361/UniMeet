# tech.md

> UniMeet — 기술 스택 및 구현 계획 문서  
> 문서 버전: v1.0 | 기준: MVP (7~8주차, 2주 구현)

---

## 1. 기술 스택 개요

| 영역 | 선택 기술 | 선택 이유 | 대안 |
|---|---|---|---|
| 프론트엔드 | React Native + Expo | 설정 없이 즉시 시작, iOS·Android 동시 지원, QR 코드로 즉시 테스트 | Flutter |
| 백엔드 | Firebase (서버리스) | 별도 서버 불필요, 인증·DB·푸시 통합 제공, 무료 플랜으로 MVP 충분 | Supabase, Express.js |
| 데이터베이스 | Firebase Firestore | 실시간 동기화, NoSQL 유연성, Firebase와 통합 | PostgreSQL (Supabase) |
| 인증 | Firebase Authentication | 이메일 인증 기능 내장, Firebase와 완전 통합 | Supabase Auth |
| 다국어 번역 | Google Translate API v2 | 안정적, 100개 이상 언어 지원, 저렴한 API 비용 | DeepL API |
| 푸시 알림 | Firebase Cloud Messaging | Firebase 생태계 내 무료 통합, iOS·Android 동시 지원 | OneSignal |
| 파일 저장 | Firebase Storage | Firebase와 통합, 무료 플랜 5GB | AWS S3 |
| 상태 관리 | Zustand | 경량, 설정 간단, React Native와 호환성 좋음 | Redux, Context API |
| 네비게이션 | Expo Router | 파일 기반 라우팅, Expo 공식 지원 | React Navigation |
| 결제 (v1.1) | Toss Payments | 국내 표준, 학생 서비스에 적합, 문서 한국어 지원 | 아임포트(iamport) |
| AI 기능 (v1.2) | OpenAI GPT API | 아이스브레이킹 텍스트 생성, 프롬프트 제어 용이 | Claude API |

---

## 2. 프론트엔드 기술

**React Native + Expo** 조합을 사용한다.

- **Expo SDK:** 카메라, 푸시 알림, 파일 접근 등 네이티브 기능을 별도 설정 없이 사용 가능
- **Expo Router:** `app/` 폴더 기반 파일 라우팅으로 구조 직관적, 팀원 간 화면 분담 용이
- **Expo Go:** 개발 중 QR 코드로 실제 기기에서 즉시 테스트 가능 — 시뮬레이터 설정 불필요
- **NativeWind (선택):** Tailwind CSS 문법으로 React Native 스타일링, 러닝커브 최소화

```json
// 핵심 패키지 목록 (package.json 발췌)
{
  "dependencies": {
    "expo": "~51.0.0",
    "expo-router": "^3.0.0",
    "react-native": "0.74.x",
    "firebase": "^10.x.x",
    "zustand": "^4.x.x",
    "expo-notifications": "~0.28.x",
    "expo-localization": "~15.x.x",
    "@react-native-async-storage/async-storage": "^1.x.x"
  }
}
```

**UI 컴포넌트 방침:** 외부 UI 라이브러리 최소화. 디자인 시스템(design.md)에 정의된 토큰 기반으로 직접 구현하여 UniMeet 브랜드 일관성 유지.

---

## 3. 백엔드 기술

**별도 백엔드 서버를 구축하지 않는다.** Firebase 서버리스 구성으로 2주 MVP 기간 내 운영 가능한 수준을 확보한다.

### Firebase 서비스 구성

| Firebase 서비스 | 용도 | 무료 플랜 한도 |
|---|---|---|
| Authentication | 이메일 인증, 로그인/로그아웃 | 무제한 |
| Firestore | 동아리·지원서·회비·알림 데이터 저장 | 읽기 50,000회/일, 쓰기 20,000회/일 |
| Cloud Messaging (FCM) | 합격 알림·공지 푸시 알림 발송 | 무제한 |
| Storage | 동아리 이미지, 프로필 사진 | 5GB |
| Functions (v1.1 예정) | 자동 번역 캐싱, 미납 알림 트리거 서버 로직 | 125,000회/월 |

> **MVP 기간 중 Firebase Functions 미사용.** 번역·알림 트리거 로직은 클라이언트에서 직접 호출하는 방식으로 구현하고, 트래픽 증가 시 Functions로 이전한다.

### Firestore 보안 규칙 기본 방침

```javascript
// firestore.rules 기본 구조
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 인증된 사용자만 읽기 가능
    match /clubs/{clubId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.auth.uid == resource.data.managerId;
    }

    // 본인 지원서만 읽기/쓰기
    match /applications/{appId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.applicantId;
    }
  }
}
```

---

## 4. 데이터베이스

**Firebase Firestore** (NoSQL, 실시간 도큐먼트 DB)

### 컬렉션 구조

```
/users/{uid}
/clubs/{clubId}
/clubs/{clubId}/fees/{feeId}
/applications/{applicationId}
/notifications/{notificationId}
```

### 선택 이유

- 스키마 없이 유연하게 필드 추가 가능 — MVP 단계에서 잦은 구조 변경에 유리
- 실시간 `onSnapshot()` 리스너로 지원자 목록·회비 현황 자동 갱신
- Firebase Auth UID와 자연스럽게 연동, 별도 사용자 테이블 JOIN 불필요

### 주의사항

- 복잡한 JOIN 쿼리 불가 → 데이터 설계 시 비정규화(denormalization) 적극 활용
- 인덱스 설계 필요: `clubId + status` 복합 쿼리는 Firestore 콘솔에서 인덱스 추가 필요

---

## 5. 인증 / 로그인 방식

**Firebase Authentication — 이메일/비밀번호 방식**

```
1. 사용자가 @sunmoon.ac.kr 이메일 입력
2. 클라이언트에서 도메인 유효성 검사 (정규식)
3. Firebase createUserWithEmailAndPassword() 호출
4. Firebase가 인증 메일 자동 발송 (sendEmailVerification)
5. 사용자가 링크 클릭 → emailVerified: true
6. 앱에서 emailVerified 확인 후 진입 허용
```

```typescript
// 이메일 도메인 검증 예시
const ALLOWED_DOMAIN = '@sunmoon.ac.kr';

const validateEmail = (email: string): boolean => {
  return email.trim().toLowerCase().endsWith(ALLOWED_DOMAIN);
};
```

> **소셜 로그인(Google, Kakao) 미사용.** @sunmoon.ac.kr 도메인 강제가 핵심 신뢰 요소이므로 이메일 인증 단일 방식 유지. v2.0에서 학교 SSO 연동 검토.

---

## 6. 파일 업로드 및 저장 방식

**Firebase Storage** 사용. MVP 범위에서는 동아리 대표 이미지만 업로드 허용.

```
업로드 경로 규칙:
  clubs/{clubId}/cover.jpg        — 동아리 대표 이미지
  users/{uid}/profile.jpg         — 프로필 사진 (Should Have)
```

- 최대 파일 크기: 5MB (클라이언트 측 제한)
- 허용 형식: `.jpg`, `.jpeg`, `.png`
- 업로드 전 `expo-image-picker`로 기기 갤러리에서 선택

> **MVP 단계에서 이미지 업로드는 운영진 동아리 등록 시에만 적용.** 지원서 파일 첨부는 이번 학기 제외.

---

## 7. 외부 API 연동 계획

### Google Translate API v2

- **용도:** 동아리 공고(소개·모집 조건·활동 일정)를 사용자 선호 언어로 자동 번역
- **호출 시점:** 동아리 상세 페이지 진입 시, 해당 언어 번역 캐시가 없을 때만 호출
- **캐시 전략:** 번역 결과를 Firestore `descriptionTranslated` 맵 필드에 저장 → 재호출 방지

```typescript
// 번역 캐시 로직 흐름
async function getTranslatedDescription(club: Club, lang: string): Promise<string> {
  // 1. Firestore 캐시 확인
  if (club.descriptionTranslated?.[lang]) {
    return club.descriptionTranslated[lang];
  }
  // 2. 캐시 없으면 API 호출
  const translated = await callGoogleTranslateAPI(club.description, lang);
  // 3. Firestore에 캐시 저장
  await updateDoc(doc(db, 'clubs', club.clubId), {
    [`descriptionTranslated.${lang}`]: translated,
  });
  return translated;
}
```

- **비용 추정:** 무료 티어 월 500,000자. 동아리 공고 평균 500자 기준 → 약 1,000건 번역 무료. MVP 기간 내 초과 가능성 낮음.

### Firebase Cloud Messaging (FCM)

- **용도:** 합격/불합격 알림, 공지 푸시, 회비 미납 알림
- **구현 방식:** 클라이언트에서 직접 FCM HTTP v1 API 호출 (MVP) → v1.1에서 Cloud Functions로 이전
- **토큰 관리:** 로그인 시 FCM 토큰 발급 후 Firestore `users/{uid}.fcmToken`에 저장

### OpenAI GPT API (v1.2 예정)

- **용도:** AI 아이스브레이킹 — 유학생·내국인 간 첫 대화 주제 추천
- **구현 방식:** 사용자 국적·관심사 기반 프롬프트 구성 후 GPT-4o-mini 호출
- **비용 절감:** gpt-4o-mini 사용 (gpt-4o 대비 약 15배 저렴), 호출 횟수 제한 적용

### Toss Payments (v1.1 예정)

- **용도:** 오픈 이벤트 참가비 인앱 결제
- **구현 방식:** Toss Payments React Native SDK 연동
- **MVP 대체:** 계좌이체 시뮬레이션으로 결제 UX만 선 구현

---

## 8. 배포 환경

| 환경 | 도구 | 용도 |
|---|---|---|
| **개발/시연** | Expo Go | QR 코드로 실제 기기 즉시 테스트, 발표 시연 |
| **테스트 빌드** | EAS Build (Expo) | .apk / .ipa 빌드, 팀원·교수 배포용 |
| **운영 배포** | App Store / Google Play | 정식 출시 (이번 학기 목표 외) |
| **Firebase 콘솔** | Firebase Web Console | Firestore 데이터 확인, 보안 규칙 배포, 사용량 모니터링 |

> **이번 학기 발표는 Expo Go 기준으로 시연.** 별도 빌드 및 스토어 심사 과정 없이 QR 코드로 즉시 구동 가능.

### 환경 변수 관리

```bash
# .env (로컬 개발용 — Git에 커밋하지 않음)
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=...
```

- `EXPO_PUBLIC_` 접두사 변수는 클라이언트에 노출됨 → API 키 권한 최소화 필수
- Firebase API 키는 Firebase 콘솔에서 도메인/앱 제한 설정으로 남용 방지

---

## 9. 개발 도구 및 협업 도구

| 목적 | 도구 | 비고 |
|---|---|---|
| 코드 에디터 | VS Code | Prettier, ESLint 플러그인 필수 |
| 버전 관리 | GitHub | Private 레포, main·dev·feature 브랜치 전략 |
| 패키지 관리 | npm 또는 yarn | 팀 내 통일 필요 |
| 타입 검사 | TypeScript | 전체 프로젝트 TS 기반 |
| 코드 포맷 | Prettier + ESLint | 저장 시 자동 포맷 설정 권장 |
| 기획·문서 | Notion | 회의록, 기획서, KIRO 문서 관리 |
| 디자인 시안 | Figma 또는 Stitch | UI 프로토타입, 디자인 시스템 참조 |
| 커뮤니케이션 | KakaoTalk | 팀 내 빠른 소통 |
| Firebase 관리 | Firebase 웹 콘솔 | DB 확인, 보안 규칙 배포 |

### Git 브랜치 전략

```
main          — 최종 발표용 안정 브랜치
dev           — 통합 개발 브랜치
feature/auth  — 인증 기능
feature/clubs — 동아리 탐색 기능
feature/apply — 지원서 기능
feature/fees  — 회비 관리 기능
```

---

## 10. 기술 선택 이유 요약

| 결정 | 이유 |
|---|---|
| Firebase (서버리스) 선택 | 2주 내 MVP 구현을 위해 백엔드 서버 구축 시간 제거. 인증·DB·푸시를 단일 플랫폼에서 처리 가능 |
| React Native + Expo 선택 | iOS·Android 동시 지원, Expo Go로 즉시 테스트. 팀이 React 경험 보유 |
| Firestore NoSQL 선택 | 초기 스키마 유동성 확보. MVP 단계에서 잦은 구조 변경 대응 용이 |
| Google Translate API 선택 | 핵심 차별화 기능(다국어)의 가장 빠른 구현 수단. 안정적이고 100개 이상 언어 지원 |
| TypeScript 선택 | 3인 협업 시 타입 기반 인터페이스 공유로 오류 조기 발견, 코드 가독성 향상 |
| Zustand 선택 | Redux 대비 설정이 단순, 학습 비용 낮음. 소규모 팀 프로젝트에 적합 |

---

## 11. 기술적 제약사항

| 제약 | 내용 | 대응 방안 |
|---|---|---|
| **Firebase 무료 한도** | Firestore 읽기 50,000회/일 초과 시 과금 | 실시간 구독 최소화, 캐시 활용 |
| **Google Translate 비용** | 월 500,000자 초과 시 $20/백만자 과금 | 번역 결과 Firestore 캐시 저장으로 재호출 방지 |
| **Expo Go 제약** | 일부 네이티브 모듈(특정 결제 SDK 등) Expo Go 미지원 | 결제 기능은 EAS Build 이후 적용 |
| **FCM 클라이언트 직접 호출** | 보안상 서버 측 호출이 권장됨 | MVP에서는 허용, v1.1에서 Cloud Functions로 이전 |
| **Firestore JOIN 불가** | 복잡한 다중 컬렉션 조합 쿼리 불가 | 데이터 비정규화 설계로 단일 컬렉션 조회 최적화 |
| **2주 개발 기간** | 팀원 3인, 전체 기능 구현 불가 | Must Have 기능 5개만 MVP 범위로 확정 |

---

## 12. 추후 확장 시 고려사항

| 시점 | 고려 기술 | 이유 |
|---|---|---|
| **v1.1** | Firebase Cloud Functions | FCM 서버 발송, 번역 캐싱 로직을 서버로 이전해 보안·성능 개선 |
| **v1.1** | Toss Payments SDK | 이벤트 참가비 인앱 결제 도입 |
| **v1.2** | OpenAI GPT-4o-mini API | AI 아이스브레이킹 기능 추가 |
| **v2.0** | Firebase App Check | 봇/비정상 API 호출 방지, 운영 안정성 강화 |
| **다대학 확장** | Firebase Multi-tenancy 또는 별도 프로젝트 분리 | 대학별 데이터 격리 및 라이선스 관리 |
| **트래픽 증가** | Firebase → Supabase (PostgreSQL) 마이그레이션 검토 | 복잡한 쿼리 필요 시 관계형 DB 전환 고려 |
