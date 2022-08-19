import { Button } from "@mui/material";

const IndexPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
      <Button href="/login">Login</Button>
      <Button href="/signup">Signup</Button>
      <Button href="/dashboard">Dashboard</Button>
    </div>
  );
};

export default IndexPage;
