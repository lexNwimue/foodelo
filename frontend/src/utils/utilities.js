// Form validation handler
const validate = (data) => {
  console.log(data);
  if (data.firstName.match(/[0-9]/))
    return { firstNameErr: "Name cannot contain numbers..." };
  else if (data.lastName.match(/[0-9]/))
    return { lastNameErr: "Name cannot contain numbers..." };
  else if (data.password1 !== data.password2)
    return { passwordErr: "Passwords do not match" };
  else if (data.password1.length < 6 || data.password2.length < 6)
    return { passwordErr: "Password must be at least six characters..." };
  else if (data.paymentOption === "")
    return { paymentOptionErr: "Please Select a Payment Option" };
  else if (data.cvv.length !== 3) return { cvvErr: "Invalid CVV value" };
  else if (data.cardHolderName.match(/[0-9]/))
    return { cardHolderNameErr: "Name cannot contain numbers" };
  else if (data.cardNumber.length < 12)
    return { cardNumberErr: "Invalid Card Number" };
  else return { success: "Creating your account..." };
};

// Server request handler
const sendSignupRequest = async (formData, endpoint, req_method) => {
  let response = await fetch(endpoint, {
    method: req_method,
    body: formData,
  });
  response = await response.json();
  return response;
};

const sendLoginRequest = async (formData, endpoint, req_method) => {
  let response = await fetch(endpoint, {
    method: req_method,
    // credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  response = await response.json();
  return response;
};

const logout = async () => {
  let response = await fetch("/logout");
  response = await response.json();
  return response;
};

export { validate, sendSignupRequest, logout, sendLoginRequest };
