import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Add from "./Pages/Add/Add.jsx";
import List from "./Pages/List/List.jsx";
import Login from "./Pages/Login/Login.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";

const App = () => {
  const location = useLocation();

  // Check if current path is login page
  const isLoginPage = location.pathname === "/";

  return (
    <div className="app">
      {!isLoginPage && <Navbar />}  {/* hide Navbar on login */}
      <div className="side">
        {!isLoginPage && <Sidebar />} {/* hide Sidebar on login */}
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
