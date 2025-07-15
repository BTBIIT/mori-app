// 📍 위치: src/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView.jsx";
import DiaryWrite from "./pages/DiaryWrite";
import WriteWelcome from "./pages/WriteWelcome";

// ✅ 테스트용 도넛 확인 페이지
import TestLoading from "./pages/TestLoading.jsx";
// ✅ 월간 요약 결과 페이지
import ResultMonthly from "./pages/ResultMonthly.jsx";
// ✅ 일간 요약 결과 페이지 (추가!)
import ResultDaily from "./pages/ResultDaily.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendarview"
          element={
            <PrivateRoute>
              <CalendarView />
            </PrivateRoute>
          }
        />
        <Route
          path="/diarywrite"
          element={
            <PrivateRoute>
              <DiaryWrite />
            </PrivateRoute>
          }
        />
        <Route
          path="/write-welcome"
          element={
            <PrivateRoute>
              <WriteWelcome />
            </PrivateRoute>
          }
        />
        {/* ✅ 테스트용 도넛 로딩 화면 */}
        <Route path="/test-loading" element={<TestLoading />} />

        {/* ✅ 월간 요약 결과 페이지 */}
        <Route
          path="/result-monthly"
          element={
            <PrivateRoute>
              <ResultMonthly />
            </PrivateRoute>
          }
        />

        {/* ✅ 일간 요약 결과 페이지 */}
        <Route
          path="/result-daily"
          element={
            <PrivateRoute>
              <ResultDaily />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
