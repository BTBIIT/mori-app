// 📍 src/lib/summaryApi.js
import { supabase } from "./supabase";

/**
 * 요약 결과 저장
 */
export async function saveSummary({
  user_id,
  date,
  content,
  summary,
  feedback,
  emotion,
}) {
  const { data, error } = await supabase.from("summaries").insert([
    {
      user_id,
      date,
      content,
      summary,
      feedback,
      emotion,
    },
  ]);

  if (error) {
    console.error("❌ Supabase 저장 오류:", error.message);
    throw error;
  }

  return data;
}
