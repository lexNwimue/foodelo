const validate = (name, password1, password2) => {
  if (name.match(/[0-9]/)) {
    //Check if name contains a number
    return { nameErr: "Name cannot contain numbers..." };
  } else if (password1 !== password2) {
    return { passwordErr: "Passwords do not match" };
  } else if (password1.length < 6 || password2.length < 6) {
    return { passwordErr: "Password must be at least six characters..." };
  }

  return { success: "Creating your account..." };
};

const sendRequest = async (formData, endpoint, method) => {
  const response = await fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  return data;
};

const addToCart = async (text) => {
  let response = await sendRequest({ text }, "/cart", "POST");
  return response;
};

const viewCart = async () => {
  let response = await fetch("/cart");
  response = await response.json();
  // if(response.failed)
  return response;
};

const deleteFromCart = async (word) => {
  let response = await sendRequest({ word }, "/cart", "DELETE");
  return response;
};

const logout = async () => {
  let response = await fetch("/logout");
  response = await response.json();
  console.log(response);
};

export { validate, sendRequest, addToCart, viewCart, deleteFromCart, logout };
