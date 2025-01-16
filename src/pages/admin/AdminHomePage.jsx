import React from "react";
import { DetailCard, FeaturedProducts, WelcomeCard } from "../../components";

const AdminHomePage = () => {
  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>Dashboard</li>
        </ul>
      </div>
      <WelcomeCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <DetailCard type="products" />
        <DetailCard type="users" />
      </div>
      <FeaturedProducts />
    </main>
  );
};

export default AdminHomePage;
