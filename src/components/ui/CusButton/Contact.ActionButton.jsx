import { useDispatch } from "react-redux";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { CONTACT_STATUS_CODE, PAGE_SIZE } from "../../../common";
import * as actions from "../../../store/actions";
import { apiUpdateStatusContact } from "../../../store/services/inventServices";

const ContactActionButton = ({ item }) => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  //   const handleDelete = async () => {
  //     try {
  //       const res = await apiDeleteContact(item.contactID);

  //       if (res?.result.code === 0) {
  //         dispatch(actions.getFilterContact({ limit: PAGE_SIZE, offset: 0 }));
  //       }
  //     } catch (error) {
  //       console.error("Error Delete Contract:", error);
  //       return;
  //     }
  //   };

  const handleConfirm = async () => {
    try {
      const data = await apiUpdateStatusContact({
        id: item.id,
        status: CONTACT_STATUS_CODE.CONFIRMED,
      });
      if (data?.result.code === 0) {
        dispatch(actions.getFilterContact({ limit: PAGE_SIZE, offset: 0 }));
      } else {
        console.error("Error Update House:", data);
        return;
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return;
    }
  };

  const handleCancel = async () => {
    try {
      const data = await apiUpdateStatusContact({
        id: item.id,
        status: CONTACT_STATUS_CODE.CANCELED,
      });
      if (data?.result.code === 0) {
        dispatch(actions.getFilterContact({ limit: PAGE_SIZE, offset: 0 }));
      } else {
        console.error("Error Update House:", data);
        return;
      }
    } catch (error) {
      console.error("Error Update House:", error);
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
      {isMenuOpen && item.status !== CONTACT_STATUS_CODE.CANCELED && (
        <div className="absolute z-10 top-[15px] right-0 mt-2 bg-white border rounded shadow-lg p-2">
          <ul className="list-none m-0 p-0">
            {item.status === CONTACT_STATUS_CODE.WAITING && (
              <li>
                <button
                  onClick={handleConfirm}
                  className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                >
                  Đồng ý
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleCancel}
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
              >
                Từ chối
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactActionButton;