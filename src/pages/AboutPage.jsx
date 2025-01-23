import React from "react";

const AboutPage = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 text-center py-16 px-6 h-96 flex justify-center items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Design Your Space with{" "}
            <span className="text-pink-500">Dimensional Dreams</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 md:w-[35rem] mx-auto">
            Transform your imagination into reality with our innovative 3D room
            design platform. Create, customize, and visualize your perfect
            space.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white">
        {features.map((feature, index) => (
          <div
            key={index}
            className="text-center p-6 border border-gray-200 rounded-lg shadow-lg bg-gray-50"
          >
            <img
              src={feature.icon}
              alt={feature.title}
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center py-12 px-6 bg-green-50">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700">
          Our Vision
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          We believe in making professional 3D design accessible to everyone.
          Our platform combines intuitive tools with powerful features to bring
          your ideas to life.
        </p>
      </div>

      <div className="bg-gradient-to-r from-teal-100 via-green-100 to-white py-12 px-6 border-t border-gray-200">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
          Why Choose Us?
        </h2>
        <ul className="max-w-3xl mx-auto space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-lg text-gray-700">
              <span className="text-pink-500 font-bold mr-3">✔</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const features = [
  {
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/furniture-3d-icon-download-in-png-blend-fbx-gltf-file-formats--couch-chair-home-cabinet-seat-store-pack-e-commerce-shopping-icons-5600839.png?f=webp",
    title: "3D Modeling",
    description: "Professional-grade 3D models with easy customization",
  },
  {
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/single-sofa-3d-icon-download-in-png-blend-fbx-gltf-file-formats--couch-seat-chair-furniture-pack-interiors-icons-4898090.png",
    title: "Light Design",
    description: "Intuitive interface for effortless creation",
  },
  {
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/armchair-3d-icon-download-in-png-blend-fbx-gltf-file-formats--couch-sofa-chair-seat-home-furniture-pack-interiors-icons-6010823.png?f=webp",
    title: "Custom Palettes",
    description: "Extensive color and texture libraries",
  },
  {
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/furniture-3d-icon-download-in-png-blend-fbx-gltf-file-formats--interior-chair-table-home-homeware-pack-tools-equipment-icons-8307012.png?f=webp",
    title: "Room Layout",
    description: "Flexible space planning tools",
  },
];

const benefits = [
  "Intuitive drag-and-drop interface",
  "Extensive library of 3D models",
  "Real-time visualization",
  "Professional-grade export options",
];

export default AboutPage;
