import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRoomById } from "../../services/fetchApi";
import { EditRoomDetail } from "../../components";

const DetailRoomPage = () => {
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const {
    data: room,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => fetchRoomById(id),
  });

  return (
    <main className="min-h-screen w-full lg:px-10 px-5 py-10">
      <h1 className="font-bold text-3xl">Edit Room Data</h1>
      <div className="flex justify-center mt-5">
        <ul className="steps w-[40rem]">
          <li className="step step-primary">Edit Room</li>
          <li className="step">Add Furniture</li>
        </ul>
      </div>
      <EditRoomDetail room={room} />
    </main>
  );
};

export default DetailRoomPage;
