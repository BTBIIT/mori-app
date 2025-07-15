// 📁 src/pages/WriteWelcome.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";

export default function WriteWelcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const hasTodayDiary = true; // ✅ 임시 UI 조건: 오늘 일기 있음 여부
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#A1D6B2] flex flex-col items-center justify-center px-4 py-8">
      {/* 로고 클릭 시 로그아웃 처리 예정 */}
      <img
        src="/logo192.png"
        alt="로고"
        className="w-12 h-12 absolute top-4 left-4 cursor-pointer"
        onClick={() => navigate("/login")}
      />

      {/* 카드 내용 */}
      <div className="bg-white rounded-2xl shadow-lg px-6 py-12 text-center w-[90%] sm:w-[85%] max-w-md">
        <p className="text-xl font-semibold mb-6 break-words">
          {user?.email ?? "User"} 님!
        </p>

        {hasTodayDiary ? (
          <div className="space-y-6">
            {/* 오늘 작성된 일기 항목 */}
            <div
              className="bg-gradient-to-br from-[#E6F4EA] to-[#D3ECD8] rounded-2xl px-6 py-4 shadow-sm text-left space-y-2 cursor-pointer transition hover:scale-[1.01]"
              onClick={() => setShowSummary(!showSummary)}
            >
              <p className="text-sm text-[#3D6A50] font-semibold tracking-wide">
                첫 번째 작성된 일기
              </p>

              {showSummary && (
                <div className="mt-2">
                  <p className="text-xs text-[#5C8C6A] mb-1">오늘의 요약</p>
                  <p className="text-sm text-[#2F4F3D] leading-relaxed">
                    친구들과 맛있는 음식을 먹고 카페에서 수다를 떨며 즐거운
                    시간을 보냈고, 날씨도 좋아서 하루 내내 기분이 좋았어요.
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-sm px-4 py-1 rounded-full border-2 border-transparent bg-[#A1D6B2] text-black font-semibold hover:border-[#00A0FF] active:border-[#E8B86D]"
                      onClick={() => {}}
                    >
                      열람하기
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ 일기 추가 버튼 */}
            <div className="mt-4">
              <img
                src="/plus-icon.png"
                alt="일기 추가"
                className="w-12 h-12 mx-auto my-4 cursor-pointer"
                onClick={() => navigate("/diarywrite")}
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-base font-medium leading-relaxed text-gray-700">
              현재 적혀있는 일기가 존재하지 않아요.
            </p>
            <img
              src="/plus-icon.png"
              alt="작성하기"
              className="w-12 h-12 mx-auto my-6 cursor-pointer"
              onClick={() => navigate("/diarywrite")}
            />
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
