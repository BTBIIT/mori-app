import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// .env 환경변수에서 가져오기
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function LogoutButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃 실패: " + error.message);
    } else {
      alert("성공적으로 로그아웃 되었습니다.");
      location.reload(); // 새로고침으로 상태 초기화
    }
  };

  if (!user) return null; // 로그인 안됐으면 안보임

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      로그아웃
    </button>
  );
}
