import React, { useMemo, useState } from "react";

const useFilterRooms = (rooms) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredRooms = useMemo(() => {
    if (!rooms) return [];

    return rooms.filter((room) => {
      if (selectedCategories.length > 0) {
        return selectedCategories.includes(room.category);
      } else {
        return true;
      }
    });
  }, [rooms, selectedCategories]);

  return { filteredRooms, selectedCategories, setSelectedCategories };
};

export default useFilterRooms;
