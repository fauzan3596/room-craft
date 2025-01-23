import React from "react";
import { useSelector } from "react-redux";
import { UserTable } from "../../components";

const UserDataPage = () => {
  const { allUsers } = useSelector((state) => state.allUsers);

  const filteredUsers = allUsers.filter((user) => user.role === "user");

  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>User Data</li>
        </ul>
      </div>
      <UserTable users={filteredUsers} />
    </main>
  );
};

export default UserDataPage;
