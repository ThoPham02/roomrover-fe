import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { ROUTE_PATHS } from "../../../common";
import * as actions from "../../../store/actions";

const ContractActionButton = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDetailBtn = () => {
    navigate(`${ROUTE_PATHS.CONTRACT}/${item.id}`);
  };

  const handleDelete = () => {
    dispatch(actions.deleteContract(item.id));
  };

  const handleEdit = () => {
    navigate(`${ROUTE_PATHS.CONTRACT}/${item.id}`);
  };

  return (
    <div
      className="relative inline-block "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-3xl">
        <AiOutlineEllipsis className="text-4xl" />
      </button>
      {isMenuOpen && (
        <div className="absolute z-10 top-[15px] right-0 mt-2 bg-white border rounded shadow-lg p-2">
          <ul className="list-none m-0 p-0">
            <li>
              <button
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                onClick={handleDetailBtn}
              >
                Xem
              </button>
            </li>
            <li>
              <button
                onClick={handleEdit}
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
              >
                Chỉnh sửa
              </button>
            </li>
            <li>
              <button
                onClick={handleDelete}
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
              >
                Hủy
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContractActionButton;
