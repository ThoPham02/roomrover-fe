import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  ContractConfirmModal,
  ContractDetailForm,
  ContractFileModal,
  CreateButton,
  RenterSettingModal,
} from "../../components/ui";
import * as actions from "../../../src/store/actions";

const RenterContractDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showContractModal, setShowContractModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRenter, setShowRenter] = useState(false);

  useEffect(() => {
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);

  return (
    <div className="relative">
      <Breadcrumbs
        backRoute={ROUTE_PATHS.RENTER_CONTRACT}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.RENTER_CONTRACT]}
        displayName={"Chi tiết"}
      />

      <ContractDetailForm contract={contractDetail} option={"get"} />

      <div className="absolute top-0 right-0 flex">
        {contractDetail?.status === 1 && (
          <CreateButton
            className="mr-4"
            text={"Xác nhận hợp đồng"}
            icon={<></>}
            onClick={() => setShowConfirmModal(true)}
          />
        )}

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
          onClick={() => setShowContractModal(true)}
        />
      </div>

      <ContractFileModal
        show={showContractModal}
        handleClose={() => setShowContractModal(false)}
        contract={contractDetail}
      />

      {showRenter && (
        <RenterSettingModal
          show={showRenter}
          handleClose={() => setShowRenter(false)}
          id={id}
        />
      )}

      {showConfirmModal && (
        <ContractConfirmModal
          show={showConfirmModal}
          handleClose={() => setShowConfirmModal(false)}
          id={id}
        />
      )}
    </div>
  );
};

export default RenterContractDetail;
