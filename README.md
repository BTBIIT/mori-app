# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱입니다.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동합니다.

👉 자세한 개발 일지는 아래에서 확인할 수 있습니다.  
🔗 [Mori 개발 일지 1~7일차](https://code-palette.tistory.com/33)

---

## 📦 기술 스택

- ⚛️ Vite + React
- 💨 Tailwind CSS
- 🛡️ Supabase (DB + 인증)
- 🧠 OpenAI (GPT-3.5 API)
- 📱 PWA (앱처럼 설치 가능)

---

## 📁 폴더 및 파일 구조 (전체 + 상세 주석)

```
src/
├── assets/                            # 앱 아이콘, 이미지 등 정적 파일 보관
│   └── logo192.png
│   └── logo512.png
│   └── app-icon.png
│
├── components/                        # 공통 UI 컴포넌트 모음
│   ├── LoginButton.jsx               # Supabase Google 로그인 버튼
│   ├── LogoutButton.jsx              # Supabase 로그아웃 버튼
│   └── PrivateRoute.jsx              # 로그인 여부에 따라 페이지 접근 제어
│
├── lib/                               # API 호출, 상태관리, 헬퍼 모듈
│   ├── AuthContext.jsx               # 전역 로그인 상태 Context
│   ├── openai.js                     # OpenAI 요약 호출 함수
│   ├── summaryApi.js                 # 요약 결과 DB 저장 함수
│   ├── supabase.js                   # Supabase 인스턴스 생성 및 설정
│   └── useAuth.js                    # 로그인 상태를 추적하는 커스텀 훅
│
├── pages/                             # 라우트에 연결되는 주요 화면
│   ├── Chat.jsx                      # 감정 기반 대화/피드백 페이지
│   ├── Home.jsx                      # 메인 홈 화면 (로그인 후)
│   ├── Login.jsx                     # 로그인 안내 및 버튼 출력
│   ├── MyPage.jsx                    # 마이페이지 (내 기록, 그룹 등)
│   └── Summary.jsx                   # 요약 기능 및 결과 출력 페이지
│
├── App.jsx                            # 앱의 루트 컴포넌트 (라우팅 및 AuthProvider 포함)
├── AppRoutes.jsx                      # 전체 라우팅 정의 (PrivateRoute 포함)
├── index.css                          # Tailwind 및 전역 스타일 정의
├── main.jsx                           # React 앱 진입점
│
public/
├── favicon.ico                        # 브라우저 탭 아이콘
├── logo192.png / logo512.png          # PWA 설치용 아이콘
├── manifest.webmanifest               # PWA 메타정보 설정
│
.env                                   # 환경 변수 파일 (OpenAI API 키 등)
.gitignore                             # Git 제외 파일 설정 (.env 포함)
package.json                           # 종속성 및 npm 스크립트
tailwind.config.js                     # Tailwind 설정 파일
vite.config.js                         # Vite 번들링 및 서버 설정
```

---

## ⚙️ 로컬 실행 방법

```bash
npm install
npm run dev
```

---

## 📆 Mori 개발 일정표 (최신 반영)

| Day    | 날짜      | 주요 작업 내용                                                                                                                                                                 | 상태    |
| ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| Day 1  | 6/24 (화) | - Vite + React 프로젝트 생성<br>- Tailwind 설치<br>- 폴더 구조 정리<br>- PWA 설정                                                                                              | ✅ 완료 |
| Day 2  | 6/25 (수) | - Supabase 연동<br>- Google 로그인 구현<br>- Favicon & 로고 적용                                                                                                               | ✅ 완료 |
| Day 3  | 6/26 (목) | - 전역 로그인 상태 관리<br>- 라우팅 분기 처리 (PrivateRoute, useAuth)                                                                                                          | ✅ 완료 |
| Day 4  | 6/27 (금) | - 기본 레이아웃 구성<br>- 로그인/기록 페이지 구성<br>- 라우팅 및 auth 테스트                                                                                                   | ✅ 완료 |
| Day 5  | 6/30 (월) | - 일정 없음 (주말 대체 휴식)                                                                                                                                                   | ✅ 완료 |
| Day 6  | 7/1 (화)  | - GPT 요약 기능 구현 완료<br>- 요약 결과 UI 구성<br>- OpenAI 연동 및 보안 점검                                                                                                 | ✅ 완료 |
| Day 7  | 7/2 (수)  | - 감정 분석 로직 구현<br>- 감정별 피드백 구성<br>- 요약 및 감정 기록 저장 기능 구현<br>- summaries 테이블 연동 및 테스트 완료<br>- 자동 user_profiles 생성 트리거 점검 및 완료 | ✅ 완료 |
| Day 8  | 7/3 (목)  | - 일기 캘린더 구조 설계 및 연동 준비                                                                                                                                           | 🔜 예정 |
| Day 9  | 7/4 (금)  | - 마이페이지 구조 구현 (내 기록, 그룹 등)<br>- 프로필 공개 설정                                                                                                                | 🔜 예정 |
| Day 10 | 7/7 (월)  | - PWA 설치 테스트<br>- Vercel 배포 준비 및 점검                                                                                                                                | 🔜 예정 |

---

✏️ 이 프로젝트는 계속 업데이트 중이며, 상세 구현/문제 해결 과정은 개발 블로그에 기록되어 있습니다.
