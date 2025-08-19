import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CalendarView from "./pages/CalendarView.jsx";
import DiaryWrite from "./pages/DiaryWrite";
import WriteWelcome from "./pages/WriteWelcome";
import ResultMonthly from "./pages/ResultMonthly.jsx";
import ResultDaily from "./pages/ResultDaily.jsx";

function AppRoutes() {
  return (
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
      <Route
        path="/result-monthly"
        element={
          <PrivateRoute>
            <ResultMonthly />
          </PrivateRoute>
        }
      />
      <Route
        path="/result-daily"
        element={
          <PrivateRoute>
            <ResultDaily />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
