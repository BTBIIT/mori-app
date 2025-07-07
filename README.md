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
🔗 [Mori 개발 일지 8일차](https://code-palette.tistory.com/36) <br/>

---

## 📦 기술 스택

- ⚛️ React (Vite 기반)
- 💨 Tailwind CSS
- 🛡 Supabase (DB + 인증 + RLS)
- 🧠 OpenAI GPT-3.5 API
- 📱 PWA (앱 설치 가능)

---

## 📁 폴더 구조 (2025-07-07 기준)

```
src/
├── assets/                      # 정적 리소스 저장용 (현재 react.svg만 존재, 실제 사용되지 않음)
│   └── react.svg
├── components/                 # 공통 컴포넌트 모음
│   ├── EmotionChart.jsx        # 감정 분석 결과 시각화 바 차트
│   ├── LoadingDonut.jsx        # 로딩 상태 도넛 애니메이션
│   ├── LoginButton.jsx         # Google 로그인 버튼
│   ├── LogoutButton.jsx        # 로그아웃 버튼
│   └── PrivateRoute.jsx        # 인증 여부에 따른 보호 라우팅
├── lib/                        # API 및 유틸 함수
│   ├── AuthContext.jsx         # 로그인 Context 제공
│   ├── extractSection.js       # GPT 응답 파트 추출 함수
│   ├── openai.js               # OpenAI API 호출 및 응답 파싱
│   ├── prompts.js              # GPT에 전달되는 프롬프트 모음
│   ├── supabase.js             # Supabase 클라이언트 초기화
│   └── useAuth.js              # 사용자 인증 커스텀 훅
├── pages/                      # 화면 라우팅 페이지들
│   ├── CalendarView.jsx        # 마이페이지 - 달력 기반 기록 열람
│   ├── Chat.jsx                # (예정) 사용자 간 대화 기능
│   ├── DiaryWrite.jsx          # 일기 작성 및 요약 요청
│   ├── Login.jsx               # 로그인 페이지
│   ├── ResultDaily.jsx         # 일간 요약 결과 표시
│   ├── ResultMonthly.jsx       # 월간 요약 결과 표시
│   └── TestLoading.jsx         # 도넛 애니메이션 테스트 페이지
├── App.jsx                     # 앱의 진입점 컴포넌트
├── AppRoutes.jsx               # 전체 라우팅 관리
└── main.jsx                    # React DOM 렌더링
```

---

✏️ 이 프로젝트는 계속 업데이트 중이며, 상세 구현/문제 해결 과정은 개발 블로그에 기록되어 있습니다.

---

## 📆 Mori 개발 일정표 (최신 업데이트: 2025-07-09 기준)

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
| Day 10 | 7/7 (월)  | - GPT 프롬프트 정비 (일간/월간 구분)<br>- extractSection 및 감정 파싱 유틸 정리<br>- ✅ 기술 블로그 작성 예정                       | ✅ 완료 |
| Day 11 | 7/8 (화)  | - DiaryWrite 리팩토링<br>- 감정 퍼센트 파싱 개선<br>- GPT 응답 구조 및 navigate 전달 개선                                           | ✅ 완료 |
| Day 12 | 7/9 (수)  | - ResultDaily UI 개선<br>- 행동 추천 이모지 커스터마이징<br>- 리스트 스타일 개선<br>- README 및 개발일지 문서화                     | ✅ 완료 |
| Day 13 | 7/10 (목) | - 월간 요약 실행 기능 연동<br>- 실제 GPT 요청 및 응답 정리<br>- ResultMonthly.jsx 기능 연동                                         | 🔜 예정 |
| Day 14 | 7/11 (금) | - 전체 흐름 QA<br>- 에러 처리 및 UX 점검<br>- 감정 색상 일관화                                                                      | 🔜 예정 |
| Day 15 | 7/12 (토) | - Vercel 배포 및 설치 테스트<br>- 최종 README 및 마감 문서 작성                                                                     | 🔜 예정 |
