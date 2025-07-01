// 📍 src/lib/openai.js

// 💡 OpenAI API를 통해 일기 요약 및 감정 피드백을 수행하는 함수
export async function summarizeWithGPT(inputText) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // ✅ 디버깅 로그: API 키 존재 여부 및 사용자 입력 확인
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
2. 너무 건조하지 않게, 사용자의 감정을 감지해 따뜻한 말투로 표현
3. 요약 후, 간단한 감정 피드백이나 위로, 응원 메시지를 덧붙여줘
4. 존댓말은 사용하지 않아도 되고, 편안한 말투로 대화하듯 말해줘

예시 출력 형식:
📘 요약: 오늘 하루 대부분을 회사에서 보내며 업무에 집중했어. 점심엔 짧게 산책하며 머리를 식혔고, 오후엔 회의로 다소 지쳤어. 저녁엔 음악 들으며 마음을 안정시켰어.

💬 피드백: 오늘도 꽤 고단했겠다. 그래도 자기만의 회복 루틴이 있다는 게 정말 다행이야. 내일은 조금 더 가벼운 하루가 되길 바랄게.
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

    // ✅ 디버깅 로그: 응답 상태 코드 확인
    console.log("🔁 응답 상태 코드:", response.status);

    if (!response.ok) {
      const errorText = await response.text(); // 상세 에러 확인
      console.error("❌ 요청 실패 상세:", errorText);
      throw new Error("OpenAI 요청 실패");
    }

    const data = await response.json();
    console.log("✅ 응답 데이터:", data);

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("🔥 예외 발생:", error);
    throw error;
  }
}
