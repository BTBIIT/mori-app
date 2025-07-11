// 📁 src/lib/openai.js

import { DAILY_SUMMARY_PROMPT, MONTHLY_SUMMARY_PROMPT } from "./prompts";

// ✅ 월간 감정 분포 문자열 → {감정: 퍼센트} 형태로 파싱
function parseEmotionLine(line) {
  const result = {};
  const chunks = line.split(/,|\n/); // 쉼표 또는 줄바꿈 기준으로 자름

  for (let chunk of chunks) {
    const match = chunk.match(/([가-힣]+)[\s:：-]*(\d+(\.\d+)?)/);
    if (match) {
      const emotion = match[1].trim();
      const value = parseFloat(match[2]);
      result[emotion] = value;
    }
  }

  return result;
}

// Refactoring -> sorting graph
function sortEmotionObject(emotionObj) {
  return Object.entries(emotionObj).sort((a, b) => {
    const [emotionA, valueA] = a;
    const [emotionB, valueB] = b;

    if (valueA !== valueB) {
      return valueB - valueA; // 퍼센트 내림차순
    } else {
      return emotionA.localeCompare(emotionB, "ko"); // 한글 ㄱ~ㅎ 순
    }
  });
}

// 💡 OpenAI API를 통해 일기 요약 및 감정 분석을 수행하는 함수
export async function summarizeWithGPT(inputText, type = "daily") {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const prompt =
    type === "monthly" ? MONTHLY_SUMMARY_PROMPT : DAILY_SUMMARY_PROMPT;

  console.log("📨 GPT 요청 내용:", inputText);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: inputText },
        ],
        temperature: 0.7,
      }),
    });

    console.log("🔁 응답 상태 코드:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ 요청 실패 상세:", errorText);
      throw new Error("OpenAI 요청 실패");
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    console.log("✅ GPT 응답:", content);

    // ✅ 항목별 파싱
    const summaryMatch = content.match(/📘 요약:\s*(.*)/);
    const feedbackMatch =
      type === "monthly"
        ? content.match(/💬 월간 피드백:\s*(.*)/)
        : content.match(/💬 피드백:\s*(.*)/);

    const emotionMatch =
      type === "monthly"
        ? content.match(/📊 감정 분포 요약:\s*(.*)/)
        : content.match(/❤️ 감정:\s*(.*)/);

    const emotionRaw = emotionMatch ? emotionMatch[1].trim() : null;
    const emotionParsed =
      type === "monthly"
        ? sortEmotionObject(parseEmotionLine(emotionRaw))
        : emotionRaw;

    const actionBlock =
      type === "monthly"
        ? content.match(/✅ 추천 행동:\s*([\s\S]*)/)
        : content.match(/📝 행동 추천:\s*([\s\S]*)/);

    const actions = actionBlock
      ? actionBlock[1]
          .split(/\n|[-•▪️‣]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 1)
      : [];

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : null,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
      emotion: emotionParsed,
      actions,
      raw: content,
    };
  } catch (error) {
    console.error("🔥 GPT 처리 예외 발생:", error);
    throw error;
  }
}
