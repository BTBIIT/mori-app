// 📁 src/lib/extractSection.js

export function extractSection(text, marker) {
  if (!text || !marker) return "";

  const regex = new RegExp(`${marker}([^📘💬❤️]*)`);
  const match = text.match(regex);

  return match ? match[1].trim() : "(데이터 없음)";
}

// GPT 응답에서 감정 퍼센트를 파싱
export function parseEmotionPercentages(text) {
  const lines = text.split(/\r?\n/);
  const result = {};

  for (let line of lines) {
    const match = line.match(/([가-힣]+)[\s:：-]*(\d+(\.\d+)?)/); // 퍼센트 없어도 숫자 추출
    if (match) {
      const emotion = match[1].trim();
      const value = parseFloat(match[2]);
      result[emotion] = value;
    }
  }

  return result;
}
