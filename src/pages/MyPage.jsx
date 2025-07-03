import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/useAuth";
import {
  getSummariesByMonth,
  getSummariesByDate,
  deleteSummary,
  updateSummary,
} from "../lib/summaryApi";
import { summarizeWithGPT } from "../lib/openai";

export default function MyPage() {
  const { user } = useAuth();
  const [summaryDates, setSummaryDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [summariesForSelectedDate, setSummariesForSelectedDate] = useState([]);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [showYearModal, setShowYearModal] = useState(false);
  const [editingSummaryId, setEditingSummaryId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const yearOptions = Array.from(
    { length: 30 },
    (_, i) => today.getFullYear() - 15 + i
  );

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (!user) return;
    getSummariesByMonth(user.id, currentYear, currentMonth).then((dates) => {
      const daysOnly = dates.map((d) => parseInt(d.split("-")[2]));
      setSummaryDates(daysOnly);
    });
  }, [user, currentYear, currentMonth]);

  const getCalendarDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = getDaysInMonth(prevYear, prevMonth);

    const prevDates = Array.from({ length: firstDay }, (_, i) => ({
      day: prevMonthDays - firstDay + i + 1,
      type: "prev",
    }));

    const currDates = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      type: "current",
    }));

    const nextDatesCount = (prevDates.length + currDates.length) % 7;
    const nextDates = Array.from(
      { length: nextDatesCount === 0 ? 0 : 7 - nextDatesCount },
      (_, i) => ({
        day: i + 1,
        type: "next",
      })
    );

    return [...prevDates, ...currDates, ...nextDates];
  };

  const handleDateClick = async (day, type) => {
    if (type !== "current") return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    const results = await getSummariesByDate(user.id, dateStr);
    setSummariesForSelectedDate(results);
  };

  const handleDelete = async (id) => {
    await deleteSummary(id);
    const results = await getSummariesByDate(user.id, selectedDate);
    setSummariesForSelectedDate(results);
  };

  const handleEdit = (id, content) => {
    setEditingSummaryId(id);
    setEditingContent(content);
  };

  const handleUpdate = async () => {
    const gptResponse = await summarizeWithGPT(editingContent);
    console.log("📘 GPT 응답:", gptResponse);

    try {
      await updateSummary(editingSummaryId, {
        content: editingContent,
        summary: gptResponse.summary,
        feedback: gptResponse.feedback,
        emotion: gptResponse.emotion,
      });
      console.log("✅ Supabase 업데이트 성공");

      const results = await getSummariesByDate(user.id, selectedDate);
      setSummariesForSelectedDate(results);
    } catch (error) {
      console.error("🔥 업데이트 중 오류 발생:", error);
    }

    setEditingSummaryId(null);
    setEditingContent("");
    setSelectedDate(null);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setEditingSummaryId(null);
    setEditingContent("");
  };

  const ArrowButton = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      className="w-8 h-8 sm:w-10 sm:h-10 aspect-square p-0 rounded-full flex items-center justify-center border-2 transition focus:outline-none"
      style={{
        backgroundColor: "#A1D6B2",
        borderColor: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00A0FF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
      }}
    >
      <svg
        width="120"
        height="150"
        viewBox="0 0 100 100"
        fill="#E8B86D"
        xmlns="http://www.w3.org/2000/svg"
      >
        {direction === "left" ? (
          <polygon
            points="65,20 35,50 65,80"
            fill="#E8B86D"
            stroke="#E8B86D"
            strokeWidth="2"
            strokeLinejoin="round"
            rx="2"
          />
        ) : (
          <polygon
            points="35,20 65,50 35,80"
            fill="#E8B86D"
            stroke="#E8B86D"
            strokeWidth="2"
            strokeLinejoin="round"
            rx="2"
          />
        )}
      </svg>
    </button>
  );

  const renderYearModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={() => setShowYearModal(false)}
    >
      <div
        className="bg-white rounded-xl p-4 max-h-80 overflow-y-auto scroll-smooth w-40"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarColor: "#E8B86D #ffffff", scrollbarWidth: "thin" }}
      >
        <div
          className="text-center font-bold mb-2"
          style={{ color: "#A1D6B2" }}
        >
          연도 선택
        </div>
        {yearOptions.map((year) => (
          <div
            key={year}
            className="py-1 px-2 text-center rounded cursor-pointer hover:border hover:border-blue-500"
            style={{
              color: "#A1D6B2",
              border:
                year === currentYear
                  ? "2px solid #00A0FF"
                  : "2px solid transparent",
            }}
            onClick={() => {
              setCurrentYear(year);
              setShowYearModal(false);
            }}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSummaryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl p-4 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full"
          style={{ backgroundColor: "#A1D6B2", color: "white" }}
          onClick={closeModal}
        >
          ✕
        </button>
        <h3
          className="text-center text-lg font-bold mb-2"
          style={{ color: "#A1D6B2" }}
        >
          {selectedDate} 요약
        </h3>
        {summariesForSelectedDate.map((entry) => (
          <div
            key={entry.id}
            className="border rounded p-3 mb-2 overflow-y-auto"
            style={{
              borderColor: "#00A0FF",
              backgroundColor:
                editingSummaryId === entry.id ? "#F9F9F9" : "#FFFFFF",
              maxHeight: "200px",
              scrollbarColor: "#E8B86D #f0f0f0",
            }}
          >
            {editingSummaryId === entry.id ? (
              <>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  rows={3}
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  style={{ scrollbarColor: "#E8B86D #f0f0f0" }}
                />
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-1 rounded border"
                    style={{
                      backgroundColor: "#A1D6B2",
                      borderColor: "#00A0FF",
                    }}
                    onClick={handleUpdate}
                  >
                    저장
                  </button>
                  <button
                    className="flex-1 py-1 rounded border"
                    style={{
                      backgroundColor: "#E8B86D",
                      borderColor: "#00A0FF",
                    }}
                    onClick={() => setEditingSummaryId(null)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{entry.content}</p>
                <div className="flex justify-end gap-2 mt-2">
                  {/*
                  <button
                    className="px-3 py-1 rounded border text-sm"
                    style={{
                      backgroundColor: "#A1D6B2",
                      borderColor: "#00A0FF",
                    }}
                    onClick={() => handleEdit(entry.id, entry.content)}
                  >
                    수정
                  </button>
                  */}
                  <button
                    className="px-3 py-1 rounded border text-sm"
                    style={{
                      backgroundColor: "#E8B86D",
                      borderColor: "#00A0FF",
                    }}
                    onClick={() => handleDelete(entry.id)}
                  >
                    삭제
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-2"
      style={{ backgroundColor: "#A1D6B2" }}
    >
      <img
        src="/logo192.png"
        alt="logo"
        className="w-10 h-10 absolute top-4 left-4"
      />
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <ArrowButton direction="left" onClick={handlePrevMonth} />
          <div className="text-center">
            <div
              className="text-2xl font-bold cursor-pointer"
              style={{ color: "#A1D6B2" }}
              onClick={() => setShowYearModal(true)}
            >
              {currentYear}
            </div>
            <div style={{ color: "#A1D6B2" }} className="text-xl">
              {currentMonth + 1}월
            </div>
          </div>
          <ArrowButton direction="right" onClick={handleNextMonth} />
        </div>

        <div
          className="grid grid-cols-7 text-center mb-2 font-semibold text-sm sm:text-base md:text-lg"
          style={{ color: "#A1D6B2" }}
        >
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>

        <div className="grid grid-cols-7 gap-y-2">
          {getCalendarDates().map(({ day, type }, i) => {
            const isSummaryDay =
              type === "current" && summaryDates.includes(day);
            return (
              <div
                key={`${type}-${day}-${i}`}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer text-sm sm:text-base md:text-lg ${
                  isSummaryDay ? "bg-blue-300 text-white font-bold" : ""
                }`}
                style={{ color: type === "current" ? "#A1D6B2" : "#E8B86D" }}
                onClick={() => handleDateClick(day, type)}
              >
                {day}
              </div>
            );
          })}
        </div>

        <button
          className="mt-6 w-full text-black font-semibold py-2 px-4 rounded transition border-2 border-transparent"
          style={{ backgroundColor: "#A1D6B2" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#00A0FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          이번 달 요약 하기
        </button>
      </div>

      {showYearModal && renderYearModal()}
      {selectedDate && renderSummaryModal()}
    </div>
  );
}
