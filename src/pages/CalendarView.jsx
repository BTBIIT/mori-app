import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/useAuth";
import {
  getSummariesByMonth,
  getSummariesByDate,
  deleteSummary,
} from "../lib/summaryApi";
import { useNavigate } from "react-router-dom";

export default function CalendarView() {
  const { user } = useAuth();
  const [summaryDates, setSummaryDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [summariesForSelectedDate, setSummariesForSelectedDate] = useState([]);
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [showYearModal, setShowYearModal] = useState(false);
  const navigate = useNavigate();

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

  const closeModal = () => {
    setSelectedDate(null);
  };

  const handleView = (summaryId) => {
    navigate(`/result-daily?id=${summaryId}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-8 px-2"
      style={{ backgroundColor: "#A1D6B2" }}
    >
      <img
        src="/logo192.png"
        alt="logo"
        className="w-10 h-10 absolute top-4 left-4 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth}>◀</button>
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
          <button onClick={handleNextMonth}>▶</button>
        </div>

        <div
          className="grid grid-cols-7 text-center mb-2 font-semibold text-sm sm:text-base md:text-lg"
          style={{ color: "#A1D6B2" }}
        >
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day}>{day}</div>
          ))}
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
          onClick={() => navigate("/result-monthly")}
        >
          이번 달 요약 하기
        </button>
      </div>

      {showYearModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowYearModal(false)}
        >
          <div
            className="bg-white rounded-xl p-4 max-h-80 overflow-y-auto scroll-smooth w-40"
            onClick={(e) => e.stopPropagation()}
            style={{
              scrollbarColor: "#E8B86D #ffffff",
              scrollbarWidth: "thin",
            }}
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
      )}

      {selectedDate && (
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
                  backgroundColor: "#FFFFFF",
                  maxHeight: "200px",
                  scrollbarColor: "#E8B86D #f0f0f0",
                }}
              >
                <p>{entry.content}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded border text-sm"
                    style={{
                      backgroundColor: "#E8B86D",
                      borderColor: "#00A0FF",
                    }}
                    onClick={() => handleView(entry.id)}
                  >
                    열람하기
                  </button>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
