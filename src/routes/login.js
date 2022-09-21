import { Link } from "react-router-dom";
import '../styles/login.css';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
        <Container className="container font">
            <div className="row">
                <h1 className="col-sm-12 text-center title">ĐĂNG NHẬP</h1>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label class="form-label">Tên đăng nhập</Form.Label>
                        <Form.Control type="text" size="lg" placeholder="Nhập tên tài khoản" />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label class="form-label">Mật khẩu</Form.Label>
                        <Form.Control type="password" size="lg" placeholder="Nhập mật khẩu" />
                    </Form.Group>
                    <div className="d-grid">
                        <Button class="btn btn-secondary" size="lg" type="submit">
                            Đăng nhập
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="under-info text-center">
                <div>Quên mật khẩu?</div>
                <div>Chưa có tài khoản? Đăng kí <Link to={"/register"}>tại đây</Link></div>
                <div>HOẶC</div>
            </div>
        </Container>
    )
};

export default Login;