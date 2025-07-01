// 📍 src/pages/Summary.jsx

import { useState } from "react";
import { summarizeWithGPT } from "../lib/openai";

function Summary() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // 에러 메시지 상태 추가

  const handleSubmit = async () => {
    setLoading(true);
    setError(null); // 에러 초기화
    setSummary(""); // 이전 요약 초기화

    try {
      const result = await summarizeWithGPT(input);
      setSummary(result);
    } catch (e) {
      console.error("요약 요청 중 오류 발생:", e);
      setError("요약 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">오늘의 일기 요약</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="6"
        placeholder="오늘 하루 있었던 일을 입력해보세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        disabled={loading || input.trim() === ""}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "요약 중..." : "요약하기"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">요약 결과</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summary;
