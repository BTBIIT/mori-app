// 📍 src/pages/DiaryWrite.jsx (버튼 테두리만 상태 변화, textarea 테두리 고정)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { summarizeWithGPT } from "../lib/openai";
import { extractSection } from "../lib/extractSection";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import LoadingDonut from "../components/LoadingDonut";

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
      const summary = extractSection(gptResponse.raw, "📘");
      const feedback = extractSection(gptResponse.raw, "💬");
      const emotionText = extractSection(gptResponse.raw, "❤️");
      const parsedEmotions = parseEmotionPercentages(emotionText);

      const { error } = await supabase.from("summaries").insert([
        {
          user_id: user?.id,
          date: new Date().toISOString().slice(0, 10),
          content: diaryText,
          summary,
          feedback,
          emotion: emotionText,
          actions: gptResponse.actions,
          month_summary: false,
        },
      ]);

      if (error) {
        console.error("❌ Supabase 저장 실패:", error);
        alert("저장 중 오류가 발생했습니다.");
        return;
      }

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
      <div className="min-h-screen bg-[#A1D6B2] flex flex-col">
        <div className="pt-6 pl-6">
          <img src="/logo192.png" alt="Mori 로고" className="w-10 h-10" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <LoadingDonut
            textLines={[
              "모리가 일기를 요약 중이에요.",
              "잠시 후 결과를 보여드릴게요.",
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-[#A1D6B2] flex justify-center items-center px-4 py-12 overflow-x-hidden relative">
      <img
        src="/logo192.png"
        alt="Mori Logo"
        className="w-12 h-12 mb-4 self-start cursor-pointer absolute top-6 left-6"
        onClick={() => navigate(-1)}
      />

      <div className="w-full max-w-[960px] mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-4 text-center">오늘의 일기</h2>
        <textarea
          className="w-full min-h-[14rem] sm:min-h-[16rem] md:min-h-[20rem] p-4 bg-white rounded-xl border border-gray-200 resize-none text-base placeholder-gray-400 focus:outline-none"
          placeholder="오늘 하루 어땠는지 자유롭게 적어주세요 :)"
          value={diaryText}
          onChange={(e) => setDiaryText(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-[#A1D6B2] text-white font-bold py-3 rounded-full mt-6 shadow-md border-2 border-[#A1D6B2] hover:border-[#00A0FF] active:border-[#C79E5B] transition-colors duration-200"
        >
          모리 요약하기
        </button>
      </div>
    </div>
  );
};

export default DiaryWrite;
