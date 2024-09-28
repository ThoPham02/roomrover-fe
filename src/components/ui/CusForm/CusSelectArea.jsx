import { Col, Row } from "react-bootstrap";
import { address } from "../../../common";
import CusFormSelect from "./CusFormSelect";

const CusSelectArea = ({ area, setArea, disabled }) => {
  area = {
    ...area,
    provinceID: String(area?.provinceID).padStart(2, "0"),
    districtID: String(area?.districtID).padStart(3, "0"),
    wardID: String(area?.wardID).padStart(5, "0"),
  };

  return (
    <Row className="mb-4">
      <Col>
        <CusFormSelect
          label="Tỉnh/Thành phố*"
          data={address}
          disabled={disabled}
          value={area}
          setValue={setArea}
          keyName={"provinceID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Quận/Huyện*"
          data={address[area?.provinceID]?.districts}
          disabled={disabled}
          value={area}
          setValue={setArea}
          keyName={"districtID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Xã/Phường*"
          data={address[area?.provinceID]?.districts[area?.districtID]?.wards}
          disabled={disabled}
          value={area}
          setValue={setArea}
          keyName={"wardID"}
        />
      </Col>
    </Row>
  );
};

export default CusSelectArea;
