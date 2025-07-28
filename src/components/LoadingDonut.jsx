import React from "react";

const LoadingDonut = ({ text = null, textLines = [] }) => {
  return (
    <div className="bg-white rounded-2xl py-16 px-6 shadow-lg w-[92%] max-w-[500px] min-h-[80vh] flex flex-col items-center justify-center">
      {/* 도넛 */}
      <div className="relative w-[60vw] max-w-[320px] aspect-square">
        <div
          className="absolute inset-0 rounded-full animate-spin-slow z-0"
          style={{
            background: "conic-gradient(#A1D6B2, #C79E5B, #A1D6B2)",
            maskImage:
              "radial-gradient(closest-side, transparent 60%, black 61%)",
            WebkitMaskImage:
              "radial-gradient(closest-side, transparent 60%, black 61%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-3">
          <div className="text-[10px] sm:text-xs md:text-sm leading-[1.2] text-gray-700 font-medium translate-y-[-4px]">
            {textLines.length > 0 ? (
              textLines.map((line, i) => <div key={i}>{line}</div>)
            ) : (
              <div>{text}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDonut;
