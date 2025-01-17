import React from "react";

const ErrorAdminPage = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="flex justify-center w-full text-3xl">
        <h1 className="font-bold">404</h1>
        <div className="divider divider-horizontal divider-neutral"></div>
        <h1 className="text-2xl">This page could not be found. </h1>
      </div>
    </main>
  );
};

export default ErrorAdminPage;
