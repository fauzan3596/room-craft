import React from "react";
import MainLayout from "../layouts/MainLayout";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import asset2 from "../assets/asset.2.jpg";
import asset3 from "../assets/asset.3.jpg";
import asset4 from "../assets/asset.4.jpg";
import asset5 from "../assets/asset.5.jpg";
import furnitureImage from "../assets/asset.6.jpg";
import livingRoomImage from "../assets/asset.7.jpg";

const products = [
  {
    id: 1,
    name: "Modern Sofa",
    price: "$599",
    image: asset2,
  },
  {
    id: 2,
    name: "Classic Wood Table",
    price: "$299",
    image: asset3,
  },
  {
    id: 3,
    name: "Elegant Dining Chair",
    price: "$149",
    image: asset4,
  },
  {
    id: 4,
    name: "Luxury Bed Frame",
    price: "$899",
    image: asset5,
  },
];

const LandingPage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroBanner />

      {/* Featured Products */}
      <section id="products" className="container mx-auto py-12 px-4 bg-red-100">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Transform Your Space</h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Bring your room to life with RoomCraft's 3D design platform. Seamlessly plan and visualize your ideal layout
          with real-time updates.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-pink-100 py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Elevate Your Space with RoomCraft</h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover how RoomCraft's 3D visualization can transform your home. Experience the future of room design
              today.
            </p>
            <button className="bg-green-700 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-800 transition">
              Start Designing
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img src={furnitureImage} alt="Furniture Display" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-red-100 py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <img src={livingRoomImage} alt="Curated Living Room" className="rounded-lg shadow-lg" />
          </div>

          <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0 md:pl-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-tight">
              Curate Your <br /> Dream Living
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Elevate your living space with RoomCraft’s 3D design tools. Visualize how furniture, decor, and layout
              will come together for a personalized oasis.
            </p>
            <button className="bg-green-700 text-white py-2 px-6 rounded-lg text-lg hover:bg-green-800 transition">
              Transform Now
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="products" className="bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Discover Your Style</h2>
          <p className="text-xl text-gray-700 mb-12">
            Browse through our exclusive collection and find the perfect match for your home. Make your space uniquely
            yours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <div key={product.id} className="relative group hover:scale-105 transform transition-all duration-300">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <button className="px-4 py-2 bg-pink-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-pink-700">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <p className="text-lg text-pink-600 font-semibold">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
