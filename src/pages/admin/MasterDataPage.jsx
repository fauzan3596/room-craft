import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CardData, TableData } from "../../components";
import { Grid, List } from "lucide-react";

const MasterDataPage = () => {
  const { furnitures } = useSelector((state) => state.furnitures);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [isGrid, setIsGrid] = useState(true);
  const [forcePage, setForcePage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => clearTimeout(debounceHandler);
  }, [query]);

  const filteredFurnitures = furnitures
    ? furnitures.filter((furniture) => {
        const searchResults = [
          furniture.name,
          furniture.category,
          furniture.height,
          furniture.length,
          furniture.width,
        ]
          .join(" ")
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase());

        const filterResults = filter ? furniture.category === filter : true;

        return searchResults && filterResults;
      })
    : [];

  const sortedFurnitures = filteredFurnitures.sort((a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const queryHandler = (e) => {
    setForcePage(0);
    setItemOffset(0);
    setQuery(e.target.value);
  };

  const filterHandler = (e) => {
    setForcePage(0);
    setItemOffset(0);
    setFilter(e.target.value);
  };

  const isGridHandler = () => {
    setIsGrid((prev) => !prev);
    setItemOffset(0);
    setForcePage(0);
  };

  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D] flex justify-between">
        <ul>
          <li>Master Data</li>
        </ul>
        <Link to="/admin/master-data/add">
          <button className="btn bg-green-900 text-white hover:bg-green-700">
            + Add New
          </button>
        </Link>
      </div>
      <div className="flex md:flex-row md:items-center flex-col gap-3 mt-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={query}
            onChange={queryHandler}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="flex gap-3 sm:flex-row flex-col w-full">
          <select
            className="select select-bordered w-fit me-auto"
            value={filter}
            onChange={filterHandler}
          >
            <option value="">All Categories</option>
            <option value="Tables">Tables</option>
            <option value="Seating">Seating</option>
            <option value="Lighting">Lighting</option>
            <option value="Bedroom & Sleeping Essentials">
              Bedroom & Sleeping Essentials
            </option>
            <option value="Kitchen & Bathroom Equipment">
              Kitchen & Bathroom Equipment
            </option>
            <option value="Electronics & Interior Decorations">
              Electronics & Interior Decorations
            </option>
          </select>
          <div className="join rounded-lg justify-end">
            <button
              onClick={isGridHandler}
              className={`btn join-item hover:bg-green-900 hover:bg-opacity-50 border-0 ${
                isGrid
                  ? "!bg-green-900 text-white"
                  : "text-green-900 bg-green-700 bg-opacity-10"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={isGridHandler}
              className={`btn join-item hover:bg-green-900 hover:bg-opacity-50 border-0 ${
                !isGrid
                  ? "!bg-green-900 text-white"
                  : "text-green-900 bg-green-700 bg-opacity-10"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {isGrid ? (
        <TableData
          furnitures={sortedFurnitures}
          forcePage={forcePage}
          setForcePage={setForcePage}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
        />
      ) : (
        <CardData
          furnitures={sortedFurnitures}
          forcePage={forcePage}
          setForcePage={setForcePage}
          itemOffset={itemOffset}
          setItemOffset={setItemOffset}
        />
      )}
    </main>
  );
};

export default MasterDataPage;
