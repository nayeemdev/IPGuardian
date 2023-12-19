import { Routes, Route } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Login from "pages/login";
import Register from "pages/register";
import Home from "pages/home";
import NotFoundPage from "pages/404";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
