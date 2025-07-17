// 📍 src/lib/summaryApi.js
import { data } from "autoprefixer";
import { supabase } from "./supabase";

/**
 * 📘 해당 월의 요약 일자 조회 (정확한 날짜 범위로 개선)
 */
export async function getSummariesByMonth(userId, year, month) {
  const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    lastDay
  ).padStart(2, "0")}`;

  console.log("📦 fetch from:", start, "~", end);
  console.log("👤 userId used:", userId);

  const { data, error } = await supabase
    .from("summaries")
    .select("date, user_id")
    .gte("date", start)
    .lte("date", end);

  if (error) {
    console.error("❌ Error fetching summaries:", error);
    return [];
  }

  const filtered = data.filter((item) => item.user_id === userId);
  console.log("✅ filtered entries:", filtered);

  return filtered.map((entry) => entry.date);
}

/**
 * 💾 요약 결과 저장
 */
export async function saveSummary({
  user_id,
  date,
  content,
  summary,
  feedback,
  emotion,
  actions,
  month_summary,
}) {
  const { data, error } = await supabase.from("summaries").insert([
    {
      user_id,
      date,
      content,
      summary,
      feedback,
      emotion,
      actions,
      month_summary,
    },
  ]);

  if (error) {
    console.error("❌ Supabase 저장 오류:", error.message);
    throw error;
  }

  return data;
}

/**
 * 📄 특정 날짜의 모든 요약 조회
 */
export async function getSummariesByDate(userId, date) {
  const { data, error } = await supabase
    .from("summaries")
    .select("id, content, summary, feedback, emotion, actions, date")
    .eq("user_id", userId)
    .eq("date", date);

  if (error) {
    console.error("❌ Error fetching summaries by date:", error);
    return [];
  }

  return data;
}

/**
 * 🗑 특정 요약 삭제
 */
export async function deleteSummary(id) {
  const { error } = await supabase.from("summaries").delete().eq("id", id);
  if (error) {
    console.error("❌ 삭제 오류:", error);
    throw error;
  }
}

/**
 * ✏️ 특정 요약 수정
 */
export async function updateSummary(id, updatedData) {
  const { error } = await supabase
    .from("summaries")
    .update(updatedData)
    .eq("id", id);
  console.log("✅ update result:", data, error);

  if (error) {
    console.error("❌ 수정 오류:", error);
    throw error;
  }
  return data;
}

// 📄 특정 ID의 요약 하나만 조회
export async function getSummaryById(id) {
  const { data, error } = await supabase
    .from("summaries")
    .select("id, content, summary, feedback, emotion, actions, date")
    .eq("id", id)
    .single();

  if (error) {
    console.error("❌ ID로 요약 조회 오류:", error);
    return null;
  }

  return data;
}
