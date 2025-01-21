import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const useRegisterForm = (onRegisterSuccess, openErrorModal, openSuccessModal) => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, email, password } = formData;

    if (firstName && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed up:", {
            uid: userCredential.user.uid,
            email,
            firstName,
          });
          setError("");
          openSuccessModal();
          setTimeout(() => {
            onRegisterSuccess();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          setError("Failed to create account. Please try again.");
          openErrorModal();
        });
    } else {
      setError("All fields are required.");
      openErrorModal();
    }
  };

  return { formData, error, handleChange, handleSubmit };
};

export default useRegisterForm;
