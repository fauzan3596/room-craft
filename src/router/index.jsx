import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/LoginForm"));
const Register = lazy(() => import("../pages/RegisterForm"));

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Halaman utama adalah LandingPage */}
        <Route path="/" element={<Home />} />

        {/* Login dan Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
