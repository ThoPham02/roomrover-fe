import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import ContractFile from "./ContractFile";
import ContractPayment from "./ContractPayment";
import * as actions from "../../../src/store/actions";

const ContractDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);
  const [tab, setTab] = useState("1");
  const handleSelectTab = (selectedKey) => {
    setTab(selectedKey);
  };

  const renderTab = () => {
    switch (tab) {
      case "1":
        return <ContractFile item={contractDetail} />;
      case "2":
        return <ContractPayment />;
      default:
        return <div>Tab content</div>;
    }
  };

  return (
    <div>
      <Breadcrumbs
        title={"Chi tiết hợp đồng"}
        backRoute={ROUTE_PATHS.CONTRACT}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <Nav variant="tabs" onSelect={handleSelectTab} className="mb-2">
        <Nav.Item>
          <Nav.Link eventKey={1} active={tab === "1"}>
            File hợp đồng
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2} active={tab === "2"}>
            Thông tin thanh toán
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {renderTab()}
    </div>
  );
};

export default ContractDetail;
