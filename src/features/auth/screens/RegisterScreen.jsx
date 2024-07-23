import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import instance from "../../../api/axios";
import { AUTH_PATHS } from "../constants";
import authUser from "../../../assets/images/login_user.png";
import {USER_ROLE} from "../../../constants";
import { updateUser } from "../context";

const LoginScreen = () => {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    event.preventDefault();

    const roleCheck = form.elements.roleCheck.value;
    const username = form.elements[2].value;
    const email = form.elements[3].value;
    const password = form.elements[4].value;

    const postData = new FormData();
    postData.append("user_name", username);
    postData.append("password", password);
    postData.append("email", email);
    postData.append("user_role", roleCheck);

    instance
      .post(AUTH_PATHS.REGISTER, postData)
      .then((res) => {
        localStorage.setItem("token", res.token);
        dispatch(updateUser(res));

        navigate("/");
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  return (
    <div className="auth">
      <div className="auth-header">
        <div className="auth-img">
          <img src={authUser} alt="auth-bg" />
        </div>
        <div className="auth-label">Đăng ký tài khoản mới</div>
      </div>

      <div className="auth-br"></div>

      <Row className="auth-form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="formRole">
            <Form.Label className="form-label">Vai trò </Form.Label>
            <Form.Check
              inline
              type="radio"
              id="default-radio-1"
              label="Người thuê"
              value={USER_ROLE.RENTER}
              name="roleCheck"
              defaultChecked
            />
            <Form.Check
              inline
              type="radio"
              id="default-radio-2"
              label="Người cho thuê"
              value={USER_ROLE.LESSOR}
              name="roleCheck"
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="formUser">
            <Form.Label className="form-label">Tài khoản</Form.Label>
            <Form.Control required placeholder="Tài khoản" />
            <Form.Control.Feedback type="invalid">
              Thông tin tài khoản không hợp lệ.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="form-group" controlId="formEmail">
            <Form.Label className="form-label">Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control required type="email" placeholder="Email" />
              <Form.Control.Feedback type="invalid">
                Thông tin email không hợp lệ.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="form-group" controlId="formPassword">
            <Form.Label className="form-label">Mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control required type="password" placeholder="Mật khẩu" />
              <Form.Control.Feedback type="invalid">
                Thông tin mật khẩu không hợp lệ.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="form-group" controlId="formPasswordConfirm">
            <Form.Label className="form-label">Nhập lại mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
              <Form.Control.Feedback type="invalid">
                Thông tin mật khẩu không trùng khớp.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Link
            to={AUTH_PATHS.LOG_IN}
            title="Đăng ký tài khoản"
            className="auth-link"
          >
            Bạn đã có tài khoản? Trở lại đăng nhập
          </Link>

          <Form.Group controlId="formButton" className="form-group">
            <Button type="submit" className="auth-buton">
              Đăng ký
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
};

export default LoginScreen;
