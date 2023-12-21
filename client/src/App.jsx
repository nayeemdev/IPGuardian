import { Routes, Route } from "react-router-dom";
import Dashboard from "pages/dashboard";
import Login from "pages/Auth/login";
import Register from "pages/Auth/register";
import Home from "pages/home";
import NotFoundPage from "pages/Errors/404";
import IpAddresses from "./pages/IpAddresses";
import IpAddressCreate from "./pages/IpAddresses/create";
import IpAddressEdit from "./pages/IpAddresses/edit";
import IpAddressShow from "./pages/IpAddresses/show";

function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Ip Addresses */}
        <Route path="/ip-addresses" element={<IpAddresses />} />
        <Route path="/ip-addresses/create" element={<IpAddressCreate />} />
        <Route path="/ip-addresses/:id" element={<IpAddressShow />} />
        <Route path="/ip-addresses/:id/edit" element={<IpAddressEdit/>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
