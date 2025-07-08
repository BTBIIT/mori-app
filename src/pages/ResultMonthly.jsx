// 📁 src/pages/ResultMonthly.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";
import { summarizeWithGPT } from "../lib/openai";
import { createClient } from "@supabase/supabase-js";
import LoadingDonut from "../components/LoadingDonut";

// ✅ Supabase 클라이언트 초기화
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ResultMonthly = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [actions, setActions] = useState([]);
  const [emotions, setEmotions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlySummary = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
          .toISOString()
          .slice(0, 10);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        )
          .toISOString()
          .slice(0, 10);

        // ✅ 해당 월의 일기만 가져오기
        const { data: entries, error } = await supabase
          .from("summaries")
          .select("content, date")
          .eq("user_id", user.id)
          .gte("date", startOfMonth)
          .lte("date", endOfMonth)
          .order("date", { ascending: true });

        if (error) throw error;
        if (!entries || entries.length === 0) {
          setSummary("이번 달 작성된 일기가 없습니다.");
          setLoading(false);
          return;
        }

        // ✅ 모든 content를 한 줄씩 합치기
        const allText = entries
          .map((e) => `${e.date}\n${e.content}`)
          .join("\n\n");

        // ✅ GPT 요약 요청 (monthly)
        const result = await summarizeWithGPT(allText, "monthly");

        // ✅ 상태 저장 (emotion은 이미 object 형태로 전달됨)
        setSummary(result.summary || "");
        setFeedback(result.feedback || "");
        setActions(result.actions || []);
        setEmotions(result.emotion || {});
      } catch (err) {
        console.error("🔥 월간 요약 처리 오류:", err);
        setSummary("요약 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlySummary();
  }, []);

  if (loading) {
    return (
      <div className="py-20">
        <LoadingDonut
          textLines={[
            "모리가 이번달 일기를",
            "읽고 있어요",
            "잠시 후 결과를 알려드릴게요",
          ]}
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">📘 이번 달 요약</h2>
      <p className="bg-white text-sm p-4 rounded-xl shadow text-gray-800 whitespace-pre-line">
        {summary}
      </p>

      <h2 className="text-xl font-semibold">❤️ 감정 분석</h2>
      <EmotionChart data={emotions} />

      <div className="bg-green-50 p-4 rounded-xl shadow text-gray-800 text-sm">
        <img src="/logo512.png" alt="한마디" className="w-5 h-5" />
        <h3 className="font-semibold mb-1">모리의 한마디</h3>
        <p>{feedback}</p>
      </div>

      {actions.length > 0 && (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">💡모리의 행동 추천</h3>
          </div>
          <ul className="text-sm space-y-1">
            {actions.map((a, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500">✅</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => navigate("/calendarview")}
        className="mt-6 w-full bg-[#A1D6B2] hover:bg-[#8ecfa7] text-white font-semibold py-2 rounded-lg shadow"
      >
        달력으로 돌아가기
      </button>
    </div>
  );
};

export default ResultMonthly;
