# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱 개발중임.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동함.

👉 자세한 개발 일지는 아래에서 확인할 수 있음.  
🔗 [Mori 개발 일지 1일차](https://code-palette.tistory.com/29)  
🔗 [Mori 개발 일지 2일차](https://code-palette.tistory.com/30)

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
├── assets/                  # 이미지, 로고 등 정적 파일
├── components/              # 재사용 가능한 UI 요소
├────────────── LoginButton.jsx # LoginButton 구현
├────────────── LogoutButton.jsx # LogoutButton 구현
├── pages/                   # 각 화면별 구성
├── lib/                     # API 요청, 유틸 함수 등
├─────── supabse.js             # supabase 관련 설정 파일
├── App.jsx
├── index.css
├── main.jsx
public/
├── favicon.ico              # 사이트 상단의 로고
├── logo192.png              # PWA 앱 설치 시 다운로드 될 로고
├── logo512.png              # PWA 웹 설치 시 다운로드 될 로고
├── manifest.webmanifest     # PWA 설정 파일

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
