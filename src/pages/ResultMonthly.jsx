import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmotionChart from "../components/EmotionChart";

const ResultMonthly = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 테스트용 더미 데이터
  const emotions = state?.emotions || {
    슬픔: 60.2,
    기쁨: 18.5,
    아픔: 14.1,
    집착: 7.2,
  };

  const feedback =
    state?.feedback ||
    "이번 달은 감정 기복이 컸던 한 달이었어요. 자신을 돌보는 시간이 필요해 보여요.";
  const actions = state?.actions || [
    "산책을 자주 해보세요.",
    "명상이나 글쓰기로 감정을 정리해보세요.",
    "누군가에게 감정을 털어놓는 것도 좋아요.",
  ];
  const summary =
    state?.summary ||
    "이번 달은 전반적으로 감정의 파동이 컸고, 내면적으로 많은 생각이 있었던 한 달이었습니다.";

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">📘 이번 달 요약</h2>
      <p className="bg-white text-sm p-4 rounded-xl shadow text-gray-800">
        {summary}
      </p>

      <h2 className="text-xl font-semibold">❤️ 감정 분석</h2>
      <EmotionChart data={emotions} />

      <div className="bg-green-50 p-4 rounded-xl shadow text-gray-800 text-sm">
        <h3 className="font-semibold mb-1">💬 모리의 한마디</h3>
        <p>{feedback}</p>
      </div>

      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-2">📝 모리의 행동 추천</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {actions.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>

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
