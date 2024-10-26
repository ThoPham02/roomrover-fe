import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  ContractDetailForm,
  ContractFileModal,
  CreateButton,
} from "../../components/ui";
import * as actions from "../../../src/store/actions";

const RenterContractDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);

  return (
    <div className="relative">
      <Breadcrumbs
        title={"Chi tiết hợp đồng"}
        backRoute={ROUTE_PATHS.RENTER_CONTRACT}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.RENTER_CONTRACT]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <ContractDetailForm contract={contractDetail} option={"get"} />

      <div className="absolute top-0 right-0 flex">
        <CreateButton
          className=""
          text={"Xem hợp đồng"}
          icon={<></>}
          onClick={() => setShowModal(true)}
        />
      </div>

      <ContractFileModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        contract={contractDetail}
      />
    </div>
  );
};

export default RenterContractDetail;
