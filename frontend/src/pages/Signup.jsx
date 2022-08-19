import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Utils import
import { validate, sendSignupRequest } from "../utils/utilities";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passwordErr: "",
    phoneNumberErr: "",
    paymentOptionErr: "",
    cardHolderNameErr: "",
    cvvErr: "",
    cardNumberErr: "",
    profilePhotoErr: "",
    expirationDateErr: "",
    serverErr: "",
  });
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
    phoneNumber: "",
    paymentOption: "",
    cardHolderName: "",
    cvv: "",
    cardNumber: "",
    expirationDate: "",
  });
  const [selectedFile, setSelectedFile] = useState(null); // For profile photo data
  const [isFileSelected, setIsFileSelected] = useState(false);
  const handleSignup = async () => {
    // Set errors to null
    setErrors({ ...errors, firstNameErr: "" });
    setErrors({ ...errors, lastNameErr: "" });
    setErrors({ ...errors, emailErr: "" });
    setErrors({ ...errors, passwordErr: "" });
    setErrors({ ...errors, phoneNumberErr: "" });
    setErrors({ ...errors, paymentOptionErr: "" });
    setErrors({ ...errors, cardHolderNameErr: "" });
    setErrors({ ...errors, cardNumberErr: "" });
    setErrors({ ...errors, profilePhotoErr: "" });
    setErrors({ ...errors, serverErr: "" });

    if (!isFileSelected) {
      setErrors({
        ...errors,
        profilePhotoErr: "Please Select a Profile Photo",
      });
      return;
    }
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
      phoneNumber: values.phoneNumber,
      paymentOption: values.paymentOption,
      cardHolderName: values.cardHolderName,
      cvv: values.cvv,
      cardNumber: values.cardNumber,
      expirationDate: values.expirationDate,
    };

    const validity = validate(data);
    if (!validity.success) {
      if (validity.firstNameErr)
        setErrors({ ...errors, firstNameErr: validity.firstNameErr });
      if (validity.lastNameErr)
        setErrors({ ...errors, lastNameErr: validity.lastNameErr });
      if (validity.passwordErr)
        setErrors({ ...errors, passwordErr: validity.passwordErr });
      if (validity.paymentOptionErr)
        setErrors({ ...errors, paymentOptionErr: validity.paymentOptionErr });
      if (validity.cardHolderNameErr)
        setErrors({ ...errors, cardHolderNameErr: validity.cardHolderNameErr });
      if (validity.cardNumberErr)
        setErrors({ ...errors, cardNumberErr: validity.cardNumberErr });
      if (validity.cvvErr) setErrors({ ...errors, cvvErr: validity.cvvErr });
      return;
    }

    const { password2, ...newData } = data; // Remove password2 property as it is no longer needed
    const formData = new FormData();
    formData.append("file", selectedFile);
    Object.values(newData).forEach((item) => {
      // Loop through each object property and append it
      formData.append("fields", item); // to the formData object
    });

    const response = await sendSignupRequest(
      formData,
      "http://localhost:4000/signup",
      "POST"
    );
    console.log(response);
    if (response.failed) {
      console.log("Response Failed: ", response);
      setErrors({ ...errors, emailErr: response.failed });
    }
    if (response.err) {
      console.log("Response Err: ", response);
    }
    if (response.success) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        method="POST"
        encType="muiltipart/form-data"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
              height: "100vh",
              backgroundColor: "#29C5F5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box>
              <img
                src={require("../assets/XMLID_5_.png")}
                alt="gaming console"
                style={{ width: "40%" }}
              ></img>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "100%", md: "50%" },
              flexFlow: "row wrap",
              justifyContent: "center",
              margin: "0 auto",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ width: "100%", marginTop: "20px" }}>
              Signup
            </Typography>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="First Name"
                value={values.firstName}
                name="firstName"
                required
                variant="standard"
                sx={{}}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.firstNameErr && {
                  error: true,
                  helperText: errors.firstNameErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Last Name"
                value={values.lastName}
                name="lastName"
                required
                variant="standard"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.lastNameErr && {
                  error: true,
                  helperText: errors.lastNameErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "90%",
                flexBasis: "93%",
                marginRight: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Email"
                type={"email"}
                required
                name="email"
                variant="standard"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                sx={{}}
                {...(errors.emailErr && {
                  error: true,
                  helperText: errors.emailErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Password"
                variant="standard"
                required
                type="password"
                value={values.password1}
                name="password1"
                {...(errors.passwordErr && {
                  error: true,
                  helperText: errors.passwordErr,
                })}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                variant="standard"
                required
                label="Confirm Password"
                type="password"
                value={values.password2}
                name="password2"
                {...(errors.passwordErr && {
                  error: true,
                  helperText: errors.passwordErr,
                })}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Phone Number"
                type={"number"}
                value={values.phoneNumber}
                name="phoneNumber"
                required
                variant="standard"
                sx={{}}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.phoneNumberErr && {
                  error: true,
                  helperText: errors.phoneNumberErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <FormLabel sx={{ alignSelf: "flex-start" }}>
                Payment Option
              </FormLabel>
              <RadioGroup
                row
                value={values.paymentOption}
                name="paymentOption"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.paymentOptionErr && {
                  error: true,
                  helperText: errors.paymentOptionErr,
                })}
              >
                <FormControlLabel
                  value="paypal"
                  required
                  name={"paymentOption"}
                  control={<Radio required />}
                  label="PayPal"
                />
                <FormControlLabel
                  value="creditCard"
                  name={"paymentOption"}
                  control={<Radio required />}
                  label="Credit Card"
                />
              </RadioGroup>
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Card Holder Name"
                value={values.cardHolderName}
                name="cardHolderName"
                required
                variant="standard"
                sx={{}}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.cardHolderNameErr && {
                  error: true,
                  helperText: errors.cardHolderNameErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="CVV"
                type={"number"}
                value={values.cvv}
                name="cvv"
                required
                variant="standard"
                sx={{}}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.cvvErr && {
                  error: true,
                  helperText: errors.cvvErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="Card Number"
                type={"number"}
                value={values.cardNumber}
                name="cardNumber"
                required
                variant="standard"
                sx={{}}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.cardNumberErr && {
                  error: true,
                  helperText: errors.cardNumberErr,
                })}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <TextField
                label="03/22 - Expiration Date"
                type={"number"}
                value={values.expirationDate}
                name="expirationDate"
                required
                variant="standard"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                {...(errors.expirationDateErr && {
                  error: true,
                  helperText: errors.expirationDateErr,
                })}
              />
            </FormControl>
            <Box
              sx={{
                width: "100%",
                flexBasis: "45%",
                marginRight: "8px",
                marginLeft: "8px",
              }}
              variant="standard"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  value={values.profilePhoto}
                  required
                  type="file"
                  name="profilePhoto"
                  multiple={false}
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    e.target.files[0] && setIsFileSelected(true);
                  }}
                />
                <PhotoCamera />
              </IconButton>
              <span
                style={{ color: "red", display: "block", fontSize: "12px" }}
              >
                {errors.profilePhotoErr && "Please select a Profile Photo"}
              </span>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <span
                style={{ color: "red", display: "block", fontSize: "12px" }}
              >
                {errors.serverErr &&
                  "Some error occured while creating your account"}
              </span>
              <FacebookRoundedIcon
                style={{ fontSize: "35px", color: "#2196f3" }}
              />
              <LinkedInIcon style={{ fontSize: "35px", color: "#2196f3" }} />
              {/* <GoogleIcon style={{ fontSize: "35px" }} /> */}
              <img
                src={require("../assets/Google.png")}
                alt="Google Icon"
                width={"30px"}
                height={"30px"}
              ></img>
            </Box>

            <FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100px", textTransform: "none" }}
                onClick={handleSignup}
              >
                Signup
              </Button>
            </FormControl>
            <Typography variant="body1" sx={{ width: "100%" }}>
              Already have an account?
              <Link
                to="/login"
                style={{ color: "#1565c0", textDecoration: "none" }}
              >
                {" "}
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Signup;
