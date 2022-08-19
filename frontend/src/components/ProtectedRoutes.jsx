import { useNavigate, Outlet } from "react-router-dom";
import { verifyUser } from "../utils/auth";
// import { useRef } from "react";
import { useEffect, useState } from "react";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  console.log("userStatus before useEffect", status);
  const sideEffect = async () => {
    const response = await verifyUser();
    if (response === false) {
      navigate("/login");
      return;
    }
    setStatus(response);
  };

  useEffect(() => {
    sideEffect();
    console.log("userStatus after useEffect", status);
  });

  return status && <Outlet />; // This component was no longer in control
};

export default ProtectedRoutes;
