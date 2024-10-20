import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { HOUSE_TYPE } from "../../../common";
import {
  CreateButton,
  CusFormGroup,
  CusFormSelect,
  CusFormUpload,
  CusRoomList,
  CusSelectArea,
  CusServiceList,
} from "..";
import { uploadImage } from "../../../store/services/inventServices";

const HouseDetailForm = ({ house, setHouse, handleSubmit, option }) => {
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

    setHouse((prevHouse) => ({
      ...prevHouse,
      albums: [...prevHouse.albums, ...validAlbums],
    }));

    setIsUploading(false);
  };

  console.log("HouseDetailForm -> house", house);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <p className="font-bold">Hình ảnh nhà trọ:</p>
        <div className="mt-2 mb-4 flex flex-wrap">
          {house?.albums.map((image, index) => (
            <img
              src={image}
              alt={`Hình ảnh nhà trọ ${index + 1}`}
              className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
              key={image}
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
            placeholder="Nhập tên nhà trọ"
            state={house}
            setState={setHouse}
            keyName={"name"}
            disabled={option === "get"}
          />
          <CusFormGroup
            label="Giá thuê"
            required
            placeholder="Nhập giá thuê"
            state={house}
            setState={setHouse}
            keyName={"price"}
            disabled={option === "get"}
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
          />
          <CusFormGroup
            label="Diện tích"
            required
            placeholder="Nhập diện tích"
            state={house}
            setState={setHouse}
            keyName={"area"}
            disabled={option === "get"}
          />
        </Col>
      </Row>
      <Row>
        <CusSelectArea area={house} setArea={setHouse} disabled={option === "get"}/>
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
        <p className="font-bold">Danh sách phòng trọ:</p>
        <div className="flex flex-wrap">
          <CusRoomList
            state={house}
            setState={setHouse}
            disabled={option === "get"}
          />
        </div>
      </Row>

      <Row>
        <p className="font-bold">Chi phí phát sinh:</p>
        <div className="flex flex-wrap">
          <CusServiceList
            state={house}
            setState={setHouse}
            disabled={option === "get"}
          />
        </div>
      </Row>

      {option !== "get" && (
        <Row className="flex justify-center my-4">
          <CreateButton text="Lưu" icon={<></>} onClick={handleSubmit} />
        </Row>
      )}
    </Form>
  );
};

export default HouseDetailForm;
