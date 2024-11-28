import { Col, Row } from "react-bootstrap";
import { address } from "../../../common";
import CusFormSelect from "./CusFormSelect";
import CusFormGroup from "./CusFormGroup";

const CusSelectArea = ({ area, setArea, disabled, required, lable = true }) => {
  area = {
    ...area,
    provinceID: String(area?.provinceID).padStart(2, "0"),
    districtID: String(area?.districtID).padStart(3, "0"),
    wardID: String(area?.wardID).padStart(5, "0"),
  };

  return (
    <>
    <Row className="">
      <Col>
        <CusFormSelect
          label={lable && "Tỉnh/TP"}
          labelWidth="min-w-36"
          data={address}
          disabled={disabled}
          value={area}
          setValue={setArea}
          keyName={"provinceID"}
          required={required}
        />
      </Col>
      <Col>
        <CusFormSelect
          label={lable && "Quận/Huyện"}
          labelWidth="min-w-36"
          data={address[area?.provinceID]?.districts}
          // eslint-disable-next-line
          disabled={area?.provinceID == 0 ? true : disabled}
          value={area}
          setValue={setArea}
          keyName={"districtID"}
          required={required}
          noDefault
        />
      </Col>
      <Col>
        <CusFormSelect
          label={lable && "Phường/Xã"}
          labelWidth="min-w-36"
          data={address[area?.provinceID]?.districts[area?.districtID]?.wards}
          // eslint-disable-next-line
          disabled={area?.districtID == 0 ? true : disabled}
          value={area}
          setValue={setArea}
          keyName={"wardID"}
          required={required}
          noDefault
        />
      </Col>
        
      </Row>
      <Row className="mb-4">
        <CusFormGroup
          label={lable && "Địa chỉ"}
          placeholder="Nhập địa chỉ chi tiết"
          state={area}
          setState={setArea}
          keyName={"address"}
          disabled={disabled}
          required={required}
          feedback="Địa chỉ không được để trống."
        />
    </Row>
    </>
  );
};

export default CusSelectArea;
