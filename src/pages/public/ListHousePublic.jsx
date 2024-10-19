import { Pagination } from "@mui/material";
import React, { useState } from "react";
import {
  FaWifi,
  FaBroom,
  FaUtensils,
  FaWater,
  FaBolt,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaDollarSign,
  FaUserTie,
  FaParking,
  FaTshirt,
  FaTree,
  FaBicycle,
  FaBook,
  FaDumbbell,
  FaUtensils as FaCafeteria,
  FaShieldAlt,
  FaSearch,
  // FaChevronLeft,
  // FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../common";

const ListHousePublic = () => {
  const hostels = [
    {
      id: 1,
      title: "Cozy Downtown Boarding House",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      description:
        "This charming boarding house offers a cozy and comfortable living space in the heart of downtown. Perfect for students and young professionals.",
      rentalPrice: 800,
      area: 250,
      lessor: "John Doe",
      address: "123 Main St, Anytown, ST 12345",
      amenities: ["Wi-Fi", "Cleaning", "Kitchen", "Water", "Electricity"],
    },
    {
      id: 2,
      title: "Sunny Suburban Hostel",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
      description:
        "A bright and spacious hostel in a quiet suburban area. Ideal for those seeking a peaceful living environment.",
      rentalPrice: 700,
      area: 200,
      lessor: "Jane Smith",
      address: "456 Oak Ave, Suburbia, ST 67890",
      amenities: ["Wi-Fi", "Parking", "Laundry", "Garden", "Bike Storage"],
    },
    {
      id: 3,
      title: "Modern University Dorm",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      description:
        "A state-of-the-art dormitory right on the university campus. Convenient for students with all necessary amenities.",
      rentalPrice: 650,
      area: 180,
      lessor: "University Housing",
      address: "789 Campus Dr, Collegetown, ST 54321",
      amenities: ["Wi-Fi", "Study Rooms", "Gym", "Cafeteria", "24/7 Security"],
    },
    {
      id: 4,
      title: "Eco-Friendly Urban Loft",
      image: "https://images.unsplash.com/photo-1522156373667-4c7234bbd804",
      description:
        "An environmentally conscious loft in the city center, featuring sustainable living practices and a vibrant community.",
      rentalPrice: 900,
      area: 300,
      lessor: "Green Living Co.",
      address: "101 Eco St, Greenville, ST 13579",
      amenities: [
        "Solar Power",
        "Recycling",
        "Organic Garden",
        "Bike Sharing",
        "Energy-Efficient Appliances",
      ],
    },
    {
      id: 5,
      title: "Rustic Countryside Retreat",
      image: "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23",
      description:
        "A charming rustic hostel set in the beautiful countryside, offering a peaceful escape from the city hustle.",
      rentalPrice: 600,
      area: 220,
      lessor: "Country Escapes Ltd.",
      address: "246 Rural Rd, Farmland, ST 97531",
      amenities: [
        "Wi-Fi",
        "Fireplace",
        "Barbecue Area",
        "Hiking Trails",
        "Animal Farm",
      ],
    },
    {
      id: 6,
      title: "Tech Hub Co-Living Space",
      image: "https://images.unsplash.com/photo-1505409859467-3a796fd5798e",
      description:
        "A cutting-edge co-living space designed for tech enthusiasts and entrepreneurs, featuring smart home technology and collaborative workspaces.",
      rentalPrice: 1000,
      area: 280,
      lessor: "TechNest Inc.",
      address: "404 Innovation Ave, Silicon Valley, ST 80086",
      amenities: [
        "High-Speed Wi-Fi",
        "Co-Working Spaces",
        "3D Printing Lab",
        "VR Room",
        "Tech Support",
      ],
    },
  ];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  var total = 6;
  const handleChange = (value) => {
    setCurrentPage(value);
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "Wi-Fi":
        return <FaWifi />;
      case "Cleaning":
        return <FaBroom />;
      case "Kitchen":
        return <FaUtensils />;
      case "Water":
        return <FaWater />;
      case "Electricity":
        return <FaBolt />;
      case "Parking":
        return <FaParking />;
      case "Laundry":
        return <FaTshirt />;
      case "Garden":
        return <FaTree />;
      case "Bike Storage":
        return <FaBicycle />;
      case "Study Rooms":
        return <FaBook />;
      case "Gym":
        return <FaDumbbell />;
      case "Cafeteria":
        return <FaCafeteria />;
      case "24/7 Security":
        return <FaShieldAlt />;
      default:
        return null;
    }
  };

  const filteredHostels = hostels.filter(
    (hostel) =>
      hostel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHostels = filteredHostels.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetail = (id) => {
    navigate(ROUTE_PATHS.HOUSE_DETAIL_PUBLIC.replace(":id", id))
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="p-2 bg-slate-100 rounded">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hostels..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentHostels.map((hostel) => (
          <div
            key={hostel.id}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={hostel.image}
              alt={hostel.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 truncate">
                {hostel.title}
              </h2>
              <p className="text-gray-600 mb-4 h-18 line-clamp-3">
                {hostel.description}
              </p>
              <div className="flex items-center mb-2">
                <FaDollarSign className="text-green-500 mr-2" />
                <span className="font-bold text-lg">
                  ${hostel.rentalPrice}/month
                </span>
              </div>
              <div className="flex items-center mb-2">
                <FaRulerCombined className="text-blue-500 mr-2" />
                <span>{hostel.area} sq ft</span>
              </div>
              <div className="flex items-center mb-2">
                <FaUserTie className="text-purple-500 mr-2" />
                <span>{hostel.lessor}</span>
              </div>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                <span className="text-sm">{hostel.address}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {hostel.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </span>
                ))}
              </div>
              <button
                className="absolute bottom-4 inset-x-3.5  w- bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={() => handleDetail(hostel.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 w-full">
        {hostels.length > 0 && (
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-500">
              Hiển thị{" "}
              {`${(currentPage - 1) * itemsPerPage + 1} - ${
                total > currentPage * itemsPerPage
                  ? currentPage * itemsPerPage
                  : total
              }`}{" "}
              trong tổng số {total} kết quả
            </p>

            <Pagination
              count={Math.ceil(total / itemsPerPage)}
              defaultPage={1}
              siblingCount={0}
              boundaryCount={2}
              page={currentPage}
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHousePublic;
