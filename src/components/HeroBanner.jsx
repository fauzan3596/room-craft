import furnitureImage from "../assets/asset.1.jpg";

const HeroBanner = () => (
  <section className="flex h-screen">
    {/* Left Section */}
    <div className="flex flex-col justify-center w-1/2 bg-green-100 px-16">
      <h1 className="text-5xl font-bold text-green-900 mb-6">Discover Your Dream Room</h1>
      <p className="text-lg text-green-800 mb-6">
        Transform your space with our handpicked selection of timeless furniture. Experience comfort and elegance like
        never before.
      </p>
      <button className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800">Explore</button>
    </div>

    {/* Right Section */}
    <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${furnitureImage})` }}>
      {/* Background image of the room */}
    </div>
  </section>
);

export default HeroBanner;
