import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";
import { Breadcrumbs } from "../../components/ui";
import TabHouseDetail from "./TabHouseDetail";
import TabServiceDetail from "./TabServiceDetail";
import TabRoomDetail from "./TabRoomDetail";

const HouseDetail = () => {
  const [tab, setTab] = useState("1");
  const [option, setOption] = useState("get");

  const { id } = useParams();

  const handleSelectTab = (selectedKey) => {
    setTab(selectedKey);
  };

  const renderTab = () => {
    switch (tab) {
      case "1":
        return <TabHouseDetail id={id} option={option} setOption={setOption} />;
      case "2":
        return (
          <TabServiceDetail id={id} option={option} setOption={setOption} />
        );
      case "3":
        return <TabRoomDetail id={id} option={option} setOption={setOption} />;
      default:
        return <div>Tab content</div>;
    }
  };

  return (
    <div className="house-detail-page">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["DETAIL"]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <Nav variant="tabs" onSelect={handleSelectTab} className="mb-2">
        <Nav.Item>
          <Nav.Link eventKey={1} active={tab === "1"}>
            Thông tin nhà trọ
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={2} active={tab === "2"}>
            Chi phí phát sinh
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey={3} active={tab === "3"}>
            Danh sách phòng
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {renderTab()}
    </div>
  );
};

export default HouseDetail;
