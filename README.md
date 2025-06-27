# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱 개발중임.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동함.

👉 자세한 개발 일지는 아래에서 확인할 수 있음.  
🔗 [Mori 개발 일지 1일차](https://code-palette.tistory.com/29)  
🔗 [Mori 개발 일지 2일차](https://code-palette.tistory.com/30)
🔗 [Mori 개발 일지 2일차](https://code-palette.tistory.com/31)

---

## 📦 기술 스택

- ⚛️ Vite + React
- 💨 Tailwind CSS
- 🛡️ Supabase (DB + 인증)
- 🧠 OpenAI (GPT 요약)
- 📱 PWA (앱처럼 설치 가능)

---

## 📂 폴더 구조 요약

```
src/
├── assets/                      # 이미지, 로고 등 정적 파일
├── components/                 # 재사용 가능한 UI 요소
│   ├── LoginButton.jsx         # Supabase 로그인 처리 버튼
│   ├── LogoutButton.jsx        # Supabase 로그아웃 처리 버튼
│   └── PrivateRoute.jsx        # 로그인 여부에 따라 접근 제한 라우터
├── lib/                        # API 및 전역 상태 관련 설정
│   ├── supabase.js             # Supabase 클라이언트 설정
│   ├── useAuth.js              # 로그인 상태 커스텀 훅
│   └── AuthContext.jsx         # 전역 로그인 Context
├── pages/                      # 주요 페이지 구성
│   ├── Login.jsx               # 로그인 전 화면
│   ├── Home.jsx                # 로그인 후 메인 화면
│   ├── MyPage.jsx              # 마이페이지 (내 기록, 그룹 등)
│   ├── Summary.jsx             # 요약 입력 및 결과 페이지
│   └── Chat.jsx                # 감정 피드백 및 대화 페이지
├── App.jsx                     # 최상위 컴포넌트, Context 래핑
├── AppRoutes.jsx               # 모든 라우팅 경로 정의
├── index.css                   # Tailwind 전역 스타일
├── main.jsx                    # 앱 진입점
public/
├── favicon.ico                 # 브라우저 탭 아이콘
├── logo192.png                 # PWA 아이콘
├── logo512.png                 # 고해상도 PWA 아이콘
├── manifest.webmanifest        # PWA 설치 및 메타 정보
index.html                      # 앱의 시작점이 되는 HTML 파일
                                # React 앱이 이 HTML의 <div id="root">에 렌더링됨
                                # favicon, manifest, meta 태그도 여기서 설정
package.json                    # 프로젝트의 종속성, 실행, 스크립트, 메타
tailwind.config.js              # Tailwind CSS 설정파일
                                # 어떤 폴더에서 Tailwind 클래스를 사용할지 경로 지정
                                # 테마 색상이나 커스텀 유틸리티도 이곳에서 확장 가능
vite.config.js                  # Vite 개발 서버 및 번들러 설정 파일
                                # React 플러그인이나 PWA 설정 등을 여기서 구성
                                # 개발 서버 포트나 alias 등도 설정 가능
.env                            # 중요 API 키나 다른 설정 키들 보관하는 파일로 볼 수 없게 설정함(.gitignore에 숨김처리)
```

---

## ⚙️ 로컬 실행 방법

```bash
npm install
npm run dev
```

---

## 🗓️ Mori 개발 일정표 (주말 제외 평일 기준)

| Day    | 날짜       | 예정 내용                                  |
| ------ | ---------- | ------------------------------------------ |
| Day 1  | 2025-06-24 | 프로젝트 초기화, PWA 테스트, Tailwind 설치 |
| Day 2  | 2025-06-25 | 기본 폴더 구조 정리, Favicon 및 로고 적용  |
| Day 3  | 2025-06-26 | Supabase + Google OAuth 로그인 연동        |
| Day 4  | 2025-06-27 | 전역 로그인 상태 관리 및 라우팅 분기       |
| Day 5  | 2025-06-30 | 글 입력 UI 및 요약 요청 기능 구현          |
| Day 6  | 2025-07-01 | 요약 결과 출력 화면 구현                   |
| Day 7  | 2025-07-02 | 감정 분석 및 감정별 피드백 구성            |
| Day 8  | 2025-07-03 | 요약 및 감정 기록 저장 기능                |
| Day 9  | 2025-07-04 | 마이페이지 구조 구현 (내 기록, 그룹 등)    |
| Day 10 | 2025-07-07 | PWA 앱 설치 테스트 및 배포 준비            |

---

✏️ 이 프로젝트는 개발 중이며, 자세한 기능 설명과 릴리즈 정보는 추후 업데이트될 예정.
