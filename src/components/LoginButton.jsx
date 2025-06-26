import { supabase } from "../lib/supabase";

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("로그인 오류:", error);
  };

  return <button onClick={handleLogin}>Google로 로그인</button>;
}
