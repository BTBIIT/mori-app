// 📁 src/components/EmotionChart.jsx

import React from "react";
import { getEmotionColor } from "../lib/emotionColors";

const EmotionChart = ({ data }) => {
  // ✅ 배열 여부 확인 및 빈 데이터 처리
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="text-center text-gray-500">감정 분석 데이터가 없습니다.</p>
    );
  }

  return (
    <div className="space-y-4">
      {data.map(([emotion, percent]) => (
        <div key={emotion}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">{emotion}</span>
            <span className="text-xs text-gray-600">{percent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all"
              style={{
                width: `${percent}%`,
                backgroundColor: getEmotionColor(emotion),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmotionChart;
