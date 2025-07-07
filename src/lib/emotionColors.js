// 기본 감정별 색상 정의 (명시적으로 등록된 항목)
export const emotionColors = {
  슬픔: "#AFCBFF", // 파스텔 하늘
  우울: "#B2A4FF", // 라벤더
  아픔: "#E1C3FF", // 연보라
  외로움: "#ACC8E5", // 파스텔 블루그레이

  기쁨: "#FFD1DC", // 핑크
  행복: "#FFF2B2", // 연노랑
  감동: "#FFD6EC", // 라이트 로즈
  감사: "#FFE0F0", // 베이비 핑크

  평온: "#D4F1D4", // 라이트 민트
  안정: "#CFF5E7", // 연청록
  휴식: "#C9F9F1", // 맑은 민트

  집착: "#FFE27A", // 카나리아 옐로우
  애증: "#FAD689", // 베이지 + 주황
  미련: "#FFE4C9", // 살구색
  불안: "#F9D5E5", // 연보라핑크
};

// 자동 분류용 키워드 기반 그룹
const emotionCategoryMap = {
  negative: [
    "슬픔",
    "우울",
    "괴로움",
    "피로",
    "불안",
    "고통",
    "외로움",
    "스트레스",
  ],
  positive: ["기쁨", "행복", "감사", "감동", "애정", "기대감"],
  peaceful: ["평온", "안정", "휴식", "여유", "차분", "만족"],
  complex: ["집착", "애증", "혼란", "미련", "갈등"],
};

const fallbackColors = {
  negative: "#B4C5E4", // 파란+보라
  positive: "#F8C8DC", // 분홍
  peaceful: "#A1D6B2", // 연초록
  complex: "#FFE099", // 노랑
};

// 최종 색상 가져오기 함수
export const getEmotionColor = (emotion) => {
  if (emotionColors[emotion]) return emotionColors[emotion];

  for (const [category, keywords] of Object.entries(emotionCategoryMap)) {
    if (keywords.some((keyword) => emotion.includes(keyword))) {
      return fallbackColors[category];
    }
  }

  return "#ccc"; // 기본 회색
};
