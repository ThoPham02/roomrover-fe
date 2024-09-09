import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { ROUTE_PATHS, USER_ROLES } from "../../common";
import {login_user} from "../../assets/images";


const RegisterScreen = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);

    }

    return (
      <div className="register">
        <div className="auth">
      <div className="auth-header">
        <div className="auth-img">
          <img src={login_user} alt="auth-bg" />
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
              value={USER_ROLES.RENTER}
              name="roleCheck"
              defaultChecked
            />
            <Form.Check
              inline
              type="radio"
              id="default-radio-2"
              label="Người cho thuê"
              value={USER_ROLES.LESSOR}
              name="roleCheck"
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="formUser">
            <Form.Label className="form-label">Số điện thoại</Form.Label>
            <Form.Control required type="number" placeholder="Số điện thoại" />
            <Form.Control.Feedback type="invalid">
              Số điện thoại không hợp lệ.
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
            to={ROUTE_PATHS.LOGIN}
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
      </div>
    );
  };
  
  export default RegisterScreen;
  