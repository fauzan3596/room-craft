import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchRoomTemplates } from "../../services/fetchApi";
import { Loading, RoomTemplateCard } from "../../components";
import ErrorPage from "../ErrorPage";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TemplateRoomPage = () => {
  const {
    data: roomTemplates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["roomTemplates"],
    queryFn: fetchRoomTemplates,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <main className="min-h-screen w-full lg:px-10 py-10 px-5 ">
      <Link to="/user/room">
        <button className="btn mt-4 btn-outline border-[#A1824A] text-[#A1824A] hover:text-gray-700 hover:bg-[#F9DAD5] hover:border-0 rounded-badge">
          <ChevronLeft className="text-xl" /> Back to Rooms
        </button>
      </Link>
      <h1 className="font-bold sm:text-3xl text-2xl mt-4">Room Templates</h1>
      <p>
        Explore our library of 3D room templates, showcasing inspiring layouts
        for your rooms
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-4 gap-8">
        {roomTemplates.map((roomTemplate) => (
          <RoomTemplateCard key={roomTemplate.id} roomTemplate={roomTemplate} />
        ))}
      </div>
    </main>
  );
};

export default TemplateRoomPage;
