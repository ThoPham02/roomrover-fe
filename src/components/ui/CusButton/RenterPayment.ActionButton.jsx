import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

import { BILL_STATUS_CODE, ROUTE_PATHS } from "../../../common";
// import * as actions from "../../../store/actions";
import { apiZaloPayment } from "../../../store/services/paymentServices";

const RenterPaymentActionButton = ({ item }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleDetailBtn = () => {
    navigate(ROUTE_PATHS.RENTER_PAYMENT_DETAIL.replace(":id", item.id));
  };

  const handlePaymentOnline = async () => {
    try {
      const res = await apiZaloPayment(item.billID);

      if (res.result.code === 0) {
        console.log("res.result.data", res);

        window.open(res.orderUrl, '_blank');

        // const data = {
        //   limit: PAGE_SIZE,
        //   offset: 0,
        // };
        // dispatch(actions.getListHouses(data));
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return null;
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
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                onClick={handleDetailBtn}
              >
                Xem
              </button>
            </li>

            {item.status === BILL_STATUS_CODE.WAITING_PAYMENT && (
              <li>
                <button
                  className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
                  onClick={handlePaymentOnline}
                >
                  Thanh toán online
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RenterPaymentActionButton;
