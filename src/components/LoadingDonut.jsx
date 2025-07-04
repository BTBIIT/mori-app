import React from "react";

const LoadingDonut = ({ text = "로딩 중입니다..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
        {/* 회전하는 그라데이션 도넛 */}
        <div
          className="absolute inset-0 rounded-full animate-spin-slow z-0"
          style={{
            background: "conic-gradient(#A1D6B2, #E8B86D, #A1D6B2)",
            maskImage:
              "radial-gradient(closest-side, transparent 60%, black 61%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent 60%, black 61%)",
          }}
        />

        {/* 도넛 중앙 텍스트 */}
        <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-4 text-sm sm:text-base font-medium text-gray-700 leading-snug">
          {text}
        </div>
      </div>
    </div>
  );
};

export default LoadingDonut;
