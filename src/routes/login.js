import { Link } from "react-router-dom";
import styles from '../styles/login.module.css';
import '../index.css';
import { Button, Form, Input } from 'antd';
import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'Test',
            password: 'Test',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = () => {
        console.log(this.state)
    }

    render() {
        return (
            < div className={styles.mainBackground} >
                <div className={styles.container}>
                    <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                    <Form layout="vertical">
                        <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                            <Input placeholder="Nhập tên đăng nhập" value={this.state.username} onChange={this.handleOnChangeUsername}/>
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder="Nhập mật khẩu" value={this.state.password} onChange={this.handleOnChangePassword}/>
                        </Form.Item>
                        <Form.Item>
                            <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large" onClick={this.handleLogin}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className={`${styles.underInfo}`}>
                        <div><Link className={`${styles.link}`} to={"/restore"}>Quên mật khẩu?</Link></div>
                        <div>Chưa có tài khoản? Đăng kí <Link className={`${styles.link}`} to={"/register"}>tại đây</Link></div>
                        <div>HOẶC</div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login;