import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../hooks/useModal";
import useRegisterForm from "../hooks/useRegisterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { db, signInWithGoogle } from "../config/firebase";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const errorModal = useModal();
  const successModal = useModal();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { user, loading } = useSelector((state) => state.user);

  const { formData, error, handleChange, handleSubmit } = useRegisterForm(
    () => {
      console.log("Success callback triggered");
      successModal.openModal();
      setTimeout(() => {
        console.log("Navigating to /login");
        navigate("/login");
      }, 2000);
    },
    () => {
      console.error("Error callback triggered");
      errorModal.openModal();
    },
    successModal.openModal
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSwitchToLogin = () => {
    navigate("/login");
  };

  const handleGoogleRegister = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google user registered:", user);
      successModal.openModal();
      setTimeout(() => {
        successModal.closeModal();
        navigate("/login");
      }, 2000);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: "user",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Google registration error:", error.message);
      errorModal.openModal();
    }
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/user");
      }
    }
  }, [navigate, loading]);

  if (loading || user) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-gray-600 text-white p-10">
        <h1 className="text-5xl font-extrabold mb-6 text-center">RoomCraft</h1>
        <p className="text-lg text-gray-300 text-center mb-4 leading-relaxed">
          Experience the ultimate 3D room design platform. Discover, visualize,
          and design your perfect space in real-time with RoomCraft's innovative
          tools.
        </p>
        <ul className="text-sm text-gray-400 space-y-2 text-left">
          <li>✔ Real-time 3D Visualization</li>
          <li>✔ Personalized Room Layouts</li>
          <li>✔ Interactive Home Planning</li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-4 md:p-6">
        <div className="max-w-md w-full p-6 rounded-lg">
          <h1 className="mb-4 text-xl font-bold text-center text-white">
            Create Your RoomCraft Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-400">
                Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-400">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-400">
                Password*
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xs text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition"
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={handleGoogleRegister}
            className="flex items-center justify-center w-full gap-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
            Sign Up with Google
          </button>
          <p className="mt-4 text-xs text-center text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              className="text-indigo-500 hover:underline"
              onClick={handleSwitchToLogin}
            >
              Log In
            </button>
          </p>
        </div>
      </div>

      {/* Modal Error */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-red-600">
              Registration Error
            </h2>
            <p className="text-sm text-gray-600 mt-2">{error}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={errorModal.closeModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {successModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-green-600">
              Registration Successful
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Your account has been successfully created.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  successModal.closeModal();
                  navigate("/login");
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
