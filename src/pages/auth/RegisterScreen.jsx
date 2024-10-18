import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATHS, USER_ROLES } from "../../common";
import { login_user } from "../../assets/images";
import * as actions from "../../store/actions";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [role, setRole] = useState(USER_ROLES.RENTER);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (password !== confirmPassword) {
      setCheckPassword(true);
      event.stopPropagation();
      return;
    } else {
      setCheckPassword(false);
    }
    setValidated(true);

    dispatch(
      actions.register({
        phone,
        password,
        user_role: role,
      })
    );
  };

  const { isLogined } = useSelector((state) => state.auth);

  useEffect(() => {
    isLogined && navigate(ROUTE_PATHS.ROOT);
  }, [isLogined, navigate]);

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

            <Form.Group className="form-group" controlId="formPassword">
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

            <Form.Group className="form-group" controlId="formPasswordConfirm">
              <Form.Label className="form-label">Nhập lại mật khẩu</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  isInvalid={checkPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Thông tin mật khẩu không trùng khớp.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="form-group" controlId="formRoleCheck">
              <Form.Check
                className="my-2"
                type="checkbox"
                label="Đăng ký trở thành người cho thuê"
                id="role-check"
                checked={role === USER_ROLES.LESSOR}
                onChange={(e) => {
                  setRole(
                    e.target.checked ? USER_ROLES.LESSOR : USER_ROLES.RENTER
                  );
                }}
              />
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
