import { toast } from "react-hot-toast";

 export const validateLoginDetails = (email: string, password: string): boolean => {
    if (!email) {
      toast.error("Kindly tell us your mail");
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast.error("Your email is not in the correct format");
      return false;
    }

    if (!password) {
      toast.error("We need your password to proceed");
      return false;
    }

    return true;
  };
 export const validateForgotPassword = (email: string, ): boolean => {
    if (!email) {
      toast.error("Kindly tell us your mail");
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast.error("Your email is not in the correct format");
      return false;
    }

    return true;
  };

  export  const validateCreatePassword = (password: string, confirmPassword: string) => {
    // check if password is empty
    if (!password) {
      
            toast.error("kindly add your desired password");

      return false;
    }
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

    if (!passwordRegex.test(password)) {
     
      toast.error("Password must contain atleast 8 characters, 1 uppercase, 1 lowercase and 1 special character");

      return false;
    }
    // check if confirmed password is empty
    if (!confirmPassword) {
     
            toast.error("Retype your password in the field above");

      return false;
    }

    if (confirmPassword !== password) {
            toast.error("Oops!!! Your passwords do not match");

      return false;
    }
    return true;
  };
  export  const validateSignUp = (email:string, username: string, ) => {
    // check if password is empty
     if (!email) {
      toast.error("Kindly tell us your mail");
      return false;
    }
     if (!username) {
      toast.error("Kindly tell us your username");
      return false;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      toast.error("Your email is not in the correct format");
      return false;
    }

    return true;
  };


  export const validateBvn = (bvnno: string,) => {
    if (!bvnno) {
      toast.error("Enter your BVN");
      return false;
    }
    if (bvnno.length !== 11) {
      toast.error("Invalid BVN");
      return false;
    }
   
    const bvnRegex = /^[0-9]{11}$/;
    if (!bvnRegex.test(bvnno)) {
      toast.error("This BVN is not correct");
      return false;
    }

    return true;
  };
