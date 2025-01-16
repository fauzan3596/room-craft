const Navbar = () => (
  <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
    {/* Logo */}
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-bold text-green-700">🌿</span>
      <h1 className="text-xl font-bold">RoomCraft</h1>
    </div>

    {/* Navigation Links */}
    <ul className="flex items-center space-x-6 text-gray-500">
      <li>
        <a href="#home" className="hover:text-black">
          Home
        </a>
      </li>
      <li>
        <a href="#about" className="hover:text-black">
          {" "}
          Furnitures
        </a>
      </li>
      <li>
        <a href="#shop" className="hover:text-black">
          Favorite
        </a>
      </li>
      <li>
        <a href="#contact" className="hover:text-black">
          Rooms
        </a>
      </li>
    </ul>

    <button className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">Login</button>
  </nav>
);

export default Navbar;
