import { Col, Row } from "react-bootstrap";
import { address } from "../../common";
import CusFormSelect from "./CusFormSelect";

const CusSelectArea = ({ area, setArea, disabled }) => {
  return (
    <Row className="mb-4">
      <Col>
        <p>Tỉnh/Thành phố</p>
        <CusFormSelect
          label="Tỉnh/Thành phố"
          data={address}
          disabled={disabled}
          value={area?.provideID}
          onChange={(e) => setArea({ ...area, provideID: e.target.value })}
        />
      </Col>
      <Col>
        <p>Quận/Huyện</p>
        <CusFormSelect
          label="Quận/Huyện"
          data={address[area?.provideID]?.districts}
          disabled={disabled}
          value={area?.districtID}
          onChange={(e) => setArea({ ...area, districtID: e.target.value })}
        />
      </Col>
      <Col>
        <p>Xã/Phường</p>
        <CusFormSelect
          label="Xã/Phường"
          data={address[area?.provideID]?.districts[area?.districtID]?.wards}
          disabled={disabled}
          value={area?.wardID}
          onChange={(e) => setArea({ ...area, wardID: e.target.value })}
        />
      </Col>
    </Row>
  );
};

export default CusSelectArea;
