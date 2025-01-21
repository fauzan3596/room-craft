import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoomById } from "../../services/fetchApi";
import { AddFurnitureToRoom, EditRoomDetail } from "../../components";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";

const DetailRoomPage = () => {
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const { rooms } = useSelector((state) => state.rooms);
  const roomFromRedux = rooms.find((r) => r.id === id);
  const {
    data: roomFromQuery,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoomById(id),
    enabled: !roomFromRedux,
  });

  const room = roomFromRedux || roomFromQuery;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (isError) {
    return <ErrorPage />
  }
  
  return (
    <main className="min-h-screen w-full lg:px-10 px-5 py-10">
      <h1 className="font-bold text-3xl">
        {step === 1 ? "Edit Room Data" : "Add Furniture to Your Room"}
      </h1>
      <div className="flex justify-center mt-5">
        <ul className="steps w-[40rem]">
          <li className="step step-accent">Edit Room</li>
          <li className={`step ${step === 2 ? "step-accent" : ""}`}>
            Add Furniture
          </li>
        </ul>
      </div>
      {step === 1 && <EditRoomDetail room={room} setStep={setStep} />}
      {step === 2 && <AddFurnitureToRoom room={room} setStep={setStep} />}
    </main>
  );
};

export default DetailRoomPage;
