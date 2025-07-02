import { useState } from "react";
import { summarizeWithGPT } from "../lib/openai";
import { useAuthContext } from "../lib/AuthContext";
import { saveSummary } from "../lib/summaryApi";

function Summary() {
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState(null); // ✅ null로 초기화
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const result = await summarizeWithGPT(input);
      console.log("✅ GPT 응답:", result);

      // ✅ 응답이 문자열이 아니라 객체일 경우: result.raw 사용
      const rawText = typeof result === "string" ? result : result.raw;

      const extracted = {
        summary: extractSection(rawText, "📘 요약:"),
        feedback: extractSection(rawText, "💬 피드백:"),
        emotion: extractSection(rawText, "❤️ 감정:"),
        raw: rawText,
      };

      setSummary(extracted); // ✅ 객체 저장

      await saveSummary({
        user_id: user.id,
        date: new Date().toISOString().slice(0, 10),
        content: input,
        ...extracted, // summary, feedback, emotion 포함됨
      });
    } catch (e) {
      console.error("요약 요청 중 오류 발생:", e);
      setError("요약 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const extractSection = (text, marker) => {
    if (typeof text !== "string") return ""; // ✅ 안전 장치
    const match = text.match(
      new RegExp(`${marker}\\s*(.*?)\\s*(?=(📘|💬|❤️|$))`, "s")
    );
    return match ? match[1].trim() : "";
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
        {loading ? "요약 중..." : "요약하고 저장"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <h3 className="font-semibold mb-2">요약 결과</h3>
          <p>📘 요약: {summary.summary}</p>
          <p>💬 피드백: {summary.feedback}</p>
          <p>❤️ 감정: {summary.emotion}</p>
        </div>
      )}
    </div>
  );
}

export default Summary;
