import Main from "./Main";

import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </>
  );
}
