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
import { apiUpdateStatusContract } from "../../store/services/contractServices";

const ContractDetail = ({ option = "get" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showRenter, setShowRenter] = useState(false);
  const [contract, setContract] = useState({});

  useEffect(() => {
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);

  useEffect(() => {
    if (contractDetail) {
      setContract(contractDetail);
    }
  }, [contractDetail]);

  const handleUpdateContract = async () => {
    try {
      const res = await apiUpdateStatusContract(contract);

      if (res?.result.code === 0) {
        dispatch(actions.getContractDetail(id));

        navigate(ROUTE_PATHS.CONTRACT_DETAIL.replace(":id", id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <Breadcrumbs
        title={"Chi tiết hợp đồng"}
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
