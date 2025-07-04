// 기본 감정별 색상 정의 (명시적으로 등록된 항목)
export const emotionColors = {
  슬픔: "#B4C5E4",
  우울: "#A8B1E4",
  아픔: "#C5B4E4",
  외로움: "#B4D0E4",
  기쁨: "#F8C8DC",
  행복: "#FAD0DC",
  감동: "#F8D4E4",
  감사: "#FFD7EB",
  평온: "#A1D6B2",
  안정: "#BEE1C6",
  휴식: "#CDE8C9",
  집착: "#FFE099",
  애증: "#F9DBA7",
  미련: "#FFE8B0",
  불안: "#FFE4A0",
};

// 자동 분류용 키워드 기반 그룹
const emotionCategoryMap = {
  negative: ["슬픔", "우울", "괴로움", "피로", "불안", "고통", "외로움"],
  positive: ["기쁨", "행복", "감사", "감동", "애정", "기대감"],
  peaceful: ["평온", "안정", "휴식", "여유", "차분"],
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
