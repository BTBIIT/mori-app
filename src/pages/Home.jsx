// 📍 src/pages/Home.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../lib/AuthContext";
import LogoutButton from "../components/LogoutButton";
import { ensureUserProfile } from "../lib/ensureUserProfile"; // ✅ 추가

export default function Home() {
  const { user } = useAuthContext();

  // ✅ user가 로그인되어 있을 때, user_profiles에 등록 시도
  useEffect(() => {
    if (user) {
      ensureUserProfile();
    }
  }, [user]);
  console.log("👉 내 user_id:", user?.id);
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">홈 페이지</h2>
      <p className="mb-4">환영합니다, {user?.email}님</p>

      <nav className="space-y-2">
        <Link to="/mypage" className="text-blue-500 underline block">
          MyPage
        </Link>
        <Link to="/summary" className="text-blue-500 underline block">
          일기 작성
        </Link>
        <Link to="/chat" className="text-blue-500 underline block">
          Chat
        </Link>
      </nav>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
