import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  ContractDetailForm,
  ContractFileModal,
  CreateButton,
  RenterSettingModal,
} from "../../components/ui";
import * as actions from "../../../src/store/actions";

const ContractDetail = ({ option = "get" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
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
        handleSubmit={() => setShowConfirm}
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

      {}
    </div>
  );
};

export default ContractDetail;
