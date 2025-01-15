import React from "react";
import { WelcomeCard } from "../../components";

const AdminHomePage = () => {
  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>Dashboard</li>
        </ul>
      </div>
      <WelcomeCard />
    </main>
  );
};

export default AdminHomePage;
