import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATHS } from "../../../common";
import * as actions from "../../../store/actions";
import { apiUpdateRoomStatus } from "../../../store/services/inventServices";
import { ConfirmActionModal } from "../CusModal";

const RoomActionButton = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var [showModal, setShowModal] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDetailBtn = () => {
    navigate(ROUTE_PATHS.ROOM_DETAIL.replace(":id", item.id));
  };

  const { searchParams } = useSelector((state) => state.invent.room);

  const handleUpdateBtn = async () => {
    try {
      let status = item.status === 1 ? 2 : 1;
      const data = await apiUpdateRoomStatus({
        id: item.id,
        status: status,
      });
      if (data?.result.code === 0) {
        dispatch(actions.getListRooms(searchParams));
      } else {
        console.error("Error Update House:", data);
        return;
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return;
    }
  };

  const handleDeleteButton = async () => {
    try {
    } catch (error) {
      console.error("Error Update House:", error);
      return null;
    }
  };

  const handleCreateContract = () => {
    // navigate(ROUTE_PATHS.CONTRACT_CREATE.replace(":id", item.id));
  };

  return (
    <div>
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
              {item.status === 1 && (
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowModal(true);
                    }}
                    className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                  >
                    Cập nhật cho thuê
                  </button>
                </li>
              )}
              {item.status === 2 && (
                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowModal(true);
                    }}
                    className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                  >
                    Tạm dừng cho thuê
                  </button>
                </li>
              )}
              {item.status === 2 && (
                <li>
                  <button
                    onClick={handleCreateContract}
                    className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                  >
                    Tạo hợp đồng
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={handleDeleteButton}
                  className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                >
                  Xóa
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <ConfirmActionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={(e) => {
          handleUpdateBtn(e);
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default RoomActionButton;
