import React, { useEffect, useState } from "react";
import useModal from "../hooks/useModal";
import useLoginForm from "../hooks/useLoginForm";
import { auth, db, signInWithGoogle } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { userFailure, userStart, userSuccess } from "../redux/slice/userSlice";
import { doc, setDoc } from "firebase/firestore";
import { Loading } from "../components";

const LoginForm = ({ onLoginSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const errorModal = useModal();
  const successModal = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const { email, password, error, setEmail, setPassword, handleSubmit } =
    useLoginForm(
      () => {
        setIsAuthenticated(true);
        // onLoginSuccess();
      },
      errorModal,
      successModal
    );

  const handleCloseSuccessModal = () => {
    successModal.closeModal();
    // onLoginSuccess();
  };

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  const handleGoogleLogin = async () => {
    dispatch(userStart());
    try {
      const user = await signInWithGoogle();
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: "user",
        createdAt: new Date().toISOString(),
      });
      dispatch(
        userSuccess({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        })
      );
      console.log("Google login successful:", user);
      successModal.openModal();
      setTimeout(() => {
        successModal.closeModal();
        navigate("/user");
      }, 2000);
    } catch (error) {
      dispatch(userFailure(error.message));
      console.error("Google login failed:", error.message);
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
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center p-10">
        <div className="max-w-md text-center">
          <h2 className="uppercase tracking-widest text-sm font-medium mb-4">
            RoomCraft
          </h2>
          <h1 className="text-4xl font-extrabold mb-6">
            Design Your Dream Space
          </h1>
          <p className="text-sm leading-relaxed mb-6">
            Transform your home planning experience with real-time 3D
            visualization. Tailor your space effortlessly with furniture that
            fits perfectly.
          </p>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        {isAuthenticated ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">You are logged in!</h1>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                auth.signOut(); // Logout user
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="max-w-sm w-full">
            <h1 className="text-2xl font-bold mb-6">Welcome Back</h1>
            <p className="text-sm mb-8">
              Enter your email and password to access your account.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login with Google Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 flex items-center justify-center gap-2 transition"
            >
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
              Login with Google
            </button>

            <p className="text-sm text-center mt-6">
              Don’t have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={handleSignUpRedirect}
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Modal Error */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-red-600">Login Error</h2>
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
              Login Successful
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              You have successfully logged in. Welcome back!
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseSuccessModal}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
