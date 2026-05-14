# structure.md

> UniMeet — 서비스 전체 구조 문서  
> 문서 버전: v1.0 | 기술 스택: React Native / Expo + Firebase

---

## 1. 전체 서비스 구조 개요

```
[사용자 (유학생 / 내국인 / 운영진)]
        ↓
[React Native App (Expo)]
        ↓
[Firebase Auth]  [Firebase Firestore]  [Firebase Cloud Messaging]
        ↓
[Google Translate API]        [Toss Payments (v1.1 예정)]
```

- **클라이언트:** React Native + Expo (iOS / Android 동시 지원)
- **인증:** Firebase Authentication (이메일 인증 기반)
- **데이터베이스:** Firebase Firestore (실시간 NoSQL)
- **푸시 알림:** Firebase Cloud Messaging (FCM)
- **번역:** Google Translate API (동아리 공고 다국어 자동 번역)
- **별도 백엔드 서버 없음** — Firebase로 서버리스 구성, MVP 기간 내 운영 가능

---

## 2. 사용자 유형 정의

| 유형 | 설명 | 인증 방식 |
|---|---|---|
| **Guest** | 앱 설치 후 미로그인 상태 | 없음 |
| **Student (유학생 / 내국인)** | @sunmoon.ac.kr 이메일 인증 완료 재학생 | Firebase Email Auth |
| **Club Manager (운영진)** | 동아리 운영진 권한 보유 학생 | Firebase Email Auth + 운영진 플래그 |
| **Admin (총동아리회)** | 전체 동아리 관리 권한 (v2.0 예정) | 별도 관리자 계정 (현재 미구현) |

---

## 3. 권한 구조

| 기능 | Guest | Student | Club Manager | Admin |
|---|---|---|---|---|
| 동아리 목록 열람 | ✅ | ✅ | ✅ | ✅ |
| 동아리 상세 페이지 열람 | ✅ | ✅ | ✅ | ✅ |
| 가입 신청서 제출 | ❌ | ✅ | ✅ | ✅ |
| 지원자 목록 확인 | ❌ | ❌ | ✅ | ✅ |
| 합격 처리 / 알림 발송 | ❌ | ❌ | ✅ | ✅ |
| 회비 내역 관리 | ❌ | ❌ | ✅ | ✅ |
| 동아리 정보 수정 | ❌ | ❌ | ✅ | ✅ |
| 전체 동아리 관리 | ❌ | ❌ | ❌ | ✅ |

> **현재 MVP 범위:** Guest / Student / Club Manager 3개 유형만 구현. Admin은 v2.0에서 추가.

---

## 4. 화면 목록

### 인증 플로우

| 화면 ID | 화면명 | 설명 |
|---|---|---|
| AUTH-01 | 온보딩 화면 | 서비스 소개, 로그인 / 회원가입 진입 |
| AUTH-02 | 회원가입 화면 | @sunmoon.ac.kr 이메일 입력, 비밀번호 설정 |
| AUTH-03 | 이메일 인증 안내 화면 | 인증 메일 발송 후 확인 대기 안내 |
| AUTH-04 | 로그인 화면 | 이메일 + 비밀번호 로그인 |
| AUTH-05 | 언어 설정 화면 | 선호 언어 선택 (최초 1회) |

### 학생 (Student) 화면

| 화면 ID | 화면명 | 설명 |
|---|---|---|
| STU-01 | 홈 화면 | 추천 동아리, 최근 공지, 이벤트 피드 |
| STU-02 | 동아리 탐색 화면 | 분야 / 언어 / 유학생 환영 여부 필터, 목록 |
| STU-03 | 동아리 상세 페이지 | 소개, 모집 조건, 활동 일정 (다국어 번역) |
| STU-04 | 가입 신청서 화면 | 지원 항목 입력 및 제출 |
| STU-05 | 신청 내역 화면 | 지원한 동아리 목록 및 합격 / 대기 / 불합격 상태 |
| STU-06 | 알림 화면 | 합격 알림, 공지 알림 수신 목록 |
| STU-07 | 프로필 화면 | 내 정보, 언어 설정, 로그아웃 |

