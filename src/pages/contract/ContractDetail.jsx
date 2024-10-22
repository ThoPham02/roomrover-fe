import { Nav } from "react-bootstrap";
import { useState } from "react";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import ContractFile from "./ContractFile";
import ContractPayment from "./ContractPayment";

const ContractDetail = () => {
  const [tab, setTab] = useState("1");
  const handleSelectTab = (selectedKey) => {
    setTab(selectedKey);
  };

  const renderTab = () => {
    switch (tab) {
      case "1":
        return <ContractFile />;
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
