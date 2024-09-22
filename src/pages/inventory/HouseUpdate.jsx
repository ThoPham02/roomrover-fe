import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { BREADCRUMB_DETAIL, HOUSE_TYPE, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  CreateButton,
  CusFormGroup,
  CusFormSelect,
  CusFormUpload,
  CusSelectArea,
} from "../../components/ui";
import * as actions from "../../store/actions";
import { updateHouse, uploadImage } from "../../store/services/inventServices";

const HouseUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [isUploading, setIsUploading] = useState();
  const [house, setHouse] = useState({});
  const { houseDetail } = useSelector((state) => state.invent.house);

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (houseDetail) {
      setHouse(houseDetail);
    }
  }, [houseDetail]);

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

  const handleUpdateHouse = async (e) => {
    e.preventDefault();
    try {
      const res = await updateHouse({
        ...house,
        type: Number(house.type),
        price: Number(house.price),
        area: Number(house.area),
        albums: JSON.stringify(house.albums),
        provinceID: Number(house.provinceID),
        districtID: Number(house.districtID),
        wardID: Number(house.wardID),
      });

      if (res.result.code === 0) {
        navigate(ROUTE_PATHS.HOUSE_DETAIL.replace(":id", house.houseID));
      }
    } catch (error) {
      console.error("Error Update House:", error);
      return null;
    }
  };

  return (
    <div className="house-update">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["UPDATE"]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL["UPDATE"]}
      />
      <div className="relative">
        <Form onSubmit={handleUpdateHouse}>
          <Row>
            <p className="font-bold">Hình ảnh nhà trọ:</p>
            <div className="mt-2 mb-4 flex flex-wrap">
              {house?.albums?.map((image, index) => (
                <img
                  src={image}
                  alt={`Hình ảnh nhà trọ ${index + 1}`}
                  className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
                  key={image}
                />
              ))}

              <CusFormUpload
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
              />
              <CusFormSelect
                title="Loại hình"
                label="Loại hình"
                required
                data={HOUSE_TYPE}
                value={house}
                setValue={setHouse}
                keyName="type"
              />
              <CusFormGroup
                label="Giá thuê"
                required
                placeholder="Nhập giá thuê"
                state={house}
                setState={setHouse}
                keyName={"price"}
              />
              <CusFormGroup
                label="Diện tích"
                required
                placeholder="Nhập diện tích"
                state={house}
                setState={setHouse}
                keyName={"area"}
              />
            </Col>
            <Col>
              <Row>
                <CusFormGroup
                  label="Địa chỉ "
                  required
                  placeholder="Nhập địa chỉ"
                  state={house}
                  setState={setHouse}
                  keyName={"address"}
                />
              </Row>
              <CusSelectArea area={house} setArea={setHouse} />
            </Col>
          </Row>

          <Row>
            <CusFormGroup
              label="Mô tả"
              textarea
              placeholder="Nhập mô tả"
              state={house}
              setState={setHouse}
              keyName={"description"}
            />
          </Row>

          <Row className="flex justify-center my-4">
            <CreateButton text="Lưu" icon={<></>} />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default HouseUpdate;
