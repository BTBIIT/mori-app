import { supabase } from "../lib/supabase";

export default function LoginButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <button
      onClick={handleLogin}
      className="p-0 m-0 border-2 rounded-lg transition bg-transparent"
      style={{ borderColor: "transparent" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#00A0FF";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.borderColor = "#E8B86D";
        e.currentTarget.style.backgroundColor = "#FFF7E0";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.borderColor = "#00A0FF";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <img
        src="/google-login-btn.png"
        alt="Google 로그인"
        className="w-[175px] h-auto"
        style={{
          display: "block",
          margin: "-1px", // 살짝 압축해줌
        }}
      />
    </button>
  );
}
