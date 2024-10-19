import { Breadcrumb, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";

import { GENDER_TYPE, ROUTE_PATHS } from "../../common";
import { default_avatar } from "../../assets/images";
import { uploadImage } from "../../store/services/inventServices";
import { CusFormDate, CusFormGroup, CusFormSelect } from "../../components/ui";
import * as actions from "../../store/actions";

const UserSetting = () => {
  const dispatch = useDispatch();

  var { user } = useSelector((state) => state.auth);

  const [userSetting, setUserSetting] = useState(user);
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.USER_SETTINGS));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    setIsUploading(true);

    try {
      const url = await uploadImage(file);

      setUserSetting((prevUser) => ({
        ...prevUser,
        avatarUrl: url,
      }));
      setIsUploading(false);
      return {
        url,
        file,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(actions.updateCurrentUser(userSetting));
  };

  return (
    <div className="p-3 bg-white rounded">
      <div>
        <Breadcrumb>
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: ROUTE_PATHS.USER_SETTINGS }}
            className="text-blue-700 font-semibold"
          >
            Cài đặt
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link}>Tài khoản của tôi</Breadcrumb.Item>
        </Breadcrumb>

        <Form onSubmit={handleSubmit}>
          <div className="relative h-32 border-b-2 mb-20">
            <div
              className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onMouseEnter={() => setHoverAvatar(true)}
              onMouseLeave={() => setHoverAvatar(false)}
            >
              {isUploading ? (
                <div className="w-32 h-32 rounded-full border flex items-center justify-center bg-white">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                <>
                  <img
                    alt="avatar"
                    src={
                      userSetting.avatarUrl
                        ? userSetting.avatarUrl
                        : default_avatar
                    }
                    className="w-32 h-32 rounded-full"
                  />
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full ${
                      hoverAvatar ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-300`}
                  >
                    <FaCamera className="text-white text-2xl" />
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <Row>
              <Col>
                <CusFormGroup
                  state={userSetting}
                  keyName={"phone"}
                  label="Số điện thoại"
                  disabled
                />
              </Col>
              <Col>
                <CusFormGroup
                  state={userSetting}
                  keyName={"password"}
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu mới"
                />

                <CusFormGroup
                  state={userSetting}
                  keyName={"checkPassword"}
                  placeholder="Nhập lại mật khẩu"
                />
              </Col>
            </Row>
            <CusFormGroup
              label="Họ và tên"
              state={userSetting}
              setState={setUserSetting}
              keyName={"fullName"}
            />
            <CusFormGroup
              label="Quê quán"
              state={userSetting}
              setState={setUserSetting}
              keyName={"address"}
            />
            <Row>
              <Col>
                <CusFormDate
                  label="Ngày sinh"
                  labelWidth={"min-w-36"}
                  placeholder="Ngày sinh"
                  state={userSetting}
                  setState={setUserSetting}
                  keyName={"birthday"}
                  position={"right"}
                />
              </Col>
              <Col>
                <CusFormSelect
                  label="Giới tính"
                  labelWidth={"min-w-36"}
                  value={userSetting}
                  setValue={setUserSetting}
                  keyName={"gender"}
                  defaultValue="Chọn giới tính"
                  data={GENDER_TYPE}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CusFormGroup
                  label={"Số CCCD"}
                  state={userSetting}
                  setState={setUserSetting}
                  placeholder={"Nhập số CCCD"}
                  keyName={"cccdNumber"}
                  required
                />
              </Col>
              <Col>
                <CusFormDate
                  label={"Ngày cấp"}
                  state={userSetting}
                  setState={setUserSetting}
                  placeholder={"Nhập ngày cấp"}
                  keyName={"cccdDate"}
                  required
                  position={"right"}
                />
              </Col>
              <Col>
                <CusFormGroup
                  label={"Nơi cấp"}
                  state={userSetting}
                  setState={setUserSetting}
                  placeholder={"Nhập nơi cấp"}
                  keyName={"cccdAddress"}
                  required
                />
              </Col>
            </Row>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              className="px-6 py-2 bg-primary2 rounded text-white"
            >
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserSetting;
