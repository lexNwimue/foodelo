const verifyUser = async () => {
  let response = await fetch("/dashboard");
  response = await response.json();
  if (response.success) {
    return true;
  } else {
    return false;
  }
};

export { verifyUser };
