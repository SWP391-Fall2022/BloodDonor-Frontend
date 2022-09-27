import { Link } from "react-router-dom";
import styles from '../styles/login.module.css';
import '../index.css';
import { Button, Form, Input } from 'antd';
import { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
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

    handleLogin = async () => {
        let json = {
            method: 'POST',
            body: JSON.stringify({ "username": this.state.username, "password": this.state.password }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }
        const response = await fetch("http://localhost:8080/v1/login", json)
            .then((res) => res.json())
            .catch((error) => { console.log(error) })
        if (response.JSON.success) {
            this.setState({
                message: 'Login successful!'
            })
        } else {
            this.setState({
                message: 'Wrong email or password'
            })
        }
    }

    render() {
        return (
            < div className={styles.mainBackground} >
                <div className={styles.container}>
                    <h1 className={`${styles.title}`}>ĐĂNG NHẬP</h1>
                    <Form layout="vertical">
                        <Form.Item className={styles.formLabel} label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
                            <Input placeholder="Nhập tên đăng nhập" value={this.state.username} onChange={this.handleOnChangeUsername} />
                        </Form.Item>
                        <Form.Item className={styles.formLabel} label="Mật khẩu" name="Password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder="Nhập mật khẩu" value={this.state.password} onChange={this.handleOnChangePassword} />
                        </Form.Item>
                        <Form.Item>
                            <Button className={`${styles.btn}`} type="primary" htmlType="submit" size="large" onClick={this.handleLogin}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{color: 'red'}}>
                        {this.state.message}
                    </div>
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