import React, { useState } from "react";
import LoginButton from "../components/LoginButton";

export default function Login() {
  const [agreed, setAgreed] = useState(false);

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
      <h1 className="text-5xl sm:text-6xl font-bold mb-2 text-[#C79E5B] tracking-widest">
        M O R I
      </h1>

      {/* 부제 */}
      <p className="text-[#C79E5B] mb-6 text-center text-base sm:text-lg">
        당신의 하루를 AI로 정리하다
      </p>

      {/* 개인정보 동의 문구 */}
      <label className="text-sm text-gray-700 bg-white bg-opacity-80 px-4 py-2 rounded-xl w-[85%] sm:w-[400px] text-left mb-4 shadow">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mr-2"
        />
        본인은 본 앱이 감정 기반 일기를 Supabase에 저장하며, 작성한 일기 내용이
        분석 및 보관됨에 동의합니다.
      </label>

      {/* Google 로그인 버튼 (동의해야 활성화) */}
      <div className={`${!agreed && "opacity-40 pointer-events-none"}`}>
        <LoginButton />
      </div>
    </div>
  );
}
