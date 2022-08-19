import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

// Utils import
import { sendLoginRequest } from "../utils/utilities";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const formData = {
    email: values.email,
    password: values.password,
  };

  const handleLogin = async () => {
    setEmailErr("");
    setPasswordErr("");
    const response = await sendLoginRequest(formData, "/login", "POST");
    console.log(response);
    if (response.failed) {
      setEmailErr("Incorrect Details");
      setPasswordErr("Incorrect Details");
    } else if (response.err) {
      setEmailErr("Some internal error occured...");
    } else if (response.success) {
      navigate("/dashboard");
      console.log("Navigating to dashboard");
    }
  };

  return (
    <>
      <form method="post" onSubmit={(e) => e.preventDefault()}>
        <Box
          sx={{
            display: "flex",
            // justifyContent: "center",
            flexDirection: { xs: "column", sm: "row", md: "row" },
            maxWidth: "100%",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              background: "#29C5F5",
            }}
          >
            <img
              src={require("../assets/console1.png")}
              alt="gaming console"
              width={"70%"}
            ></img>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Login
              </Typography>
              <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                <TextField
                  id="input-with-sx"
                  type={"email"}
                  required
                  name="email"
                  label="Email"
                  variant="standard"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  {...(emailErr && { error: true, helperText: passwordErr })}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, width: "80%" }} variant="standard">
                <TextField
                  variant="standard"
                  label="Password"
                  name="password"
                  required
                  type={"password"}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                  {...(passwordErr && { error: true, helperText: passwordErr })}
                />
              </FormControl>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ width: "100px", mt: 4 }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
            <Typography variant="body2" sx={{ width: "100%", mt: 2 }}>
              Don't have an Account?
              <Link
                to="/signup"
                style={{ color: "#1565c0", textDecoration: "none" }}
              >
                {" "}
                Signup
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Login;
