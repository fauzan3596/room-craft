import React from "react";
import {
  FurnitureCollection,
  Header,
  InspirationSection,
  TemplateCollection,
  UnlockYourDreamHome,
} from "../../components";

const HomePage = () => {
  return (
    <main className="min-h-screen w-full">
      <Header />
      <FurnitureCollection />
      <UnlockYourDreamHome />
      <TemplateCollection />
      <InspirationSection />
    </main>
  );
};

export default HomePage;
