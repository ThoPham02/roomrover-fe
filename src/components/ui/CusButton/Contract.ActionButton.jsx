import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { CONTRACT_STATUS_CODE, PAGE_SIZE, ROUTE_PATHS } from "../../../common";
import * as actions from "../../../store/actions";
import { apiUpdateStatusContract } from "../../../store/services/contractServices";
import { ConfirmActionModal } from "../CusModal";

const ContractActionButton = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDetailBtn = () => {
    navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", item.contractID));
  };

  const handleEdit = () => {
    navigate(ROUTE_PATHS.CONTRACT_UPDATE.replace(":id", item.contractID));
  };

  // const handleDelete = () => {};

  const handleCancel = async () => {
    setIsMenuOpen(false);

    try {
      const data = await apiUpdateStatusContract({
        contractID: item.contractID,
        status: CONTRACT_STATUS_CODE.CANCELED,
      });
      if (data?.result.code === 0) {
        dispatch(actions.getListContract({ limit: PAGE_SIZE, offset: 0 }));
      } else {
        console.error("Error Update House:", data);
        return;
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return;
    }
  };

  const handleComfirmDeposit = async () => {
    setIsMenuOpen(false);

    try {
      const data = await apiUpdateStatusContract({
        id: item.contractID,
        status: CONTRACT_STATUS_CODE.RENTING,
      });
      if (data?.result.code === 0) {
        dispatch(actions.getListContract({ limit: PAGE_SIZE, offset: 0 }));
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
      {isMenuOpen && (
        <div className="absolute z-10 top-[15px] right-0 mt-2 bg-white border rounded shadow-lg p-2">
          <ul className="list-none m-0 p-0">
            <li>
              <button
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200 min-w-48"
                onClick={handleDetailBtn}
              >
                Xem chi tiết
              </button>
            </li>
            {item.status === CONTRACT_STATUS_CODE.WAITING_DEPOSIT && (
              <li>
                <button
                  onClick={handleComfirmDeposit}
                  className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                >
                  Xác nhận đã cọc
                </button>
              </li>
            )}

            {item.status === CONTRACT_STATUS_CODE.WAITING && (
              <>
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
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowCancelModal(true)
                    }}
                    className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                </li>
              </>
            )}

            {item.status === CONTRACT_STATUS_CODE.RENTING && (
              <li>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowCancelModal(true)
                  }}
                  className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                >
                  Hủy
                </button>
              </li>
            )}
          </ul>
        </div>
      )}

      {showCancelModal && (
        <ConfirmActionModal
          show={showCancelModal}
          handleClose={() => setShowCancelModal(false)}
          handleConfirm={handleCancel}
        />
      )}
    </div>
  );
};

export default ContractActionButton;
