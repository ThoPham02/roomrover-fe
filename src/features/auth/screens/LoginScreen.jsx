import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { AUTH_PATHS } from "../constants";
import authUser from "../../../assets/images/login_user.png";
import handleApi from "../../../api/handleApi";
import { API_METHOD } from "../../../constants";

const LoginScreen = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    event.preventDefault();

    const username = form.elements[0].value;
    const password = form.elements[1].value;

    const postData = new FormData();
    postData.append("user_name", username);
    postData.append("password", password);

      handleApi({
        path: AUTH_PATHS.LOG_IN,
        method: API_METHOD.POST,
        body: postData,
      }).then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          window.location.href = "/";
        }
      }
    );
  };

  return (
    <div className="auth">
      <div className="auth-header">
        <div className="auth-img">
          <img src={authUser} alt="auth-bg" />
        </div>
        <div className="auth-label">Chào mừng trở lại!</div>
      </div>

      <div className="auth-br"></div>

      <Row className="auth-form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
            <Form.Label className="form-label">Tài khoản</Form.Label>
            <Form.Control required placeholder="Tài khoản" />
            <Form.Control.Feedback type="invalid">
              Thông tin tài khoản không hợp lệ.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
            <Form.Label className="form-label">Mật khẩu</Form.Label>
            <InputGroup hasValidation>
              <Form.Control required type="password" placeholder="Mật khẩu" />
              <Form.Control.Feedback type="invalid">
                Thông tin mật khẩu không hợp lệ.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Link
            to={AUTH_PATHS.REGISTER}
            title="Đăng ký tài khoản"
            className="auth-link"
          >
            Bạn chưa có tài khoản? đăng ký tài khoản mới!
          </Link>

          <Form.Group controlId="formBasicButton" className="form-group">
            <Button type="submit" className="auth-buton">
              Đăng nhập
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </div>
  );
};

export default LoginScreen;
