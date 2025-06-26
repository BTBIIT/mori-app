import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 현재 로그인된 유저 가져오기
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // 실시간 로그인 상태 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Mori</h1>

      {user ? (
        <div>
          <p className="mb-4">환영합니다, {user.email}님!</p>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}

export default App;
