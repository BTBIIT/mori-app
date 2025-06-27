import { Link } from "react-router-dom";
import { useAuthContext } from "../lib/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">홈 페이지</h2>
      <p className="mb-4">환영합니다, {user?.email}님</p>

      <nav className="space-y-2">
        <Link to="/mypage" className="text-blue-500 underline block">
          마이페이지
        </Link>
        <Link to="/summary" className="text-blue-500 underline block">
          요약
        </Link>
        <Link to="/chat" className="text-blue-500 underline block">
          채팅
        </Link>
      </nav>

      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
