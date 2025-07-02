// 📍 src/lib/openai.js

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
            content: `
너는 ‘Mori’라는 감정 기반 AI 다이어리 앱의 요약 도우미야.

사용자가 작성한 하루 일기를 3~4줄로 간결하게 요약해줘.
요약은 다음 규칙을 따라야 해:

1. 핵심 활동, 사건, 감정 중심으로 요약
2. 따뜻하고 공감되는 말투로 표현
3. 요약 후, 간단한 감정 피드백이나 응원 메시지를 덧붙여줘
4. 마지막에 사용자의 전반적인 감정을 한 단어로 분석해줘

⚠️ 반드시 아래 출력 형식을 그대로 따를 것:
📘 요약: [내용]
💬 피드백: [내용]
❤️ 감정: [감정 단어] (예: 행복, 우울, 불안, 분노, 평온 등)
            `.trim(),
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
    const summaryMatch = content.match(/📘 요약:\s*(.+)/);
    const feedbackMatch = content.match(/💬 피드백:\s*(.+)/);
    const emotionMatch = content.match(/❤️ 감정:\s*(.+)/);

    return {
      summary: summaryMatch ? summaryMatch[1].trim() : null,
      feedback: feedbackMatch ? feedbackMatch[1].trim() : null,
      emotion: emotionMatch ? emotionMatch[1].trim() : null,
      raw: content, // 디버깅 및 예외 대비 원본 포함
    };
  } catch (error) {
    console.error("🔥 예외 발생:", error);
    throw error;
  }
}
