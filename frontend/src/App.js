import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import IndexPage from "./components/IndexPage";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Cart from "./components/Cart";
import FourOFour from "./components/FourOFour";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/404" element={<FourOFour />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