### 운영진 (Club Manager) 화면

| 화면 ID | 화면명 | 설명 |
|---|---|---|
| MGR-01 | 운영진 대시보드 | 지원자 현황, 회비 납부 현황 요약 |
| MGR-02 | 지원자 목록 화면 | 신청자 리스트, 합격 / 불합격 처리 |
| MGR-03 | 회비 내역 관리 화면 | 입출금 기록, 미납자 목록, 자동 알림 발송 |
| MGR-04 | 공지 작성 화면 | 공지 작성 후 전체 부원 다국어 푸시 알림 |
| MGR-05 | 동아리 정보 수정 화면 | 소개 / 모집 조건 / 활동 일정 수정 |

---

## 5. 사용자 흐름 (Student)

```
앱 실행
  └─ 1. 온보딩 화면 (AUTH-01)
       └─ 회원가입 선택
            └─ 2. 이메일 입력 (AUTH-02) — @sunmoon.ac.kr 필수
                 └─ 3. 이메일 인증 대기 (AUTH-03)
                      └─ 인증 완료
                           └─ 4. 언어 설정 (AUTH-05)
                                └─ 5. 홈 화면 (STU-01)
                                     ├─ 동아리 탐색 (STU-02)
                                     │    └─ 필터 적용 → 목록 조회
                                     │         └─ 6. 동아리 상세 (STU-03)
                                     │              └─ 7. 가입 신청서 작성 & 제출 (STU-04)
                                     │                   └─ 8. 신청 내역 확인 (STU-05)
                                     │                        └─ 합격 알림 수신 (STU-06)
                                     └─ 알림 확인 (STU-06)
```

---

## 6. 운영진 흐름 (Club Manager)

```
로그인 (AUTH-04)
  └─ 운영진 권한 확인
       └─ 1. 운영진 대시보드 (MGR-01)
            ├─ 2. 지원자 목록 확인 (MGR-02)
            │    └─ 합격 / 불합격 처리 → FCM 알림 자동 발송
            ├─ 3. 회비 내역 관리 (MGR-03)
            │    └─ 미납자 자동 알림 발송
            ├─ 4. 공지 작성 (MGR-04)
            │    └─ 전체 부원 다국어 푸시 알림 전송
            └─ 5. 동아리 정보 수정 (MGR-05)
```

---

## 7. 주요 데이터 엔티티

### User (사용자)

| 필드명 | 타입 | 설명 |
|---|---|---|
| `uid` | string | Firebase Auth UID (PK) |
| `email` | string | @sunmoon.ac.kr 이메일 |
| `displayName` | string | 이름 |
| `nationality` | string | 국적 (ISO 코드) |
| `preferredLanguage` | string | 선호 언어 코드 |
| `role` | enum | `student` / `manager` |
| `createdAt` | timestamp | 가입일 |

### Club (동아리)

| 필드명 | 타입 | 설명 |
|---|---|---|
| `clubId` | string | 자동 생성 ID (PK) |
| `name` | string | 동아리명 |
| `category` | string | 분야 (문화 / 스포츠 / 학술 등) |
| `description` | string | 소개 (원본 한국어) |
| `descriptionTranslated` | map | 번역 캐시 `{ en: "...", fa: "...", ... }` |
| `isInternationalFriendly` | boolean | 유학생 환영 여부 |
| `managerId` | string | 운영진 uid |
| `recruitmentOpen` | boolean | 모집 중 여부 |
| `createdAt` | timestamp | 등록일 |

### Application (지원서)

| 필드명 | 타입 | 설명 |
|---|---|---|
| `applicationId` | string | 자동 생성 ID (PK) |
| `clubId` | string | 지원 동아리 ID (FK) |
| `applicantId` | string | 지원자 uid (FK) |
| `answers` | map | 지원 항목 답변 |
| `status` | enum | `pending` / `accepted` / `rejected` |
| `submittedAt` | timestamp | 제출일 |
| `processedAt` | timestamp | 합격 처리일 |

