import React, { useEffect, useState } from "react";
import {
  fetchAllFurnitures,
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../services/fetchApi";
import FurnitureCard from "../components/furnitureCard";

function FurniturePage() {
  const [furnitures, setFurnitures] = useState([]);
  const [filteredFurnitures, setFilteredFurnitures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  // Load furnitures and categories
  useEffect(() => {
    const fetchFurnitureData = async () => {
      try {
        const data = await fetchAllFurnitures();
        setFurnitures(data);
        setFilteredFurnitures(data);
        console.log(data);

        // Extract unique categories, including "All"
        const uniqueCategories = [
          "All",
          ...new Set(data.map((furniture) => furniture.category)),
        ];
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching furnitures:", error);
      }
    };

    fetchFurnitureData();
  }, []);

  // Load user favorites
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const userFavorites = await fetchFavorites();
        const favoriteIds = userFavorites.map((fav) => fav.furnitureId);
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchUserFavorites();
  }, []);

  // Filter furniture based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredFurnitures(furnitures);
    } else {
      setFilteredFurnitures(
        furnitures.filter((furniture) =>
          furniture.category
            .toLowerCase()
            .includes(selectedCategory.toLowerCase())
        )
      );
    }
  }, [selectedCategory, furnitures]);

  const handleFavoriteToggle = async (furniture) => {
    const isFavorite = favorites.some((fav) => fav.id === furniture.id);

    try {
      if (isFavorite) {
        // Remove from favorites
        const favoriteToRemove = favorites.find(
          (fav) => fav.id === furniture.id
        );
        if (favoriteToRemove) {
          await removeFavorite(favoriteToRemove.id);
          setFavorites((prev) => prev.filter((fav) => fav.id !== furniture.id));
        }
      } else {
        // Add to favorites
        const favoriteData = {
          id: furniture.id,
          name: furniture.name,
          category: furniture.category,
          modelUrl: furniture.modelUrl,
        };
        await addFavorite(favoriteData);
        setFavorites((prev) => [...prev, favoriteData]);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div
      className="relative flex flex-col min-h-screen bg-white overflow-x-hidden group/design-root"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#f4f2f0] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#181411]">
              <h2 className="text-lg font-bold tracking-tight">RoomCraft</h2>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 gap-1 px-6 py-5 justify-center">
          {/* Filter Section */}
          <div className="layout-content-container flex flex-col w-80">
            <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-[#181411]">
              Filter
            </h3>
            <div className="flex flex-col gap-3 px-3 py-3 w-full max-w-xs overflow-y-auto">
              {categories.map((filter) => (
                <div
                  key={filter}
                  className={`flex items-center justify-center px-4 h-10 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                    selectedCategory === filter
                      ? "bg-[#e0ddd5] text-[#000000]"
                      : "bg-[#f4f2f0] text-[#181411] hover:bg-[#e0ddd5] hover:text-[#000000]"
                  }`}
                  onClick={() => setSelectedCategory(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>

          {/* Furniture Section */}
          <div className="layout-content-container flex flex-col flex-1 max-w-[960px]">
            <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-[#181411]">
              Featured furniture
            </h3>
            {filteredFurnitures.length > 0 ? (
              filteredFurnitures.map((furniture) => (
                <FurnitureCard
                  key={furniture.id}
                  furniture={furniture}
                  isFavorite={favorites.some((fav) => fav.id === furniture.id)}
                  onFavoriteToggle={() => handleFavoriteToggle(furniture)}
                />
              ))
            ) : (
              <p className="text-center text-sm text-[#897461]">
                No furniture found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FurniturePage;
