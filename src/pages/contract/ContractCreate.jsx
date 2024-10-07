import { Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ROUTE_PATHS } from "../../common";
import { CusFormDate, CusFormGroup, CusFormSearch } from "../../components/ui";

const ContractCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const [contract, setContract] = useState({
    renter: user,
  });
  const [searchRoom, setSearchRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // console.log(user);
  }, [searchRoom]);

  console.log(contract);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: ROUTE_PATHS.CONTRACT }}
          className="text-blue-700 font-semibold"
        >
          Hợp đồng
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link}>Tạo mới hợp đồng</Breadcrumb.Item>
      </Breadcrumb>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <p className="font-medium">Bên cho thuê:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormGroup
                label={"Số điện thoại"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số điện thoại"}
                keyName={"renter.phone"}
                required
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Họ và tên"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập họ và tên"}
                keyName={"renter.fullName"}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Số CCCD"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số CCCD"}
                keyName={"renter.cccdNumber"}
                required
              />
            </Col>
            <Col>
              <CusFormDate
                label={"Ngày cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập ngày cấp"}
                keyName={"renter.cccdDate"}
                required
                position={"right"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Nơi cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập nơi cấp"}
                keyName={"renter.cccdAddress"}
                required
              />
            </Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Bên thuê:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormSearch
                label={"Số điện thoại"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số điện thoại"}
                keyName={"lessorPhone"}
                required
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Họ và tên"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập họ và tên"}
                keyName={"lessorName"}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Số CCCD"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số CCCD"}
                keyName={"lessorCCD"}
                required
              />
            </Col>
            <Col>
              <CusFormDate
                label={"Ngày cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập ngày cấp"}
                keyName={"lessorDate"}
                required
                position={"right"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Nơi cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập nơi cấp"}
                keyName={"lessorAddress"}
                required
              />
            </Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Thông tin nhà:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col className="relative flex">
              <CusFormGroup
                label={"Tên nhà"}
                state={searchRoom}
                setState={setSearchRoom}
                placeholder={"Nhập tên nhà"}
                keyName={"search"}
                required
              />

              <div className="absolute left-40 top-12 z-10">
                <ul className="list-none p-0 m-0"></ul>
              </div>
            </Col>
            <Col>
              <CusFormGroup
                label={"Phòng"}
                state={contract}
                setState={setContract}
                placeholder={"Phòng"}
                keyName={"roomName"}
                disabled
              />
            </Col>
          </Row>
          <CusFormGroup
            label={"Địa chỉ"}
            state={contract}
            setState={setContract}
            placeholder={"Địa chỉ"}
            keyName={"houseAddress"}
            disabled
          />

          <Row>
            <Col>
              <CusFormGroup
                label={"Diện tích"}
                state={contract}
                setState={setContract}
                placeholder={"Diện tích"}
                keyName={"houseArea"}
                disabled
                unit={"m²"}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Thông tin thanh toán:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormGroup
                label={"Giá phòng"}
                state={contract}
                setState={setContract}
                placeholder={"Giá phòng"}
                keyName={"housePrice"}
                disabled
                unit={"VNĐ"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Thời gian thuê"}
                state={contract}
                setState={setContract}
                placeholder={"Thời gian thuê"}
                keyName={"duration"}
                required
                unit={"tháng"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Giảm giá"}
                state={contract}
                setState={setContract}
                placeholder={"Giảm giá"}
                keyName={"discount"}
                unit={"VNĐ"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Cọc"}
                labelWidth={"min-w-16"}
                state={contract}
                setState={setContract}
                placeholder={"Số tiền cọc"}
                keyName={"deposit"}
                required
                unit={"VNĐ"}
              />
            </Col>
            <Col>
              <CusFormDate
                label={"ngày"}
                labelWidth={"min-w-14"}
                state={contract}
                setState={setContract}
                placeholder={"hạn cọc"}
                keyName={"depositDate"}
                required
                position={"right"}
              />
            </Col>
          </Row>
          <CusFormGroup
            label={"Mục đích"}
            state={contract}
            setState={setContract}
            placeholder={"Nhập mục đích sử dụng"}
            keyName={"purpose"}
            required
            textarea
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            className="px-6 py-2 bg-primary2 rounded text-white"
          >
            Tạo hợp đồng
          </Button>
        </div>
      </Form>

      {/* <div>
        <Modal
          show={showSearchRoom}
          onHide={handleClose}
          size="lg"
          centered
          backdrop="true"
        >
          <Modal.Body>
            <div>
              <h3 className="">Tìm kiếm phòng</h3>

              <div className="p-2 bg-slate-100 rounded">
                
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div> */}
    </div>
  );
};

export default ContractCreate;
