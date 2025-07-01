# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱 개발중임.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동함.

👉 자세한 개발 일지는 아래에서 확인할 수 있음.  
🔗 [Mori 개발 일지 1일차](https://code-palette.tistory.com/29)

🔗 [Mori 개발 일지 2일차](https://code-palette.tistory.com/30)

🔗 [Mori 개발 일지 3일차](https://code-palette.tistory.com/31)

🔗 [Mori 개발 일지 4일차](https://code-palette.tistory.com/32)

---

## 📦 기술 스택

- ⚛️ Vite + React
- 💨 Tailwind CSS
- 🛡️ Supabase (DB + 인증)
- 🧠 OpenAI (GPT-3.5 API)
- 📱 PWA (앱처럼 설치 가능)

---

## 📂 폴더 구조 요약

```
src/
├── assets/                      # 이미지, 로고 등 정적 파일
│   └── (ex: app-icon.png)       # PWA 아이콘 및 기타 이미지 배치
│
├── components/                  # 재사용 가능한 UI 요소
│   ├── LoginButton.jsx          # ✅ Supabase 로그인 버튼 컴포넌트
│   ├── LogoutButton.jsx         # ✅ Supabase 로그아웃 버튼 컴포넌트
│   └── PrivateRoute.jsx         # ✅ 로그인 여부에 따라 접근 제한 라우터
│                                # 로그인되지 않으면 /login으로 리디렉션
│
├── lib/                         # API, 전역 상태 관리, 헬퍼 유틸
│   ├── supabase.js              # ✅ Supabase 인스턴스 초기화
│   ├── useAuth.js               # ✅ 로그인 상태 커스텀 훅
│   ├── AuthContext.jsx          # ✅ 로그인 상태를 Context로 관리
│   └── openai.js                # 🆕 OpenAI 요약 요청 함수 정의
│                                # - summarizeWithGPT(inputText)
│                                # - system 프롬프트와 함께 API 호출
│                                # - 디버깅용 콘솔 로그 포함
│
├── pages/                       # 각 라우팅 페이지 화면
│   ├── Login.jsx                # ✅ 로그인 안내 및 버튼 출력 화면
│   ├── Home.jsx                 # ✅ 로그인 후 진입하는 기본 메인 화면
│   ├── MyPage.jsx               # 🆗 마이페이지 (내 기록, 그룹 등)
│   ├── Summary.jsx              # 🆕 일기 입력 및 요약 결과 출력 페이지
│                                # - textarea 입력 및 "요약하기" 버튼
│                                # - summarizeWithGPT 호출, 결과 표시
│   └── Chat.jsx                 # 🆗 감정 피드백 및 대화 기반 페이지
│
├── App.jsx                      # ✅ 최상위 컴포넌트
│                                # - <AuthProvider>로 로그인 상태 래핑
│                                # - <AppRoutes />로 라우팅 구성
│
├── AppRoutes.jsx                # ✅ 전체 라우팅 경로 정의
│                                # - react-router-dom 기반
│                                # - PrivateRoute로 보호된 페이지 분기
│
├── index.css                    # ✅ Tailwind CSS 설정 및 전역 스타일
│
├── main.jsx                     # ✅ React 앱 엔트리 포인트
│                                # - App.jsx를 <div id="root">에 마운트
│
public/
├── favicon.ico                 # ✅ 브라우저 탭 아이콘
├── logo192.png                 # ✅ PWA 설치 시 아이콘
├── logo512.png                 # ✅ 고해상도 설치용 아이콘
├── manifest.webmanifest        # ✅ PWA 설치를 위한 설정
│                                # - 앱 이름, 아이콘, 시작 URL 등 포함
│
index.html                      # ✅ 앱 진입점 HTML 파일
                                # - <div id="root">에 React 앱 마운트
                                # - favicon, manifest, meta 태그 포함

.env                            # ✅ OpenAI API 키 포함 (VITE_OPENAI_API_KEY=...)
                                # - .gitignore에 포함하여 외부 공개 방지

package.json                    # ✅ 종속성, 스크립트 정의
                                # - "react", "vite", "tailwind", "react-router-dom", 등 포함

tailwind.config.js              # ✅ Tailwind CSS 설정 파일
vite.config.js                  # ✅ Vite 번들링 및 설정 파일
```

---

## ⚙️ 로컬 실행 방법

```bash
npm install
npm run dev
```

---

## 📆 Mori 개발 일정표 (최신 반영)

| Day    | 날짜       | 실제 진행일 | 내용                                         |
| ------ | ---------- | ----------- | -------------------------------------------- |
| Day 1  | 2025-06-24 | 2025-06-24  | 프로젝트 초기화, PWA 테스트, Tailwind 설치   |
| Day 2  | 2025-06-25 | 2025-06-24  | 기본 폴더 구조 정리, Favicon 및 로고 적용    |
| Day 3  | 2025-06-26 | 2025-06-26  | Supabase + Google OAuth 로그인 연동          |
| Day 4  | 2025-06-27 | 2025-06-27  | 전역 로그인 상태 관리 및 라우팅 분기 처리    |
| Day 5  | 2025-06-30 | 일정 없음   |                                              |
| Day 6  | 2025-07-01 | 2025-07-01  | 요약 결과 출력 + OpenAI API 연동 + 보안 점검 |
| Day 7  | 2025-07-02 | 예정        | 감정 분석 및 감정별 피드백 구성              |
| Day 8  | 2025-07-03 | 예정        | 요약 및 감정 기록 저장 기능                  |
| Day 9  | 2025-07-04 | 예정        | 마이페이지 구조 구현 (내 기록, 그룹 등)      |
| Day 10 | 2025-07-07 | 예정        | PWA 앱 설치 테스트 및 배포 준비              |

---

✏️ 이 프로젝트는 개발 중이며, 자세한 기능 설명과 릴리즈 정보는 추후 업데이트될 예정.
