// 📁 src/pages/WriteWelcome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { getSummariesByDate } from "../lib/summaryApi";

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

export default function WriteWelcome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todaySummaries, setTodaySummaries] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchTodaySummaries = async () => {
      if (user?.id) {
        const result = await getSummariesByDate(user.id, today);
        setTodaySummaries(result);
      }
    };
    fetchTodaySummaries();
  }, [user]);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#A1D6B2] flex flex-col items-center justify-center px-4 py-8">
      <img
        src="/logo192.png"
        alt="로고"
        className="w-12 h-12 absolute top-4 left-4 cursor-pointer"
        onClick={() => navigate("/login")}
      />

      <div className="bg-white rounded-2xl shadow-lg px-6 py-12 text-center w-[90%] sm:w-[85%] max-w-md">
        <p className="text-xl font-semibold mb-6 break-words">
          {user?.email ?? "User"} 님!
        </p>

        {todaySummaries.length > 0 ? (
          <div className="space-y-6">
            {todaySummaries.map((summary, idx) => {
              const parsedEmotions = parseEmotionPercentages(summary.emotion);
              return (
                <div
                  key={summary.id}
                  className="bg-gradient-to-br from-[#E6F4EA] to-[#D3ECD8] rounded-2xl px-6 py-4 shadow-sm text-left space-y-2 cursor-pointer transition hover:scale-[1.01]"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === idx ? null : idx)
                  }
                >
                  <p className="text-sm text-[#3D6A50] font-semibold tracking-wide">
                    {`${idx + 1}번째 작성된 일기`}
                  </p>

                  {expandedIndex === idx && (
                    <div className="mt-2">
                      <p className="text-xs text-[#5C8C6A] mb-1">오늘의 요약</p>
                      <p className="text-sm text-[#2F4F3D] leading-relaxed whitespace-pre-line">
                        {summary.summary}
                      </p>
                      <div className="flex justify-end mt-2">
                        <button
                          className="text-sm px-4 py-1 rounded-full border-2 border-transparent bg-[#A1D6B2] text-black font-semibold hover:border-[#00A0FF] active:border-[#E8B86D]"
                          onClick={() =>
                            navigate("/result-daily", {
                              state: {
                                summary: summary.summary,
                                feedback: summary.feedback,
                                emotions: parsedEmotions,
                                actions: summary.actions || [],
                              },
                            })
                          }
                        >
                          열람하기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* + 로고 적용 / button 사용하지 않고 파란 테두리 제거 */}
            <div className="mt-4">
              <img
                src="/MoriPlus.svg"
                alt="일기 추가"
                className="w-28 h-28 mx-auto my-4 cursor-pointer transition hover:scale-105 active:scale-95"
                onClick={() => navigate("/diarywrite")}
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-base font-medium leading-relaxed text-gray-700">
              현재 적혀있는 일기가 존재하지 않아요.
            </p>
            <div className="flex justify-center mt-4">
              <img
                src="/MoriPlus.svg"
                alt="일기 추가"
                className="w-28 h-28 object-contain block"
                onClick={() => navigate("/diarywrite")}
              />
            </div>
          </>
        )}

        <button
          onClick={() => navigate("/calendarview")}
          className="mt-6 text-black font-semibold py-2 px-6 rounded-full border-2 border-transparent transition"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00A0FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.backgroundColor = "#A1D6B2";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderColor = "#E8B86D";
            e.currentTarget.style.backgroundColor = "#FFF7E0";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderColor = "#00A0FF";
            e.currentTarget.style.backgroundColor = "#A1D6B2";
          }}
          style={{ backgroundColor: "#A1D6B2" }}
        >
          기존 일기 보러 가기
        </button>
      </div>
    </div>
  );
}
