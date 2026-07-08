import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AIAnalysis from "./pages/AIAnalysis";
import Report from "./pages/Report";
import ManageReviews from "./pages/ManageReviews";
import ForgotPassword from "./pages/ForgotPassword";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthSuccess from "./pages/AuthSuccess";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/analysis" element={<ProtectedRoute><AIAnalysis /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reviews" element={<ProtectedRoute><ManageReviews /></ProtectedRoute>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;