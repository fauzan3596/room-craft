import React from "react";
import { useDispatch } from "react-redux";
import { userLogOut } from "../redux/action";
import { useNavigate } from "react-router-dom";

const NavbarUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(userLogOut());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f2f0] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#181411]">
          {/* Mengganti SVG inline dengan <img> */}
          <img
            src="/roomcraft-logo.svg"
            alt="RoomCraft Logo"
            className="w-8 h-8"
          />
          <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">
            RoomCraft
          </h2>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
        <a
            className="text-[#181411] text-sm font-medium leading-normal"
            href="/user"
          >
            Home
          </a>
          <a
            className="text-[#181411] text-sm font-medium leading-normal"
            href="/user/furniture"
          >
            Furniture
          </a>
          <a
            className="text-[#181411] text-sm font-medium leading-normal"
            href="/user/room"
          >
            Room
          </a>
          <a className="text-[#181411] text-sm font-medium leading-normal" href="/user/favorites">
            Favorite
          </a>
          <a className="text-[#181411] text-sm font-medium leading-normal" href="/user/about">
            About
          </a>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f4f2f0] text-[#181411] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            >
              <div
                className="text-[#181411]"
                data-icon="User"
                data-size="20px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li onClick={logoutHandler}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarUser;
