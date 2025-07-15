// 📍 src/pages/DiaryWrite.jsx (Supabase 저장 로직 포함)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { summarizeWithGPT } from "../lib/openai";
import { extractSection } from "../lib/extractSection";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import LoadingDonut from "../components/LoadingDonut";

// 감정 퍼센트 추출 함수
const parseEmotionPercentages = (text) => {
  const emotionRegex = /([가-힣]+)\s?(\d+(?:\.\d+)?)%/g;
  const result = {};
  let match;
  while ((match = emotionRegex.exec(text)) !== null) {
    const [_, emotion, percent] = match;
    result[emotion] = parseFloat(percent);
  }
  return result;
};

const DiaryWrite = () => {
  const [diaryText, setDiaryText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!diaryText.trim()) return alert("일기를 입력해주세요.");

    setLoading(true);
    try {
      const gptResponse = await summarizeWithGPT(diaryText);
      console.log("🧪 GPT 전체 응답:", gptResponse);

      const summary = extractSection(gptResponse.raw, "📘");
      const feedback = extractSection(gptResponse.raw, "💬");
      const emotionText = extractSection(gptResponse.raw, "❤️");
      const parsedEmotions = parseEmotionPercentages(emotionText);

      // ✅ Supabase 저장 로직 추가
      const { error } = await supabase.from("summaries").insert([
        {
          user_id: user?.id,
          date: new Date().toISOString().slice(0, 10),
          content: diaryText,
          summary,
          feedback,
          emotion: emotionText, // 원문 텍스트 저장
          actions: gptResponse.actions, // string[] 타입 저장
          month_summary: false,
        },
      ]);

      if (error) {
        console.error("❌ Supabase 저장 실패:", error);
        alert("저장 중 오류가 발생했습니다.");
        return;
      }

      // ✅ 저장 성공 후 결과 페이지로 이동
      navigate("/result-daily", {
        state: {
          emotions: parsedEmotions,
          feedback,
          actions: gptResponse.actions,
          summary,
        },
      });
    } catch (err) {
      alert("요약 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingDonut text="모리가 일기를 읽고 있어요. 잠시 후 결과를 알려드릴게요." />
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">오늘의 일기</h2>
      <textarea
        className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A1D6B2] resize-none text-sm custom-scroll"
        placeholder="오늘 하루 어땠는지 적어주세요..."
        value={diaryText}
        onChange={(e) => setDiaryText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-[#A1D6B2] hover:bg-[#8ecfa7] text-white font-semibold py-2 rounded-lg shadow"
      >
        모리 요약하기
      </button>
    </div>
  );
};

export default DiaryWrite;
