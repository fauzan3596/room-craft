import React, { useEffect, useState } from "react";
import {
  fetchAllFurnitures,
  addFavorite,
  fetchFavorites,
  removeFavorite,
} from "../services/fetchApi";
import FurnitureCard from "../components/furnitureCard";
import { CardPagination, Loading } from "../components";

function FurniturePage() {
  const [furnitures, setFurnitures] = useState([]);
  const [filteredFurnitures, setFilteredFurnitures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentFurnitures = filteredFurnitures.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredFurnitures.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newForcePage = event.selected;
    setItemOffset(newOffset);
    setForcePage(newForcePage);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchFurnitureData = async () => {
      try {
        const data = await fetchAllFurnitures();
        setFurnitures(data);
        setFilteredFurnitures(data);
        console.log(data);

        const uniqueCategories = [
          "All",
          ...new Set(data.map((furniture) => furniture.category)),
        ];
        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching furnitures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFurnitureData();
  }, []);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const userFavorites = await fetchFavorites();
        setFavorites(userFavorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchUserFavorites();
  }, []);

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
    setItemOffset(0);
    setForcePage(0);
  }, [selectedCategory, furnitures]);

  const handleFavoriteToggle = async (furniture) => {
    const isFavorite = favorites.some((fav) => fav.id === furniture.id);

    try {
      if (isFavorite) {
        const favoriteToRemove = favorites.find(
          (fav) => fav.id === furniture.id
        );
        if (favoriteToRemove) {
          await removeFavorite(favoriteToRemove.id);
          setFavorites((prev) => prev.filter((fav) => fav.id !== furniture.id));
        }
      } else {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="relative flex flex-col min-h-screen bg-white overflow-x-hidden group/design-root"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full flex-col">
        <div className="flex flex-1 gap-1 px-6 py-5 justify-center">
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

          <div className="flex flex-col layout-content-container flex-1 max-w-[960px]">
            <div>
              <h3 className="px-4 pt-4 pb-2 text-lg font-bold text-[#181411]">
                Featured furniture
              </h3>
              {currentFurnitures.length > 0 ? (
                currentFurnitures.map((furniture) => (
                  <FurnitureCard
                    key={furniture.id}
                    furniture={furniture}
                    isFavorite={favorites.some(
                      (fav) => fav.id === furniture.id
                    )}
                    onFavoriteToggle={() => handleFavoriteToggle(furniture)}
                  />
                ))
              ) : (
                <p className="text-center text-sm text-[#897461]">
                  No furniture found
                </p>
              )}
            </div>
            <div className="flex lg:flex-row flex-col items-center justify-between mt-5 gap-5">
              <p className="sm:text-base text-sm">
                Showing {itemOffset + 1}-
                {endOffset <= filteredFurnitures?.length
                  ? endOffset
                  : filteredFurnitures?.length}{" "}
                of {filteredFurnitures?.length} products
              </p>
              {filteredFurnitures?.length >= itemsPerPage && (
                <CardPagination
                  pageCount={pageCount}
                  forcePage={forcePage}
                  handlePageClick={handlePageClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FurniturePage;
