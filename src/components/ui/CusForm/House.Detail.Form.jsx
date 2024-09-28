import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { HOUSE_TYPE } from "../../../common";
import { CreateButton, CusFormGroup, CusFormSelect, CusFormUpload, CusSelectArea } from "..";
import { uploadImage } from "../../../store/services/inventServices";

const HouseDetailForm = ({
  houseDetail,
  setHouseDetail,
  handleSubmit,
  option,
}) => {
  const [isUploading, setIsUploading] = useState(false);

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

    setHouseDetail((prevHouse) => ({
      ...prevHouse,
      albums: [...prevHouse.albums, ...validAlbums],
    }));

    setIsUploading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <p className="font-bold">Hình ảnh nhà trọ:</p>
        <div className="mt-2 mb-4 flex flex-wrap">
          {houseDetail?.albums.map((url, index) => (
            <img
              src={url}
              alt={`Hình ảnh nhà trọ ${index + 1}`}
              className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
              key={url}
            />
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
            disabled={option === "get"}
            placeholder="Nhập tên nhà trọ"
            state={houseDetail}
            setState={setHouseDetail}
            keyName={"name"}
          />
          <CusFormSelect
            title="Loại hình"
            label="Loại hình"
            required
            data={HOUSE_TYPE}
            value={houseDetail}
            setValue={setHouseDetail}
            disabled={option === "get"}
            keyName="type"
          />
          <CusFormGroup
            label="Giá thuê"
            required
            placeholder="Nhập giá thuê"
            state={houseDetail}
            setState={setHouseDetail}
            disabled={option === "get"}
            keyName={"price"}
          />
          <CusFormGroup
            label="Diện tích"
            required
            placeholder="Nhập diện tích"
            state={houseDetail}
            setState={setHouseDetail}
            disabled={option === "get"}
            keyName={"area"}
          />
        </Col>
        <Col>
          <Row>
            <CusSelectArea
              area={houseDetail}
              setArea={setHouseDetail}
              disabled={option === "get"}
            />
            <CusFormGroup
              label="Địa chỉ "
              required
              placeholder="Nhập địa chỉ"
              state={houseDetail}
              setState={setHouseDetail}
              disabled={option === "get"}
              keyName={"address"}
            />
          </Row>
        </Col>
      </Row>

      <Row>
        <CusFormGroup
          label="Mô tả"
          textarea
          placeholder="Nhập mô tả"
          state={houseDetail}
          setState={setHouseDetail}
          disabled={option === "get"}
          keyName={"description"}
        />
      </Row>

      {option !== "get" && (
        <Row className="flex justify-center my-4">
          <CreateButton text="Lưu" icon={<></>} />
        </Row>
      )}
    </Form>
  );
};

export default HouseDetailForm;
