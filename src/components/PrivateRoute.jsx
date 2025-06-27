// src/components/PrivateRoute.jsx
// 로그인 여부에 따라 페이지 접근을 제어하는 PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../lib/AuthContext.jsx";

function PrivateRoute({ children }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    // 아직 로그인 여부 판단 중일 때는 로딩 메세지 출력
    return <p className="p-8">로딩 중...</p>;
  }

  if (!user) {
    // 로그인 안 되어 있으면 /login으로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return children; // !user가 아닌 user라면 자식 컴포넌트 렌더링(접근 허용)
}

export default PrivateRoute;
