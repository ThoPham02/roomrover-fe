import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  ContractDetailForm,
  ContractFileModal,
  CreateButton,
  RenterSettingModal,
} from "../../components/ui";
import * as actions from "../../../src/store/actions";
import { apiUpdateContract } from "../../store/services/contractServices";

const ContractDetail = ({ option = "get" }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRenter, setShowRenter] = useState(false);
  const [contract, setContract] = useState({});

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTRACT));
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);

  useEffect(() => {
    if (contractDetail) {
      setContract({ ...contractDetail });
    }
  }, [contractDetail]);

  const handleUpdateButton = () => {
    navigate(ROUTE_PATHS.CONTRACT_UPDATE.replace(":id", id));
  };

  const handleUpdateContract = async () => {
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
        lessor: { ...contract.lessor, userID: user.userID },
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
      const res = await apiUpdateContract(contract.contractID, formData);

      if (res?.result.code === 0) {
        navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <Breadcrumbs
        backRoute={ROUTE_PATHS.CONTRACT}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <ContractDetailForm
        contract={contract}
        setContract={setContract}
        option={option}
        handleSubmit={handleUpdateContract}
      />

      <div className="absolute top-0 right-0 flex">
        {contractDetail?.status === 4 && (
          <CreateButton
            className="mr-4"
            text={"Cài đặt"}
            icon={<></>}
            onClick={() => setShowRenter(true)}
          />
        )}
        {contractDetail?.status === 1 && option === "get" && (
          <CreateButton
            className="mr-4"
            text={"Chỉnh sửa"}
            icon={<></>}
            onClick={handleUpdateButton}
          />
        )}

        <CreateButton
          className=""
          text={"Xem hợp đồng"}
          icon={<></>}
          onClick={() => setShowModal(true)}
        />
      </div>

      {showRenter && (
        <RenterSettingModal
          show={showRenter}
          handleClose={() => setShowRenter(false)}
          id={id}
        />
      )}

      <ContractFileModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        contract={contractDetail}
      />
    </div>
  );
};

export default ContractDetail;
