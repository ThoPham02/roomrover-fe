import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ROUTE_PATHS } from "../../common";
import { ContractDetailForm } from "../../components/ui";
import { apiCreateContract } from "../../store/services/contractServices";

const ContractCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [contract, setContract] = useState({
    lessor: user,
    renter: {},
    room: {},
    payment: {},
    paymentRenters: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      contract.price = contract.room.price;
      const data = {
        ...contract,
        room: {
          ...contract.room,
          eIndex: Number(contract.room.eIndex),
          wIndex: Number(contract.room.wIndex),
        },
        deposit: contract.payment.deposit,
        depositDate: contract.payment.depositDate,
      };

      for (const [key, value] of Object.entries(data)) {
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const res = await apiCreateContract(formData);
      if (res?.result?.code === 0) {
        navigate(ROUTE_PATHS.CONTRACT);
      }
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: ROUTE_PATHS.CONTRACT }}
          className="text-blue-700 font-semibold"
        >
          Hợp đồng
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link}>Tạo mới hợp đồng</Breadcrumb.Item>
      </Breadcrumb>

      <ContractDetailForm
        contract={contract}
        setContract={setContract}
        handleSubmit={handleSubmit}
        option={"create"}
      />
    </div>
  );
};

export default ContractCreate;
