import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';


import instance from '../../../api/axios';

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

        console.log(username)
        console.log(password)
        const postData = new FormData();
        postData.append('user_name', username);
        postData.append('password', password);


        instance.post("/users/login", postData).then((response) => {
            console.log(response);

            localStorage.setItem("token", response.token);
            window.location.href = "/";

            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="border medium-tag">
            <Row className="justify-content-center">
                <Col xs={12} md={9}>
                    <h2 className="text-center">Chào mừng bạn trở lại!</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tài khoản</Form.Label>
                            <Form.Control required placeholder="Tài khoản" />
                            <Form.Control.Feedback type="invalid">
                                Thông tin tài khoản không hợp lệ.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control required type="password" placeholder="Mật khẩu" />
                                <Form.Control.Feedback type="invalid">
                                    Thông tin mật khẩu không hợp lệ.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Nhớ thông tin đăng nhập" />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-center align-items-center" controlId="formBasicButton">
                            <Button variant="primary" type="submit">
                                Đăng nhập
                            </Button>
                        </Form.Group>
                    </Form>

                    <div className="d-flex justify-content-center align-items-center">
                        <NavLink to="/auth/register">Tao tai khoan moi</NavLink>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen;