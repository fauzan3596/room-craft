import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const useLoginForm = (onLoginSuccess, errorModal, successModal) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        setError("");
        errorModal.closeModal();
        successModal.openModal();
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        setError("Invalid username or password. Please try again.");
        errorModal.openModal();
      });
  };

  return { email, password, error, setEmail, setPassword, handleSubmit };
};

export default useLoginForm;
