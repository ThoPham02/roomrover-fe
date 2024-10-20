import { Col, Row } from "react-bootstrap";
import { address } from "../../../common";
import CusFormSelect from "./CusFormSelect";
import CusFormGroup from "./CusFormGroup";

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
          label="Thành phố*"
          labelWidth="min-w-36"
          data={address}
          disabled={disabled}
          value={area}
          setValue={setArea}
          keyName={"provinceID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Quận*"
          labelWidth="min-w-36"
          data={address[area?.provinceID]?.districts}
          // eslint-disable-next-line
          disabled={area?.provinceID == 0 ? true : disabled}
          value={area}
          setValue={setArea}
          keyName={"districtID"}
        />
      </Col>
      <Col>
        <CusFormSelect
          label="Phường*"
          labelWidth="min-w-36"
          data={address[area?.provinceID]?.districts[area?.districtID]?.wards}
          // eslint-disable-next-line
          disabled={area?.districtID == 0 ? true : disabled}
          value={area}
          setValue={setArea}
          keyName={"wardID"}
        />
      </Col>
      <Col>
        <CusFormGroup
          label="Địa chỉ"
          placeholder="Nhập địa chỉ chi tiết"
          state={area}
          setState={setArea}
          keyName={"address"}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

export default CusSelectArea;
