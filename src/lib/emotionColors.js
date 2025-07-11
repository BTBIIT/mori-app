// 📁 src/lib/emotionColors.js

// ✅ 기본 감정별 직접 정의 색상 (우선 적용)
export const emotionColors = {
  기쁨: "#FFD6E8",
  행복: "#FFF1A6",
  감사: "#FFE0F0",
  감동: "#FFD6EC",
  설렘: "#FFE3BA",
  사랑: "#FFCCDA",
  희망: "#FFEABF",

  슬픔: "#AFCBFF",
  우울: "#B2A4FF",
  불안: "#C7B8FF",
  피로: "#B5C7E7",
  고통: "#C8BBEF",
  무기력: "#BBD6EC",
  스트레스: "#A3B9E2",
  외로움: "#ACC8E5",
  즐거움: "#FFE6F0",
  평온: "#D4F1D4",
  안정: "#CFF5E7",
  만족: "#D7FBE8",
  차분: "#CDEBE4",
  휴식: "#C9F9F1",
  여유: "#DEFBE6",

  애증: "#FAD689",
  미련: "#FFE4C9",
  집착: "#FFE27A",
  혼란: "#FBE4B4",
  갈등: "#FFE1B3",
  공허: "#D5D1E6",

  후회: "#D4C1EC",
  질투: "#D1A5BC",
  짜증: "#FFDDC1",
  흥미: "#FBE9E7",
  반가움: "#FFF3C1",
  놀람: "#F0E1FF",
  두려움: "#C1D0F0",
  실망: "#BCCCE0",
  분노: "#F7A1A1",
  좌절: "#DAB6FC",
  공포: "#B1B2FF",
};

// ✅ 감정 키워드 그룹핑
const emotionCategoryMap = {
  positive: [
    "기쁨",
    "행복",
    "감사",
    "감동",
    "설렘",
    "사랑",
    "희망",
    "만족",
    "반가움",
    "흥미",
  ],
  negative: [
    "슬픔",
    "우울",
    "불안",
    "피로",
    "고통",
    "무기력",
    "스트레스",
    "외로움",
    "좌절",
    "후회",
    "짜증",
    "실망",
    "두려움",
    "공포",
  ],
  peaceful: ["평온", "안정", "차분", "휴식", "여유"],
  complex: ["애증", "미련", "혼란", "갈등", "집착", "공허", "질투", "분노"],
};

// ✅ 카테고리별 톤 팔레트
const tonePalettes = {
  positive: [
    "#FFD6E8",
    "#FFE3EF",
    "#FFF1F5",
    "#FFE3BA",
    "#FFEABF",
    "#FFCCDA",
    "#FFF6F9",
  ],
  negative: [
    "#AFCBFF",
    "#B2A4FF",
    "#C7B8FF",
    "#BBD6EC",
    "#B5C7E7",
    "#C8BBEF",
    "#D4C1EC",
  ],
  peaceful: ["#A1D6B2", "#CFF5E7", "#D4F1D4", "#DEFBE6", "#C9F9F1", "#D7FBE8"],
  complex: [
    "#FFE099",
    "#FFE27A",
    "#FFE4C9",
    "#FBE4B4",
    "#FFE1B3",
    "#D5D1E6",
    "#D1A5BC",
  ],
};

// ✅ 최종 색상 반환 함수
export const getEmotionColor = (emotion) => {
  if (emotionColors[emotion]) return emotionColors[emotion];

  for (const [category, keywords] of Object.entries(emotionCategoryMap)) {
    if (keywords.some((keyword) => emotion.includes(keyword))) {
      const idx = keywords.findIndex((k) => emotion.includes(k));
      const palette = tonePalettes[category];
      return palette[idx % palette.length];
    }
  }

  return "#ccc"; // fallback
};
