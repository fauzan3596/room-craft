import React from "react";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}

      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
};

export default MainLayout;
