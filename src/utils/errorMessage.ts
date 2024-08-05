const errorMessage = (str = "") => {
  let message = "";
  if (str.includes("Network")) {
    message = "Network Error";
  } else if (str.toLowerCase().includes("token")) {
    message = "Please, sign in again";
  } else {
    message = str ?? "Something went wrong";
  }

  return message;
};

export { errorMessage };