import NavbarUser from "../components/navbarUser";
import { Outlet } from "react-router-dom";


const UserLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavbarUser />
      <main className="flex-grow"><Outlet/></main>
    </div>
  );
}

export default UserLayout;