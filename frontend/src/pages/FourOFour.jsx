import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const _404 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">404 - Page Not Found</Typography>;
      <Button variant="contained">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Go Back Home
        </Link>
      </Button>
    </Box>
  );
};

export default _404;
