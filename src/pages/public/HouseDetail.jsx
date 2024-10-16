import React, { useState } from "react";
import { FaWifi, FaBroom, FaUtensils, FaWater, FaBolt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const BoardingHouseDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
  ];

  const services = [
    { name: "Wi-Fi", icon: <FaWifi /> },
    { name: "Cleaning", icon: <FaBroom /> },
    { name: "Kitchen", icon: <FaUtensils /> },
    { name: "Water", icon: <FaWater /> },
    { name: "Electricity", icon: <FaBolt /> }
  ];

  const setMainImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Cozy Downtown Boarding House</h1>

      <div className="mb-8">
        <div className="relative">
          <img
            src={images[currentImageIndex]}
            alt={`Boarding house main image`}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Boarding house image ${index + 1}`}
              className={`w-full h-24 object-cover rounded-lg cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setMainImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-600 mb-6">
            This charming boarding house offers a cozy and comfortable living space in the heart of downtown. With its modern amenities and prime location, it's perfect for students and young professionals looking for a convenient and enjoyable living experience.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Services Included</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-blue-500">{service.icon}</span>
                <span>{service.name}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="flex items-center space-x-2 mb-6">
            <MdLocationOn className="text-red-500" />
            <span>123 Main St, Anytown, ST 12345</span>
          </div>
          <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
        </div>

        <div>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Rental Details</h2>
            <p className="text-3xl font-bold text-green-600 mb-2">$800/month</p>
            <p className="text-gray-600 mb-4">Area: 250 sq ft</p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Book Now</button>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Lessor Information</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Lessor"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-gray-600">Property Manager</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">Contact: (123) 456-7890</p>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">Contact Lessor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingHouseDetail;
