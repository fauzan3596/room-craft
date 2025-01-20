import React, { useMemo, useState } from "react";

const useFilterRooms = (rooms, favoriteRooms) => {
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

  const filteredFavoriteRooms = useMemo(() => {
    if (!favoriteRooms) return [];

    return favoriteRooms.filter((room) => {
      if (selectedCategories.length > 0) {
        return selectedCategories.includes(room.category);
      } else {
        return true;
      }
    });
  }, [favoriteRooms, selectedCategories]);

  return { filteredRooms, filteredFavoriteRooms, selectedCategories, setSelectedCategories };
};

export default useFilterRooms;
