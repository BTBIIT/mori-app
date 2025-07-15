// 📁 src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#A1D6B2] flex flex-col items-center justify-center relative w-screen overflow-x-hidden">
      {/* 야자수 로고 - 로그아웃 트리거 */}
      <img
        src="/logo192.png"
        alt="로고"
        className="w-12 h-12 absolute top-4 left-4 md:top-6 md:left-6 cursor-pointer"
        onClick={handleLogout}
      />

      {/* 중앙 카드 영역 */}
      <div
        className="bg-white rounded-2xl shadow-lg px-6 py-12 text-center w-[90%] sm:w-[85%] max-w-md cursor-pointer transition-transform hover:scale-[1.01]"
        onClick={() => navigate("/write-welcome")}
      >
        <p className="text-xl font-semibold mb-4 break-words">
          {user?.email ?? "User"} 님!
        </p>
        <p className="text-base font-medium leading-relaxed text-gray-700">
          오늘 하루도 수고 많았어요.
          <br />
          오늘의 일기를 적어 주시면
          <br />
          모리가 요약해드릴게요.
        </p>
      </div>
    </div>
  );
}
