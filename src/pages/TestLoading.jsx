import React from "react";
import LoadingDonut from "../components/LoadingDonut";

const TestLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingDonut text="테스트 중입니다. 도넛 돌아가나 봐요!" />
    </div>
  );
};

export default TestLoading;
