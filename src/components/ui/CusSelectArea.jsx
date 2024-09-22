import { Col, Row } from "react-bootstrap";
import { address } from "../../common";
import CusFormSelect from "./CusFormSelect";

const CusSelectArea = ({ area, setArea, disabled }) => {
  return (
    <Row className="mb-4">
      <Col>
        <CusFormSelect
          label="Tỉnh/Thành phố*"
          data={address}
          disabled={disabled}
          value={area?.provideID}
          setValue={setArea}
          keyName={"provideID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Quận/Huyện*"
          data={address[area?.provideID]?.districts}
          disabled={disabled}
          value={area?.districtID}
          setValue={setArea}
          keyName={"districtID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Xã/Phường*"
          data={address[area?.provideID]?.districts[area?.districtID]?.wards}
          disabled={disabled}
          value={area?.wardID}
          setValue={setArea}
          keyName={"wardID"}
        />
      </Col>
    </Row>
  );
};

export default CusSelectArea;
