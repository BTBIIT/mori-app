// src/lib/AuthContext.js
// 로그인 상태를 전역에서 공유하기 위한 Context Provider

import { createContext, useContext } from "react";
import { useAuth } from "./useAuth";

const AuthContext = createContext(null); // 전역 로그인 상태를 담을 context 생성

export function AuthProvider({ children }) {
  //useAuth() 훅을 전역에서 사용할 수 있도록 Provider로 감쌈
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  // 하위 컴포넌트에서 로그인 상태에 접근할 수 있는 헬퍼 훅
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext는 <AuthProvider> 내부에서만 사용해야 합니다."
    );
  }
  return context;
}
