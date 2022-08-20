import { Outlet, useNavigate } from "react-router-dom";
import { verifyUser } from "../utils/auth";
import { useRef } from "react";
import { useEffect } from "react";
// import Login from "./Login";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  let userStatus = useRef(false);
  console.log("userStatus before useEffect", userStatus);

  useEffect(() => {
    const sideEffect = async () => {
      const response = await verifyUser();
      console.log("Verify User Response: ", response);
      if (response) {
        userStatus.current = response;
      } else {
        userStatus.current = false;
        navigate("/login");
        return;
      }
    };
    sideEffect();
    console.log("userStatus after useEffect", userStatus);
  });

  return userStatus ? <Outlet /> : <div>Loading. . . </div>;
};

export default ProtectedRoutes;
