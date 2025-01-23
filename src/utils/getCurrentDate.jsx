import { Moon, Sun } from "lucide-react";

const todayDate = new Date();

export const greetingMessage = () => {
  if (todayDate.getHours() >= 6 && todayDate.getHours() <= 12) {
    return "Good Morning, Admin";
  } else if (todayDate.getHours() >= 12 && todayDate.getHours() <= 18) {
    return "Good Afternoon, Admin";
  } else {
    return "Good Evening, Admin";
  }
};

export const formattedDate = () => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(todayDate).toLocaleDateString("en-US", options);
};

export const formattedTime = () => {
  let hour = todayDate.getHours();
  let minute = todayDate.getMinutes();
  let second = todayDate.getSeconds();

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  return `${hour} : ${minute} : ${second}`;
};

export const greetingIcon = () => {
  if (todayDate.getHours() >= 6 && todayDate.getHours() < 18) {
    return <Sun className="me-3 sm:w-14 sm:h-14 w-10 h-10" />;
  } else {
    return <Moon className="me-3 sm:w-14 sm:h-14 w-10 h-10" />;
  }
};

export const formatTableDate = (date) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const formatCardDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export const formatWIBTime = (date) => {
  const utcDate = new Date(date);
  const wibOffset = 7 * 60;
  const wibDate = new Date(utcDate.getTime() + wibOffset * 60 * 1000);
  const formattedDate = wibDate.toISOString().slice(0, 19);

  return formattedDate;
};
