import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/authContext";
import RequireAuth from "./components/RequireAuth";
import { TransactionContextProvider } from "./context/transactionContext";
import { useEffect } from "react";
import AddTransaction from "./pages/AddTransaction";

function App() {
  const { saveToken } = useAuthContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    saveToken(token);
  }, []);

  return (
    <div className="min-h-screen bg-slate-200">
      <AuthProvider>
        <TransactionContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/add-transaction" element={<AddTransaction />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </TransactionContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
