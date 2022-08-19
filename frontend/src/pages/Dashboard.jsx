import { Button, Typography } from "@mui/material";
import React from "react";
import { logout } from "../utils/utilities";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    let response = await logout();
    console.log("Response", response);
    if (response.success) {
      navigate("/");
    }
  };
  return (
    <>
      <Typography variant="h4">Dashboard</Typography>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default Dashboard;
