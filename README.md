# 🌴 Mori

**Mori**는 사용자의 하루 일과를 자연어로 요약하고 감정을 분석해주는 감성 기반 AI 다이어리 앱입니다.  
React + Tailwind + Supabase + OpenAI 기반으로 개발되었으며, 설치형 웹앱(PWA)으로도 작동합니다.

👉 자세한 개발 일지는 아래에서 확인할 수 있습니다.  
🔗 [Mori 개발 일지 1일차](https://code-palette.tistory.com/29) <br/>
🔗 [Mori 개발 일지 2일차](https://code-palette.tistory.com/30) <br/>
🔗 [Mori 개발 일지 3일차](https://code-palette.tistory.com/31) <br/>
🔗 [Mori 개발 일지 4일차](https://code-palette.tistory.com/32) <br/>
🔗 [Mori 개발 일지 5일차](https://code-palette.tistory.com/33) <br/>
🔗 [Mori 개발 일지 6일차](https://code-palette.tistory.com/34) <br/>

---

## 📦 기술 스택

- ⚛️ React (Vite 기반)
- 💨 Tailwind CSS
- 🛡 Supabase (DB + 인증 + RLS)
- 🧠 OpenAI GPT-3.5 API
- 📱 PWA (앱 설치 가능)

---

## 📁 폴더 및 파일 구조 (2025.07.03 기준 최신)

```
src/
├── assets/                             # 정적 파일 (로고, 앱 아이콘 등)
│   └── logo192.png
│   └── logo512.png
│   └── app-icon.png

├── components/                         # 공통 UI 컴포넌트
│   ├── LoginButton.jsx                # Google 로그인 버튼 (Supabase 연동)
│   ├── LogoutButton.jsx               # 로그아웃 처리
│   └── PrivateRoute.jsx               # 인증 기반 라우팅 보호

├── lib/                                # API 및 전역 로직
│   ├── AuthContext.jsx                # 전역 로그인 상태 관리
│   ├── useAuth.js                     # useContext 훅 래핑
│   ├── supabase.js                    # Supabase 클라이언트 초기화
│   ├── openai.js                      # GPT 요약 및 감정 분석 호출
│   └── summaryApi.js                  # Supabase 요약 CRUD API 함수

├── pages/                              # 주요 화면 (라우팅 연결)
│   ├── Chat.jsx                       # 감정 기반 대화 (예정)
│   ├── Home.jsx                       # 기본 홈
│   ├── Login.jsx                      # 로그인 전 소개 페이지
│   ├── MyPage.jsx                     # 📅 일기 캘린더 및 기록 조회
│   └── Summary.jsx                    # 일기 입력 및 요약 수행 화면

├── App.jsx                             # 루트 컴포넌트 (AuthProvider, Routes 포함)
├── AppRoutes.jsx                       # PrivateRoute 포함한 라우팅 설정
├── index.css                           # Tailwind 및 전역 CSS
├── main.jsx                            # 진입점

public/
├── favicon.ico                         # 탭 아이콘
├── manifest.webmanifest                # PWA 메타데이터
├── logo192.png / logo512.png           # 앱 설치 아이콘

.env                                     # OpenAI API 키 등 환경 변수
.gitignore                               # Git 추적 제외 설정
package.json                             # 종속성 관리
tailwind.config.js                       # Tailwind 테마 설정
vite.config.js                           # Vite 빌드/서버 설정
```

---

## 📆 Mori 개발 일정표 (업데이트: 2025-07-03)

| Day    | 날짜      | 주요 작업 내용                                                                                                                | 상태    |
| ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- |
| Day 1  | 6/24 (화) | - 프로젝트 초기화 (Vite + React)<br>- Tailwind 설치<br>- PWA 설정 및 테스트<br>- 기본 폴더 구조 정리                          | ✅ 완료 |
| Day 2  | 6/25 (수) | - Supabase 연동<br>- Google 로그인 구현<br>- Favicon 및 로고 적용                                                             | ✅ 완료 |
| Day 3  | 6/26 (목) | - 전역 로그인 상태 관리<br>- PrivateRoute 적용<br>- 로그인 여부에 따른 라우팅 분기                                            | ✅ 완료 |
| Day 4  | 6/27 (금) | - 페이지별 UI 뼈대 구성<br>- Tailwind 적용<br>- 인증 흐름 점검 및 라우팅 분리                                                 | ✅ 완료 |
| Day 5  | 6/30 (월) | - 일정 없음                                                                                                                   | ✅ 완료 |
| Day 6  | 7/1 (화)  | - GPT 요약 기능 구현<br>- OpenAI 연동 및 프롬프트 구성<br>- Supabase에 저장 로직 완료                                         | ✅ 완료 |
| Day 7  | 7/2 (수)  | - 감정 분석 및 피드백 표시<br>- RLS 정책 정리 및 트리거 테스트<br>- 요약 결과 저장 테스트 완료                                | ✅ 완료 |
| Day 8  | 7/3 (목)  | - 📅 캘린더 UI 수동 구현<br>- 요약 날짜 하이라이트 표시<br>- 연도 선택 모달 구현<br>- 요약/삭제 기능 처리<br>- 수정 기능 보류 | ✅ 완료 |
| Day 9  | 7/4 (금)  | - 감정 통계 시각화 (예정)<br>- 날짜 클릭 시 모달 내 감정 분석 결과 연동                                                       | 🔜 예정 |
| Day 10 | 7/8 (월)  | - UI 전반 수정<br>- 마이페이지 레이아웃 개선<br>- 피드백/감정 표현 UI 리팩토링                                                | 🔜 예정 |
| Day 11 | 7/9 (화)  | - Vercel 배포 준비<br>- 배포 전 최종 점검                                                                                     | 🔜 예정 |

---

## ✅ 기능 체크리스트 (2025-07-03 기준)

| 기능                 | 상태    | 비고                           |
| -------------------- | ------- | ------------------------------ |
| 구글 로그인          | ✅ 완료 | Supabase 인증                  |
| GPT 요약 + 감정 분석 | ✅ 완료 | summarizeWithGPT               |
| 요약 결과 DB 저장    | ✅ 완료 | `saveSummary()`                |
| 감정별 피드백 표현   | ✅ 완료 | ❤️ 감정 / 💬 피드백 포함       |
| 캘린더 UI 구현       | ✅ 완료 | 수동 구현, 요약 날짜 표시 포함 |
| 연도 선택 모달       | ✅ 완료 | 연도 버튼, 선택 시 월 갱신     |
| 날짜 클릭 상세 보기  | 🚧 미완 | 모달은 작동하나 UI 완성도 미흡 |
| 감정 통계 시각화     | ❌ 미완 | 차트 or 이모지 기반            |
| 요약 수정 기능       | 🚫 중단 | 수정은 보류, 버튼은 주석 처리  |
| 마이페이지 UI 개선   | ❌ 미완 | 7/8 이후 예정                  |
| Vercel 배포          | ❌ 미완 | 7/9 예정                       |

---

✏️ 이 프로젝트는 계속 업데이트 중이며, 상세 구현/문제 해결 과정은 개발 블로그에 기록되어 있습니다.