### Fee (회비 내역)

| 필드명 | 타입 | 설명 |
|---|---|---|
| `feeId` | string | 자동 생성 ID (PK) |
| `clubId` | string | 소속 동아리 ID (FK) |
| `memberId` | string | 대상 부원 uid (FK) |
| `amount` | number | 금액 (원) |
| `type` | enum | `income` / `expense` |
| `isPaid` | boolean | 납부 여부 |
| `dueDate` | timestamp | 납부 기한 |
| `createdAt` | timestamp | 등록일 |

### Notification (알림)

| 필드명 | 타입 | 설명 |
|---|---|---|
| `notificationId` | string | 자동 생성 ID (PK) |
| `recipientId` | string | 수신자 uid (FK) |
| `type` | enum | `accepted` / `rejected` / `notice` / `fee` |
| `message` | string | 알림 내용 |
| `isRead` | boolean | 읽음 여부 |
| `createdAt` | timestamp | 발송 시각 |

---

## 8. 엔티티 간 관계 요약

```
User ─────────────── Application ─────────── Club
 │  (1:N 지원)            (N:1)              │
 │                                           │
 └── Fee (1:N 회비)                          └── User (운영진, 1:1)
 │
 └── Notification (1:N 알림 수신)
```

- **User : Application = 1 : N** — 한 학생이 여러 동아리에 지원 가능
- **Club : Application = 1 : N** — 한 동아리에 여러 지원서 존재
- **Club : Fee = 1 : N** — 한 동아리에 여러 회비 내역 존재
- **User : Notification = 1 : N** — 한 사용자가 여러 알림 수신

---

## 9. 프로젝트 폴더 구조

```
unimeet/
├── app/                        # Expo Router 기반 화면 구성
│   ├── (auth)/                 # 인증 플로우 화면
│   │   ├── onboarding.tsx      # AUTH-01
│   │   ├── register.tsx        # AUTH-02
│   │   ├── verify.tsx          # AUTH-03
│   │   ├── login.tsx           # AUTH-04
│   │   └── language.tsx        # AUTH-05
│   ├── (student)/              # 학생 탭 화면
│   │   ├── index.tsx           # STU-01 홈
│   │   ├── explore.tsx         # STU-02 탐색
│   │   ├── club/
│   │   │   ├── [id].tsx        # STU-03 동아리 상세
│   │   │   └── apply.tsx       # STU-04 지원서
│   │   ├── applications.tsx    # STU-05 신청 내역
│   │   ├── notifications.tsx   # STU-06 알림
│   │   └── profile.tsx         # STU-07 프로필
│   └── (manager)/              # 운영진 탭 화면
│       ├── dashboard.tsx       # MGR-01 대시보드
│       ├── applicants.tsx      # MGR-02 지원자 목록
│       ├── fees.tsx            # MGR-03 회비 관리
│       ├── notice.tsx          # MGR-04 공지 작성
│       └── edit-club.tsx       # MGR-05 동아리 수정
│
├── components/                 # 공통 UI 컴포넌트
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── LanguageChip.tsx
│   ├── club/
│   │   ├── ClubListItem.tsx
│   │   ├── ClubDetailHeader.tsx
│   │   └── FilterBar.tsx
│   ├── fee/
│   │   └── FeeRow.tsx
│   └── notification/
│       └── NotificationItem.tsx
│
├── hooks/                      # 커스텀 훅
│   ├── useAuth.ts              # Firebase Auth 상태 관리
│   ├── useClubs.ts             # 동아리 목록 / 상세 조회
│   ├── useApplications.ts      # 지원서 제출 / 상태 조회
│   ├── useFees.ts              # 회비 내역 조회 / 등록
│   └── useTranslate.ts         # Google Translate API 호출
│
├── services/                   # Firebase / 외부 API 연동
│   ├── firebase.ts             # Firebase 초기화
│   ├── auth.ts                 # Auth 함수 모음
│   ├── clubs.ts                # Firestore Club CRUD
│   ├── applications.ts         # Firestore Application CRUD
│   ├── fees.ts                 # Firestore Fee CRUD
│   ├── notifications.ts        # FCM 알림 발송
│   └── translate.ts            # Google Translate API 래퍼
│
├── store/                      # 전역 상태 관리 (Zustand 또는 Context)
│   ├── authStore.ts            # 로그인 사용자 정보
│   └── languageStore.ts        # 선호 언어 설정
│
├── constants/
│   ├── colors.ts               # 디자인 시스템 색상 토큰
│   ├── typography.ts           # 폰트 스타일 토큰
│   └── categories.ts           # 동아리 분야 목록
│
├── types/
│   └── index.ts                # User / Club / Application / Fee / Notification 타입 정의
│
├── assets/
│   ├── images/
│   └── icons/
│
├── app.json                    # Expo 설정
├── firebase.json               # Firebase 설정
└── package.json
```

