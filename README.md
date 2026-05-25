# UniMeet

> Sun Moon University club discovery and application platform for Korean and international students.

UniMeet is a mobile-first app for discovering clubs, reading club information in multiple languages, submitting applications, and helping club leaders/operators manage recruiting workflows.

## Current Status

This repository is being rebuilt from the previous prototype into a new Expo-based MVP.

The current implementation is a mock-data app shell focused on the core UX:

- Student bottom tabs: Home, Explore, Applications, Alerts, My Page
- Club exploration with cards and filters
- Club detail pages with representative photos, club information, recruitment details, and recent activities
- Application form mock flow
- Club leader dashboard mock flow
- Admin dashboard mock flow
- Language settings with separate UI language and content translation controls
- Original Korean content plus optional translated content

## Tech Stack

| Area | Stack |
|---|---|
| App | React Native + Expo |
| Routing | Expo Router |
| State | Zustand |
| UI | React Native StyleSheet + Expo Vector Icons |
| Planned Auth | Firebase Authentication |
| Planned DB | Cloud Firestore |
| Planned Storage | Firebase Storage |
| Planned Translation | Google Cloud Translation Advanced via Firebase Callable Functions |

## Translation Policy

UniMeet separates app UI language from club content translation.

- **UI language**: buttons, tabs, menus, and labels are shown only in the selected language.
- **Content translation**: club introductions, recruitment details, and notices can show the original Korean text plus a translated version.
- **Translation toggle**: users can turn content translation on or off.
- **MVP mock languages**: Korean, English, Japanese, Chinese, Vietnamese.

Planned production flow:

```text
App
  -> Firebase Callable Function
  -> Google Cloud Translation Advanced
  -> Firestore translation cache
  -> App displays cached translation
```

The app should not call the Google Translation API directly from the client.

## Project Structure

```text
app/
  (tabs)/              Main student tab screens
  admin/               Admin dashboard mock
  club/[id]/           Club detail and application form
  leader/              Club leader dashboard mock
  settings/language    Language settings
components/            Shared UI components
constants/             Theme tokens
data/                  Mock data
store/                 Zustand stores
types/                 Shared TypeScript types
utils/                 Helpers and i18n utilities
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the Expo web dev server:

```bash
npm run web
```

Start the Expo dev server for device testing:

```bash
npm start
```

Run TypeScript checks:

```bash
npm run typecheck
```

Export the web bundle:

```bash
npx expo export --platform web
```

## MVP Scope

Included in the MVP direction:

- School email sign-up/login
- Language selection
- Club discovery
- Club detail page
- Application submission
- Application status tracking
- Club leader promotion card and applicant management
- Operator club creation and leader assignment
- In-app notifications

Deferred to later phases:

- Realtime chat
- Push notifications
- Administrative document submission/review
- Reporting and analytics dashboards
- Report/block workflows
- Web admin dashboard
- Full file-upload workflow

## Documents

- `UNIMEET_PRD_v2.md`: development PRD
- `FUTURE_WORK.md`: implementation backlog for Firebase, translation, permissions, and later phases

## Notes

The current app uses mock data only. Firebase integration, authentication, Firestore security rules, and Google Translation API integration are planned follow-up work.

