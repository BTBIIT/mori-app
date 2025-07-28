// 📍 src/lib/ensureUserProfile.js
// ## 해당 파일은 필요한 파일이 아닙니다. 현재 이슈 테스트로 인해 만들어진 파일로 추후 테스트 후 필요하지 않으면 지우겠습니다.
import { supabase } from "./supabase";

/**
 * 구글 로그인된 사용자가 Supabase에 존재하는지 확인하고, 없다면 user_profiles 테이블에 추가 -> 트리거 수정으로 필요없어졌으나 나중에 테스트 후 파일을 지우겟음.
 */
export async function ensureUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("❌ 사용자 정보를 가져올 수 없습니다:", userError?.message);
    return;
  }

  // user_profiles에 이미 등록되어 있는지 확인
  const { data: existing, error: selectError } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  // 다른 종류의 오류는 출력
  if (selectError && selectError.code !== "PGRST116") {
    console.error("❌ user_profiles 조회 오류:", selectError.message);
    return;
  }

  // 없으면 새로 삽입
  if (!existing) {
    const { error: insertError } = await supabase.from("user_profiles").insert([
      {
        id: user.id,
        email: user.email,
      },
    ]);

    if (insertError) {
      console.error("❌ user_profiles 등록 실패:", insertError.message);
    } else {
    }
  }
}
