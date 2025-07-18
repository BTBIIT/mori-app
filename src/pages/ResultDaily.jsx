// 📍 src/pages/ResultDaily.jsx (홈 버튼 테두리 색상 상태 반응 적용, 크기 변화 제거, 로고 뒤로가기 기능 적용)

import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";
import { getSummaryById } from "../lib/summaryApi";

const parseEmotionPercentages = (text) => {
  const emotionRegex = /([\uAC00-\uD7AF]+)\s?(\d+(?:\.\d+)?)%/g;
  const result = {};
  let match;
  while ((match = emotionRegex.exec(text)) !== null) {
    const [_, emotion, percent] = match;
    result[emotion] = parseFloat(percent);
  }
  return result;
};

const ResultDaily = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (state?.summary || state?.feedback || state?.emotions) {
      setData({
        summary: state.summary,
        feedback: state.feedback,
        emotions: state.emotions,
        actions: state.actions || [],
      });
    } else if (id) {
      getSummaryById(id).then((res) => {
        if (res) {
          const parsedEmotions =
            typeof res.emotion === "string"
              ? parseEmotionPercentages(res.emotion)
              : res.emotion;
          setData({
            summary: res.summary,
            feedback: res.feedback,
            emotions: parsedEmotions,
            actions: res.actions || [],
          });
        } else {
          setData({});
        }
      });
    } else {
      setData({});
    }
  }, [state, searchParams]);

  if (!data) return null;
  const { summary, feedback, emotions, actions } = data;
  const sortedEmotions = Array.isArray(emotions)
    ? emotions
    : Object.entries(emotions || {}).sort((a, b) =>
        a[1] !== b[1] ? b[1] - a[1] : a[0].localeCompare(b[0], "ko")
      );

  return (
    <div className="min-h-screen w-screen bg-[#A1D6B2] px-4 py-8 flex justify-center overflow-x-hidden relative">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-6">
        <img
          src="/logo192.png"
          alt="Mori Logo"
          className="w-12 h-12 mb-2 cursor-pointer absolute top-6 left-6"
          onClick={() => navigate(-1)}
        />

        <h2 className="text-2xl font-semibold">📘 오늘의 요약</h2>
        <p className="text-gray-700 text-sm bg-white rounded-xl p-4 shadow whitespace-pre-line">
          {summary || "(데이터 없음)"}
        </p>

        <h2 className="text-xl font-semibold mt-6">❤️ 감정 분석</h2>
        {sortedEmotions.length > 0 ? (
          <EmotionChart data={sortedEmotions} />
        ) : (
          <p className="text-sm text-gray-500">(내용 없음)</p>
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
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-[#A1D6B2] text-white font-semibold py-2 rounded-lg shadow-md border-2 border-[#A1D6B2] hover:border-[#00A0FF] active:border-[#E8B86D] transition-colors duration-200"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default ResultDaily;
