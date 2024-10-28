import { useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { CONTACT_STATUS_CODE, PAGE_SIZE } from "../../../common";
import * as actions from "../../../store/actions";
import { apiDeleteContact } from "../../../store/services/inventServices";

const RenterContactActionButton = ({ item }) => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDelete = async () => {
    try {
      const res = await apiDeleteContact(item.id);

      if (res?.result.code === 0) {
        dispatch(actions.getFilterContact({ limit: PAGE_SIZE, offset: 0 }));
      }
    } catch (error) {
      console.error("Error Delete Contract:", error);
      return;
    }
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
      {isMenuOpen && item.status !== CONTACT_STATUS_CODE.CONFIRMED && (
        <div className="absolute z-10 top-[15px] right-0 mt-2 bg-white border rounded shadow-lg p-2">
          <ul className="list-none m-0 p-0">
            <li>
              <button
                onClick={handleDelete}
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
              >
                Xóa
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RenterContactActionButton;
