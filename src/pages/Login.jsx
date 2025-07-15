// 📁 src/pages/Login.jsx

import React from "react";
import LoginButton from "../components/LoginButton";

export default function Login() {
  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center relative"
      style={{ backgroundColor: "#A1D6B2" }}
    >
      {/* 상단 로고 */}
      <img
        src="/logo192.png"
        alt="로고"
        className="w-12 h-12 absolute top-6 left-6"
      />

      {/* 타이틀 */}
      <h1 className="text-5xl sm:text-6xl font-bold mb-2 text-[#E8B86D] tracking-widest">
        M O R I
      </h1>

      {/* 부제 */}
      <p className="text-[#E8B86D] mb-12 text-center text-base sm:text-lg">
        당신의 하루를 AI로 정리하다
      </p>

      {/* Google 로그인 */}
      <LoginButton />
    </div>
  );
}
