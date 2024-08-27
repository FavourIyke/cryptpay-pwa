import { toast } from "react-toastify";

 export const validateLoginDetails = (email: string, password: string): boolean => {
    if (!email) {
      toast("Kindly tell us your mail", { type: "error" ,});
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast("Your email is not in the correct format", { type: "error" });
      return false;
    }

    if (!password) {
      toast("We need your password to proceed", { type: "error" });
      return false;
    }

    return true;
  };
 export const validateForgotPassword = (email: string, ): boolean => {
    if (!email) {
      toast("Kindly tell us your mail", { type: "error" });
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast("Your email is not in the correct format", { type: "error" });
      return false;
    }

    return true;
  };

  export  const validateCreatePassword = (password: string, confirmPassword: string) => {
    // check if password is empty
    if (!password) {
      
            toast("kindly add your desired password", { type: "error" });

      return false;
    }
    const passwordRegex =
      /[!@#_$%^&*(),.?":{}|<>]/;
    if (!passwordRegex.test(password)) {
     
      toast("Password must contain atleast 8 characters, 1 uppercase, 1 lowercase and 1 special character", { type: "error" });

      return false;
    }
    // check if confirmed password is empty
    if (!confirmPassword) {
     
            toast("Retype your password in the field above", { type: "error" });

      return false;
    }

    if (confirmPassword !== password) {
            toast("Oops!!! Your passwords do not match", { type: "error" });

      return false;
    }
    return true;
  };
  export  const validateSignUp = (email:string, username: string, ) => {
    // check if password is empty
     if (!email) {
      toast("Kindly tell us your mail", { type: "error" });
      return false;
    }
     if (!username) {
      toast("Kindly tell us your username", { type: "error" });
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast("Your email is not in the correct format", { type: "error" });
      return false;
    }

    return true;
  };
  export  const validateSaveDetails = (username:string, fullname: string, ) => {
    // check if password is empty
     if (!username) {
      toast("Kindly tell us your username", { type: "error" });
      return false;
    }
     if (!fullname) {
      toast("Kindly tell us your full name", { type: "error" });
      return false;
    }

    return true;
  };


  export const validateBvn = (bvnno: string, surnamee: string) => {
    if (!bvnno) {
      toast("Enter your BVN", { type: "error" });
      return false;
    }
    if (!surnamee) {
      toast("Enter your surname", { type: "error" });
      return false;
    }
    const bvnRegex = /^[0-9]{11}$/;
    if (!bvnRegex.test(bvnno)) {
      toast("This BVN is not correct", { type: "error" });
      return false;
    }

    return true;
  };
