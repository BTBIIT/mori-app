// 📍 위치: src/App.jsx

import { AuthProvider } from "./lib/AuthContext.jsx";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
