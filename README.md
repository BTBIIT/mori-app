# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱 개발중임.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동함.

👉 자세한 개발 일지는 아래에서 확인할 수 있음.  
🔗 [Mori 개발 일지 1일차](https://code-palette.tistory.com/29)

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
├── pages/                   # 각 화면별 구성
├── lib/                     # API 요청, 유틸 함수 등
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
```

---

## ⚙️ 로컬 실행 방법

```bash
npm install
npm run dev
```

---

✏️ 이 프로젝트는 개발 중이며, 자세한 기능 설명과 릴리즈 정보는 추후 업데이트될 예정.
