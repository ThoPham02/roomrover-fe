import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import { login_user } from "../../assets/images";
import { ROUTE_PATHS } from "../../common";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLogined } = useSelector((state) => state.auth);

  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isLogined && navigate(ROUTE_PATHS.ROOT);
  }, [isLogined, navigate]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    dispatch(actions.login({ phone, password }));
  };

  return (
    <div className="login">
      <div className="auth">
        <div className="auth-header">
          <div className="auth-img">
            <img src={login_user} alt="auth-bg" />
          </div>
          <div className="auth-label">Chào mừng trở lại!</div>
        </div>

        <div className="auth-br"></div>

        <Row className="auth-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
              <Form.Label className="form-label">Số điện thoại</Form.Label>
              <Form.Control
                required
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setPhone(numericValue);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Số điện thoại không hợp lệ.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 form-group"
              controlId="formBasicPassword"
            >
              <Form.Label className="form-label">Mật khẩu</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Thông tin mật khẩu không hợp lệ.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Link
              to={ROUTE_PATHS.REGISTER}
              title="Đăng ký tài khoản"
              className="auth-link"
            >
              Bạn chưa có tài khoản? Đăng ký tài khoản mới!
            </Link>

            <Form.Group controlId="formBasicButton" className="form-group">
              <Button type="submit" className="auth-buton">
                Đăng nhập
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default LoginScreen;
