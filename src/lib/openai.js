import { DAILY_SUMMARY_PROMPT } from "./prompts";

// 💡 OpenAI API를 통해 일기 요약 및 감정 분석을 수행하는 함수
export async function summarizeWithGPT(inputText) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  console.log("📨 요청 보낼 내용:", inputText);

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
          {
            role: "system",
            content: DAILY_SUMMARY_PROMPT,
          },
          {
            role: "user",
            content: inputText,
          },
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

    // ✅ 응답 파싱
    const summaryMatch = content.match(/📘 요약:\s*(.*)/);
    const feedbackMatch = content.match(/💬 피드백:\s*(.*)/);
    const emotionMatch = content.match(/❤️ 감정:\s*(.*)/);
    const actionBlock = content.match(/📝 행동 추천:\s*([\s\S]*)/); // 줄바꿈 포함 전체 블록

    // ✅ 행동 추천 항목 추출 (줄바꿈 또는 목록 형식 구분)
    const actions = actionBlock
      ? actionBlock[1]
          .split(/\n|[-•▪️‣]/) // 줄바꿈 또는 목록 구분자
          .map((s) => s.trim())
          .filter((s) => s.length > 1)
      : [];

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : null,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
      emotion: emotionMatch ? emotionMatch[1].trim() : null,
      actions,
      raw: content,
    };
  } catch (error) {
    console.error("🔥 예외 발생:", error);
    throw error;
  }
}
