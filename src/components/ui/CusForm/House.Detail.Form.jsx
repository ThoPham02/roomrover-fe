import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import { TbXboxX } from "react-icons/tb";

import { HOUSE_TYPE } from "../../../common";
import {
  ConfirmActionModal,
  CreateButton,
  CusFormGroup,
  CusFormSelect,
  CusFormUpload,
  CusRoomList,
  CusSelectArea,
  CusServiceList,
} from "..";
import { uploadImage } from "../../../store/services/inventServices";
import CusFormUtils from "./CusFormUtils";

const HouseDetailForm = ({ house, setHouse, handleSubmit, option }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    setIsUploading(true);

    const newAlbums = await Promise.all(
      files.map(async (file) => {
        try {
          const url = await uploadImage(file);
          return {
            url,
            file,
          };
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );

    const validAlbums = newAlbums
      .filter((album) => album !== null)
      .map((album) => album.url);

    setHouse((prevHouse) => ({
      ...prevHouse,
      albums: [...prevHouse.albums, ...validAlbums],
    }));

    setIsUploading(false);
  };

  const validateForm = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(!form.checkValidity());
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setShowModal(true);
  };

  return (
    <Form onSubmit={validateForm} noValidate validated={validated}>
      <Row>
        <p className="font-bold">Hình ảnh nhà trọ:</p>
        <div className="mt-2 mb-4 flex flex-wrap">
          {house?.albums?.map((image, index) => (
            <div className="relative">
              <img
                src={image}
                alt={`Nhà trọ ${index + 1}`}
                className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
                key={image}
              />

              {option !== "get" && (
                <TbXboxX
                  className="text-red-500 text-3xl absolute top-2 right-6"
                  onClick={() =>
                    setHouse((prevHouse) => {
                      const newAlbums = prevHouse.albums.filter(
                        (album) => album !== image
                      );

                      return { ...prevHouse, albums: newAlbums };
                    })
                  }
                />
              )}
            </div>
          ))}

          <CusFormUpload
            disabled={option === "get"}
            handleUpload={handleImageUpload}
            isUploading={isUploading}
          />
        </div>
      </Row>

      <Row>
        <Col>
          <CusFormGroup
            label="Tên nhà trọ"
            required
            placeholder="Nhập tên nhà trọ"
            state={house}
            setState={setHouse}
            keyName={"name"}
            disabled={option === "get"}
            feedback="Tên nhà trọ không được để trống."
          />
          <CusFormGroup
            label="Giá thuê"
            required
            placeholder="Nhập giá thuê"
            state={house}
            setState={setHouse}
            keyName={"price"}
            disabled={option === "get"}
            unit={"VNĐ"}
            feedback="Giá thuê không được để trống."
          />
        </Col>
        <Col>
          <CusFormSelect
            title="Loại hình"
            label="Loại hình"
            labelWidth="min-w-36"
            required
            data={HOUSE_TYPE}
            value={house}
            setValue={setHouse}
            keyName="type"
            disabled={option === "get"}
            noDefault
          />
          <CusFormGroup
            label="Diện tích"
            required
            placeholder="Nhập diện tích"
            state={house}
            setState={setHouse}
            keyName={"area"}
            disabled={option === "get"}
            unit={"m²"}
            feedback="Diện tích không được để trống."
          />
        </Col>
      </Row>
      <Row>
        <CusSelectArea
          area={house}
          setArea={setHouse}
          disabled={option === "get"}
          required
        />
      </Row>
      <Row>
        <CusFormGroup
          label="Mô tả"
          textarea
          placeholder="Nhập mô tả"
          state={house}
          setState={setHouse}
          keyName={"description"}
          disabled={option === "get"}
        />
      </Row>
      <Row>
        <div className="flex flex-wrap">
          <p className="font-bold min-w-36 mr-2">
            Tiện ích <br /> nhà trọ:
          </p>
          <CusFormUtils
            state={house}
            setState={setHouse}
            disable={option === "get"}
          />
        </div>
      </Row>
      <Row>
        <div className="flex flex-wrap  mt-4">
          <p className="font-bold min-w-36 mr-2 mt-4">
            Chi phí <br /> phát sinh:
          </p>
          <CusServiceList
            state={house}
            setState={setHouse}
            disabled={option === "get"}
          />
        </div>
      </Row>
      <Row>
        <div className="flex flex-wrap mt-4">
          <p className="font-bold min-w-36 mr-2 mt-4">
            Danh sách <br /> phòng trọ:
          </p>
          <CusRoomList
            state={house}
            setState={setHouse}
            disabled={option === "get"}
          />
        </div>
      </Row>

      {option !== "get" && (
        <Row className="flex justify-center items-center my-4">
          <CreateButton
            className={"w-36"}
            text="Lưu"
            icon={<></>}
            type="submit"
          />
        </Row>
      )}

      <ConfirmActionModal
        label={<ModalLabel option={option} state={house} setState={setHouse} />}
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={(e) => {
          handleSubmit(e);
          setShowModal(false);
        }}
      />
    </Form>
  );
};

export default HouseDetailForm;

const ModalLabel = ({ state, setState, option }) => {
  var title = "Nhà trọ đang được cập nhật!";

  if (option === "create") {
    title = "Nhà trọ đang được tạo mới!";
  }

  return (
    <div>
      <p className="text-2xl font-semibold">{title}</p>
      <div className="inline-block mt-2">
        <Form.Check
          type="switch"
          id="custom-switch"
          className="text-3xl"
          label="Đăng tin cho thuê"
          checked={state.option === 1}
          onChange={(e) => {
            setState((prev) => {
              return { ...prev, option: e.target.checked ? 1 : 0 };
            });
          }}
        />
      </div>
    </div>
  );
};
