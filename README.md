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
🔗 [Mori 개발 일지 7일차](https://code-palette.tistory.com/35) <br/>

---

## 📦 기술 스택

- ⚛️ React (Vite 기반)
- 💨 Tailwind CSS
- 🛡 Supabase (DB + 인증 + RLS)
- 🧠 OpenAI GPT-3.5 API
- 📱 PWA (앱 설치 가능)

---

## 📁 폴더 및 파일 구조 (2025.07.04 기준)

```
src/
├── assets/                             # 정적 파일 (로고, 앱 아이콘 등)
│   └── logo192.png
│   └── logo512.png
│   └── app-icon.png

├── components/                         # 공통 UI 컴포넌트 및 시각화 요소
│   ├── LoginButton.jsx                # Google 로그인 버튼 (Supabase 연동)
│   ├── LogoutButton.jsx               # 로그아웃 처리
│   ├── PrivateRoute.jsx               # 인증 기반 라우팅 보호
│   ├── EmotionChart.jsx               # 감정 비율 시각화 그래프
│   └── LoadingDonut.jsx               # 요약 중 애니메이션 (도넛형)

├── lib/                                # API 및 전역 로직
│   ├── AuthContext.jsx                # 전역 로그인 상태 관리
│   ├── useAuth.js                     # useContext 훅 래핑
│   ├── supabase.js                    # Supabase 클라이언트 초기화
│   ├── openai.js                      # GPT 요약 및 감정 분석 호출
│   ├── summaryApi.js                  # Supabase 요약 CRUD API 함수
│   ├── emotionColors.js               # 감정명별 색상 맵핑 및 분류 로직
│   └── extractSection.js              # GPT 응답 파싱 유틸

├── pages/                              # 주요 화면 (라우팅 연결)
│   ├── Login.jsx                      # 로그인 소개 페이지
│   ├── Home.jsx                       # 일기 작성 진입 뷰
│   ├── DiaryWrite.jsx                # 일기 입력 및 요약 실행
│   ├── ResultDaily.jsx               # 일간 요약 결과 (감정/피드백/추천)
│   ├── CalendarView.jsx              # 📅 요약 기록 캘린더 및 삭제 기능 포함
│   ├── ResultMonthly.jsx             # 월간 감정 분석 및 행동 추천
│   └── Chat.jsx                      # 감정 기반 대화 (예정)

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

✏️ 이 프로젝트는 계속 업데이트 중이며, 상세 구현/문제 해결 과정은 개발 블로그에 기록되어 있습니다.

---

## 📆 Mori 개발 일정표 (최신 업데이트: 2025-07-04 기준)

| Day    | 날짜      | 주요 작업 내용                                                                                                                      | 상태    |
| ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Day 1  | 6/24 (화) | - Vite + React 프로젝트 초기화<br>- Tailwind 설치<br>- PWA 테스트<br>- 기본 폴더 구조 정리                                          | ✅ 완료 |
| Day 2  | 6/25 (수) | - Supabase 연동<br>- Google 로그인 구현<br>- 로고 및 Favicon 적용                                                                   | ✅ 완료 |
| Day 3  | 6/26 (목) | - 전역 로그인 상태 관리<br>- PrivateRoute 적용<br>- 로그인 여부에 따라 라우팅 분기 처리                                             | ✅ 완료 |
| Day 4  | 6/27 (금) | - 페이지별 UI 뼈대 구성<br>- 인증 흐름 점검<br>- Tailwind 스타일 적용                                                               | ✅ 완료 |
| Day 5  | 6/30 (월) | - 일정 없음                                                                                                                         | ✅ 완료 |
| Day 6  | 7/1 (화)  | - GPT 요약 기능 구현<br>- OpenAI 프롬프트 구성<br>- Supabase에 저장 로직 구현                                                       | ✅ 완료 |
| Day 7  | 7/2 (수)  | - 감정 분석 및 피드백 출력<br>- RLS 정책 정리 및 테스트<br>- 요약 결과 저장 테스트                                                  | ✅ 완료 |
| Day 8  | 7/3 (목)  | - 📅 캘린더 UI 수동 구현<br>- 날짜별 요약 하이라이트<br>- 연도 선택 모달<br>- 요약/삭제 기능 처리                                   | ✅ 완료 |
| Day 9  | 7/4 (금)  | - 감정 통계 시각화 컴포넌트 제작<br>- 도넛 로딩 UI 구현<br>- ResultDaily.jsx 결과화면 구현<br>- ResultMonthly.jsx 구조 생성 및 연결 | ✅ 완료 |
| Day 10 | 7/8 (월)  | - GPT 프롬프트 정비 (일간/월간 구분)<br>- `extractSection()` 및 감정 파싱 유틸 정리                                                 | 🔜 예정 |
| Day 11 | 7/9 (화)  | - `DiaryWrite.jsx` 리팩토링<br>- 로딩 / 결과 분리<br>- 상태 기반 navigate 처리 확정                                                 | 🔜 예정 |
| Day 12 | 7/10 (목) | - 월간 요약 실행 기능 연동<br>- 실제 GPT 요청 및 응답 정리<br>- ResultMonthly.jsx 기능 연동                                         | 🔜 예정 |
| Day 13 | 7/11 (금) | - 전체 흐름 QA<br>- 에러 처리 및 UX 점검<br>- 감정 색상 일관화                                                                      | 🔜 예정 |
| Day 14 | 7/12 (토) | - Vercel 배포 및 설치 테스트<br>- 최종 README 및 마감 문서 작성                                                                     | 🔜 예정 |
