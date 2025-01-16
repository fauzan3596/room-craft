import React from "react";
import {
  formattedDate,
  formattedTime,
  greetingIcon,
  greetingMessage,
} from "../../../utils/getCurrentDate";

const WelcomeCard = () => {
  return (
    <section className="card bg-green-900 bg-opacity-10 shadow-xl mt-4">
      <div className="card-body text-green-900">
        <h2 className="card-title sm:text-xl text-base">{greetingMessage()}</h2>
        <div className="flex items-center">
          {greetingIcon()}
          <div className="flex flex-col gap-1 sm:text-xl text-sm">
            <p>{formattedDate()}</p>
            <p>{formattedTime()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeCard;
