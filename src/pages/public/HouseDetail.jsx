import { Breadcrumb } from "react-bootstrap";
import React, { useState } from "react";
import { FaWifi, FaBroom, FaUtensils, FaWater, FaBolt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { ROUTE_PATHS } from "../../common";
import { Link } from "react-router-dom";

import RoomRoverLogo from "../../assets/images/logo.png"; // Đường dẫn tới logo

const BoardingHouseDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [];
  const services = [
    { name: "Wi-Fi", icon: <FaWifi /> },
    { name: "Cleaning", icon: <FaBroom /> },
    { name: "Kitchen", icon: <FaUtensils /> },
    { name: "Water", icon: <FaWater /> },
    { name: "Electricity", icon: <FaBolt /> },
  ];

  const setMainImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: ROUTE_PATHS.ROOT }}
          className="text-blue-700 font-semibold"
        >
          Nhà trọ
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link}>Chi tiết nhà trọ</Breadcrumb.Item>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-6">Cozy Downtown Boarding House</h1>

      <div className="mb-4">
        {images.length > 0 ? (
          <img
            src={images[currentImageIndex]}
            alt={`Main house`}
            className="w-full h-96 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-200 rounded">
            <img
              src={RoomRoverLogo}
              alt="RoomRover"
              className="w-48 h-48 mb-4 rounded-full"
            />
            <span className="text-2xl font-semibold text-gray-600 text-center">
              RoomRover
            </span>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                index === currentImageIndex ? "border-2 border-blue-500" : ""
              } rounded-lg`}
              onClick={() => setMainImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-32 h-24 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Mô tả:</h2>
          <p className="text-gray-600 mb-6">
            This charming boarding house offers a cozy and comfortable living
            space in the heart of downtown. With its modern amenities and prime
            location, it's perfect for students and young professionals looking
            for a convenient and enjoyable living experience.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Thông tin nhà:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-blue-500">{service.icon}</span>
                <span>{service.name}</span>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Địa điểm</h2>
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
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Book Now
            </button>
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
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300">
              Contact Lessor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardingHouseDetail;
