import React, { useEffect, useState } from "react";
import { fetchAllFavoriteFurnitures, removeFavorite } from "../services/fetchApi";
import FurnitureCard from "../components/furnitureCard";
import { CardPagination } from "../components";
import Swal from "sweetalert2";
import { Loading } from "../components"

const FavoriteFurniturePage = () => {
  const [favoriteFurnitures, setFavoriteFurnitures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const [forcePage, setForcePage] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentFavorites = favoriteFurnitures.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(favoriteFurnitures.length / itemsPerPage);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const furnitures = await fetchAllFavoriteFurnitures();
        setFavoriteFurnitures(furnitures);
      } catch (error) {
        console.error("Error fetching favorite furnitures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteToggle = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this furniture from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (confirm.isConfirmed) {
      try {
        await removeFavorite(id);
        setFavoriteFurnitures((prev) =>
          prev.filter((furniture) => furniture.id !== id)
        );
        Swal.fire("Removed!", "Furniture has been removed from favorites.", "success");
      } catch (error) {
        console.error("Error removing favorite furniture:", error);
      }
    }
  };

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newForcePage = event.selected;
    setItemOffset(newOffset);
    setForcePage(newForcePage);
    window.scrollTo(0, 0);
  };

  if (loading) {
        return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Furniture</h1>
      <div className="w-full max-w-5xl">
        {currentFavorites.length > 0 ? (
            currentFavorites.map((furniture) => (
              <FurnitureCard
                key={furniture.id}
                furniture={furniture}
                isFavorite={true}
                onFavoriteToggle={() => handleFavoriteToggle(furniture.id)}
              />
            ))
        ) : (
          <p className="text-gray-600 text-center mt-10">
            No favorite furniture found.
          </p>
        )}
        <div className="flex lg:flex-row flex-col items-center justify-between mt-5 gap-5">
          <p className="sm:text-base text-sm">
            Showing {itemOffset + 1}- 
            {endOffset <= favoriteFurnitures?.length
              ? endOffset
              : favoriteFurnitures?.length}{" "}
            of {favoriteFurnitures?.length} favorites
          </p>
          {favoriteFurnitures?.length >= itemsPerPage && (
            <CardPagination
              pageCount={pageCount}
              forcePage={forcePage}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteFurniturePage;
