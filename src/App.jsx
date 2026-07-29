import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Workout from "./pages/dashboard/Workout";
import Nutrition from "./pages/dashboard/Nutrition";
import AICoach from "./pages/dashboard/AICoach";
import Settings from "./pages/dashboard/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<PublicRoute> <Login /> </PublicRoute>}/>
      <Route path="/signup" element={<PublicRoute> <Signup /> </PublicRoute>}/>
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
      <Route path="/dashboard/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>}/>
      <Route path="/dashboard/workouts" element={ <ProtectedRoute> <Workout /> </ProtectedRoute>}/>
      <Route path="/dashboard/nutrition" element={ <ProtectedRoute> <Nutrition /> </ProtectedRoute>}/>
      <Route path="/dashboard/ai" element={ <ProtectedRoute> <AICoach /> </ProtectedRoute>}/>
      <Route path="/dashboard/settings" element={ <ProtectedRoute> <Settings /> </ProtectedRoute> }/>
    </Routes>
  );
}

export default App;