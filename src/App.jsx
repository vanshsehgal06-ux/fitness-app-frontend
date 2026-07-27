import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /> </PublicRoute>} />
      <Route path="/dashboard"  element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>

    </Routes>
  );
}

export default App;