import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

const HouseActionButton = ({ house }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-2xl">
        <AiOutlineEllipsis />
      </button>
      {isMenuOpen && (
        <div className="absolute z-10 -top-1 right-0 mt-2 bg-white border rounded shadow-lg p-2">
          <ul className="list-none m-0 p-0">
            <li>
              <button className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200">
                Xem
              </button>
            </li>
            <li>
              <button className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200">
                Chỉnh sửa
              </button>
            </li>
            <li>
              <button className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200">
                Xóa
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HouseActionButton;
