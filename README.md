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
🔗 [Mori 개발 일지 9일차](https://code-palette.tistory.com/37) <br/>

---

## 📦 기술 스택

- ⚛️ React (Vite 기반)
- 💨 Tailwind CSS
- 🛡 Supabase (DB + 인증 + RLS)
- 🧠 OpenAI GPT-3.5 API
- 📱 PWA (앱 설치 가능)

---

## 📁 폴더 구조 (2025-07-08 기준)

```
src/
├── assets/                      # 정적 리소스 (예: 로고, 이미지 등)
│   └── react.svg
├── components/                 # 재사용 가능한 UI 컴포넌트
│   ├── EmotionChart.jsx        # 감정 분석 결과를 바 차트로 시각화
│   ├── LoadingDonut.jsx        # 도넛 형태의 로딩 애니메이션 컴포넌트
│   ├── LoginButton.jsx         # 구글 로그인 버튼
│   ├── LogoutButton.jsx        # 로그아웃 버튼
│   └── PrivateRoute.jsx        # 로그인 여부에 따른 라우트 보호 처리
├── lib/                        # 유틸리티 함수 및 외부 API 설정
│   ├── AuthContext.jsx         # 로그인 상태 전역 관리 컨텍스트
│   ├── extractSection.js       # GPT 응답에서 특정 섹션 추출 함수 (일부 폐기 예정)
│   ├── openai.js               # GPT 요청/응답 및 감정/행동/요약 파싱
│   ├── prompts.js              # GPT 프롬프트 사전 정의 모음 (일간/월간)
│   ├── supabase.js             # Supabase 초기화 및 설정
│   └── useAuth.js              # 사용자 인증 커스텀 훅
├── pages/                      # 실제 라우팅되는 화면 단위 컴포넌트
│   ├── CalendarView.jsx        # 달력 기반 마이페이지, 요약/삭제/연도선택 포함
│   ├── Chat.jsx                # 채팅 기능 (예정)
│   ├── DiaryWrite.jsx          # 일기 작성 및 GPT 요약 요청 화면
│   ├── Login.jsx               # 최초 로그인 및 소셜 연동 페이지
│   ├── ResultDaily.jsx         # 일간 결과 화면, 감정 + 피드백 + 행동 추천 포함
│   ├── ResultMonthly.jsx       # 월간 결과 화면, 전체 일기 기반 감정 분석 및 행동 추천
│   └── TestLoading.jsx         # 로딩 도넛 단독 테스트용 임시 페이지
├── App.jsx                     # 전체 앱의 루트 컴포넌트
├── AppRoutes.jsx               # 라우트 분기 및 보호 처리 컴포넌트
└── main.jsx                    # React 진입점 (DOM 렌더링)
```

---

## 📆 Mori 개발 일정표 (최신 업데이트: 2025-07-08 기준)

| Day    | 예정 날짜 | 실제 날짜 | 주요 작업 내용                                                                                                                      | 상태    |
| ------ | --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Day 1  | 6/24 (화) | 6/24 (화) | - Vite + React 프로젝트 초기화<br>- Tailwind 설치<br>- PWA 테스트<br>- 기본 폴더 구조 정리                                          | ✅ 완료 |
| Day 2  | 6/25 (수) | 6/25 (수) | - Supabase 연동<br>- Google 로그인 구현<br>- 로고 및 Favicon 적용                                                                   | ✅ 완료 |
| Day 3  | 6/26 (목) | 6/26 (목) | - 전역 로그인 상태 관리<br>- PrivateRoute 적용<br>- 로그인 여부에 따라 라우팅 분기 처리                                             | ✅ 완료 |
| Day 4  | 6/27 (금) | 6/27 (금) | - 페이지별 UI 뼈대 구성<br>- 인증 흐름 점검<br>- Tailwind 스타일 적용                                                               | ✅ 완료 |
| Day 5  | 6/30 (월) | 6/30 (월) | - 일정 없음                                                                                                                         | ✅ 완료 |
| Day 6  | 7/1 (화)  | 7/1 (화)  | - GPT 요약 기능 구현<br>- OpenAI 프롬프트 구성<br>- Supabase에 저장 로직 구현                                                       | ✅ 완료 |
| Day 7  | 7/2 (수)  | 7/2 (수)  | - 감정 분석 및 피드백 출력<br>- RLS 정책 정리 및 테스트<br>- 요약 결과 저장 테스트                                                  | ✅ 완료 |
| Day 8  | 7/3 (목)  | 7/3 (목)  | - 📅 캘린더 UI 수동 구현<br>- 날짜별 요약 하이라이트<br>- 연도 선택 모달<br>- 요약/삭제 기능 처리                                   | ✅ 완료 |
| Day 9  | 7/4 (금)  | 7/4 (금)  | - 감정 통계 시각화 컴포넌트 제작<br>- 도넛 로딩 UI 구현<br>- ResultDaily.jsx 결과화면 구현<br>- ResultMonthly.jsx 구조 생성 및 연결 | ✅ 완료 |
| Day 10 | 7/7 (월)  | 7/7 (월)  | - GPT 프롬프트 정비 (일간/월간 구분)<br>- extractSection 및 감정 파싱 유틸 정리<br>- 기술 블로그 작성 예정                          | ✅ 완료 |
| Day 11 | 7/8 (화)  | 7/7 (월)  | - DiaryWrite 리팩토링<br>- 감정 퍼센트 파싱 개선<br>- GPT 응답 구조 및 navigate 전달 개선                                           | ✅ 완료 |
| Day 12 | 7/9 (수)  | 7/7 (월)  | - ResultDaily UI 개선<br>- 행동 추천 이모지 커스터마이징<br>- 리스트 스타일 개선<br>- README 및 개발일지 문서화                     | ✅ 완료 |
| Day 13 | 7/10 (목) | 7/8 (화)  | - 전체 화면 흐름 및 설계 이미지 학습 완료<br>- 기능/디자인 문제점 분석 및 일정 리디자인 완료                                        | ✅ 완료 |
| Day 14 | 7/11 (금) | 7/8 (화)  | - ResultMonthly 기능 연동 시작<br>- GPT 응답 → 감정 요약/시각화 적용 시작                                                           | ✅ 완료 |
| Day 15 | 7/12 (토) | 예정      | - EmotionChart 정렬 구조 개선<br>- 감정 색상 매핑 리팩토링                                                                          | ⏳ 예정 |
| Day 16 | 7/14 (월) | 예정      | - Result 구조 통일화<br>- 캘린더 월간 요약 버튼 UX 점검                                                                             | ⏳ 예정 |
| Day 17 | 7/15 (화) | 예정      | - 전체 기능 QA<br>- UI/UX 피드백 반영<br>- 감정 정렬 통합 반영                                                                      | ⏳ 예정 |
| Day 18 | 7/16 (수) | 예정      | - Supabase 저장 로직 점검<br>- navigate 흐름, 삭제 기능 정리                                                                        | ⏳ 예정 |
| Day 19 | 7/17 (목) | 예정      | - 전체 기능 QA 및 예외처리<br>- 오류 대응 마무리                                                                                    | ⏳ 예정 |
| Day 20 | 7/18 (금) | 예정      | - DiaryWrite / ResultDaily UI/UX 리팩토링 Day 1                                                                                     | ⏳ 예정 |
| Day 21 | 7/19 (토) | 예정      | - DiaryWrite / ResultDaily UI/UX 리팩토링 Day 2<br>- 중앙 정렬 / 모바일 대응 / 버튼 구조 정리                                       | ⏳ 예정 |
| Day 22 | 7/21 (월) | 예정      | - CalendarView, ResultMonthly, Login 등 전체 레이아웃 통일<br>- 홈 버튼 연결                                                        | ⏳ 예정 |
| Day 23 | 7/22 (화) | 예정      | - UI 전수 QA (모바일/데스크탑 대응)<br>- console.log 제거                                                                           | ⏳ 예정 |
| Day 24 | 7/23 (수) | 예정      | - ✅ 최종 Vercel 배포<br>- README 최종 정리<br>- 기술 블로그 작성 마무리                                                            | ⏳ 예정 |
