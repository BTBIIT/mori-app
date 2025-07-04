import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";

const ResultDaily = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const emotions = state?.emotions || {};
  const feedback = state?.feedback || "분석된 피드백이 없습니다.";
  const actions = state?.actions || [];
  const summary = state?.summary || "";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-2">📘 오늘의 요약</h2>
      <p className="text-gray-700 text-sm bg-white rounded-xl p-4 shadow">
        {summary}
      </p>

      <h2 className="text-xl font-semibold mt-6">❤️ 감정 분석</h2>
      <EmotionChart data={emotions} />

      <div className="bg-green-50 p-4 rounded-xl shadow text-gray-800 text-sm">
        <h3 className="font-semibold mb-1">💬 모리의 한마디</h3>
        <p>{feedback}</p>
      </div>

      {actions.length > 0 && (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-2">📝 모리의 행동 추천</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {actions.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 w-full bg-[#A1D6B2] hover:bg-[#8ecfa7] text-white font-semibold py-2 rounded-lg shadow"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ResultDaily;
