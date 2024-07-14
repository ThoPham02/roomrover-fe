import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const LoginScreen = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

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
                </Col>
            </Row>
        </div>
    )
}

export default LoginScreen;