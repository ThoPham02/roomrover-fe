import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

import { CONTRACT_STATUS_CODE, PAGE_SIZE, ROUTE_PATHS } from "../../../common";
import * as actions from "../../../store/actions";
import { apiUpdateStatusContract } from "../../../store/services/contractServices";
import ConfirmActionModal from "../CusModal/ConfirmAction.Modal";
import { ContractConfirmModal } from "../CusModal";

const RenterContractActionButton = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDetailBtn = () => {
    navigate(
      ROUTE_PATHS.RENTER_CONTRACT_DETAIL.replace(":id", item.contractID)
    );
  };

  const handleDelete = async () => {
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

  return (
    <>
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
              {item?.status === CONTRACT_STATUS_CODE.WAITING && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowModal(true);
                      }}
                      className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                    >
                      Xác nhận thuê
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowModalCancel(true)}
                      className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                    >
                      Hủy
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
      <ConfirmActionModal
        show={showModalCancel}
        handleClose={() => setShowModalCancel(false)}
        handleConfirm={handleDelete}
        label={"Bạn có chắc chắn muốn hủy hợp đồng không?"}
      />

      {showModal && (
        <ContractConfirmModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          id={item.contractID}
        />
      )}
    </>
  );
};

export default RenterContractActionButton;
