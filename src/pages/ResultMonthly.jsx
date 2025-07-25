import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";
import { summarizeWithGPT } from "../lib/openai";
import { createClient } from "@supabase/supabase-js";
import LoadingDonut from "../components/LoadingDonut";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ResultMonthly = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [actions, setActions] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMonthlySummary = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user || !isMounted) return;

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

        const { data: entries, error } = await supabase
          .from("summaries")
          .select("content, date")
          .eq("user_id", user.id)
          .gte("date", startOfMonth)
          .lte("date", endOfMonth)
          .order("date", { ascending: true });

        if (error) throw error;
        if (!entries || entries.length === 0) {
          if (isMounted) {
            setSummary("이번 달 작성된 일기가 없습니다.");
            setLoading(false);
          }
          return;
        }

        const allText = entries
          .map((e) => `${e.date}\n${e.content}`)
          .join("\n\n");

        const result = await summarizeWithGPT(allText, "monthly");

        const sortedEmotions =
          Array.isArray(result.emotion) && result.emotion.length > 0
            ? result.emotion
            : [];

        if (isMounted) {
          setSummary(result.summary || "");
          setFeedback(result.feedback || "");
          setActions(result.actions || []);
          setEmotions(sortedEmotions);
        }
      } catch (err) {
        console.error("🔥 월간 요약 처리 오류:", err);
        if (isMounted) {
          setSummary("요약 중 오류가 발생했습니다.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMonthlySummary();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#A1D6B2] flex flex-col">
        <div className="pt-6 pl-6">
          <img src="/logo192.png" alt="Mori 로고" className="w-10 h-10" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <LoadingDonut
            textLines={[
              "이번달 감정을 정리 중이에요.",
              "곧 결과를 보여드릴게요.",
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[#A1D6B2] px-4 py-8 flex justify-center overflow-x-hidden relative">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        <img
          src="/logo192.png"
          alt="Mori Logo"
          className="w-12 h-12 mb-2 cursor-pointer absolute top-6 left-6"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl font-semibold">📘 이번 달 요약</h2>
        <p className="text-gray-700 text-sm bg-white rounded-xl p-4 shadow whitespace-pre-line">
          {summary || "(데이터 없음)"}
        </p>

        <h2 className="text-xl font-semibold mt-6">❤️ 감정 분석</h2>
        {emotions.length > 0 ? (
          <EmotionChart data={emotions} />
        ) : (
          <p className="text-sm text-gray-500">(감정 분석 데이터 없음)</p>
        )}

        <div className="bg-green-50 p-4 rounded-xl shadow text-gray-800 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <img src="/logo192.png" alt="한마디" className="w-5 h-5" />
            <h3 className="font-semibold">모리의 한마디</h3>
          </div>
          <p>{feedback || "(내용 없음)"}</p>
        </div>

        {actions?.length > 0 && (
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
          className="mt-6 w-full bg-[#A1D6B2] text-white font-semibold py-2 rounded-lg shadow-md border-2 border-[#A1D6B2] hover:border-[#00A0FF] active:border-[#E8B86D] transition-colors duration-200"
        >
          달력으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultMonthly;
