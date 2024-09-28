import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { ServiceModal } from "../../containers";
import {
  deleteService,
  getService,
  updateService,
} from "../../../store/services/inventServices";
import * as actions from "../../../store/actions";

const ServiceActionButton = ({ item }) => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [service, setService] = useState({});

  const handleMouseEnter = () => setIsMenuOpen(true);
  const handleMouseLeave = () => setIsMenuOpen(false);

  const handleUpdateBtn = async () => {
    try {
      const res = await getService(item.serviceID);

      if (res.result.code === 0) {
        setService(res.service);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error Create Service:", error);
      return null;
    }

    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    try {
      const res = await updateService(service);

      if (res.result.code === 0) {
        dispatch(actions.getHouseServiceAction(item.houseID));
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error Create Service:", error);
      return null;
    }
  };

  const handleDeleteButton = async () => {
    try {
      const res = await deleteService(item.serviceID);

      if (res.result.code === 0) {
        dispatch(actions.getHouseServiceAction(item.houseID));
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
                onClick={handleUpdateBtn}
                className="block w-full text-left pl-2 pr-8 py-2 hover:bg-gray-200"
              >
                Chỉnh sửa
              </button>
            </li>
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

      <ServiceModal
        showModal={showModal}
        setShowModal={setShowModal}
        service={service}
        setService={setService}
        handleSubmit={handleUpdate}
        option="edit"
      />
    </div>
  );
};

export default ServiceActionButton;