---

## 10. 주요 컴포넌트 / 모듈 구조

| 모듈 | 역할 | 주요 의존성 |
|---|---|---|
| `useAuth` | Firebase Auth 상태 감지, 로그인/로그아웃 처리 | `firebase/auth` |
| `useClubs` | Firestore에서 동아리 목록 실시간 구독 | `firebase/firestore` |
| `useTranslate` | 번역 캐시 확인 후 미캐시 시 Google API 호출 | `Google Translate API` |
| `useApplications` | 지원서 제출, 운영진 합격 처리 | `firebase/firestore`, `notifications` |
| `useFees` | 회비 내역 조회, 미납 알림 트리거 | `firebase/firestore`, `notifications` |
| `notifications` | FCM 토큰 등록, 푸시 알림 발송 | `firebase/messaging` |
| `FilterBar` | 동아리 탐색 필터 UI (분야 / 언어 / 유학생 환영) | `languageStore` |
| `ClubListItem` | 동아리 목록 한 행 — 번역된 이름/설명 표시 | `useTranslate` |

---

## 11. 프론트-백 연결 포인트

| 기능 | 프론트 호출 | Firebase / API 연결 |
|---|---|---|
| 회원가입 / 이메일 인증 | `auth.register()` | `Firebase Auth createUserWithEmailAndPassword` |
| 로그인 | `auth.login()` | `Firebase Auth signInWithEmailAndPassword` |
| 동아리 목록 조회 | `useClubs()` | `Firestore /clubs` 컬렉션 실시간 구독 |
| 동아리 상세 조회 | `useClubs(clubId)` | `Firestore /clubs/{clubId}` 문서 조회 |
| 다국어 번역 | `useTranslate(text, lang)` | `Google Translate API v2` + Firestore 캐시 |
| 지원서 제출 | `applications.submit()` | `Firestore /applications` 문서 생성 |
| 합격 처리 | `applications.accept()` | Firestore 상태 업데이트 + FCM 알림 발송 |
| 회비 등록 / 조회 | `useFees()` | `Firestore /clubs/{clubId}/fees` 컬렉션 |
| 미납 알림 발송 | `fees.sendReminder()` | `Firebase Cloud Messaging` |
| 공지 푸시 알림 | `notifications.sendNotice()` | `Firebase Cloud Messaging` |

---

## 12. 향후 구조 확장 방향

| 버전 | 추가 구조 | 설명 |
|---|---|---|
| **v1.1** | Toss Payments 연동 | `services/payment.ts` 추가, 이벤트 참가비 결제 처리 |
| **v1.2** | GPT API 연동 | `services/icebreaking.ts` 추가, AI 아이스브레이킹 기능 |
| **v2.0** | 총동아리회 Admin 페이지 | `app/(admin)/` 경로 추가, Firestore 보안 규칙 확장 |
| **다대학 확장** | 멀티 테넌트 구조 | Firestore 최상위 컬렉션을 `university/{uniId}/clubs`로 분리 |
| **광고 슬롯** | 버티컬 광고 모듈 | `components/ads/` 추가, 광고 SDK 연동 |
