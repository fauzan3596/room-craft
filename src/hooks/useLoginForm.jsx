import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import { userFailure, userStart, userSuccess } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const useLoginForm = (onLoginSuccess, errorModal, successModal) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userStart());
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
        const user = userCredential.user;
        dispatch(userSuccess({ uid: user.uid, email: user.email }));
        setError("");
        errorModal.closeModal();
        successModal.openModal();
        navigate("/user");
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        setError("Invalid username or password. Please try again.");
        dispatch(userFailure(error.message));
        errorModal.openModal();
      });
  };

  return { email, password, error, setEmail, setPassword, handleSubmit };
};

export default useLoginForm;
