import React, { Component } from 'react';
import styles from '../styles/otp.module.css';
import { Link, Navigate } from "react-router-dom";
import { Button } from 'antd';
import OtpInput from "react-otp-input";

export default class Otp extends Component {

    state = { otp: '' };

    handleChange = (otp) => this.setState({ otp });
    render() {

        if (!sessionStorage.getItem('checkLogin')) {
            return <Navigate to={'/login'} replace />
        } else return (
            <div className={styles.container}>
                <div className={styles.content}>Mã xác nhận đã được gửi qua mail của bạn</div>
                <div className={styles.content}>Kiểm tra mail để xác nhận thông tin</div>
                <OtpInput className={styles.otp}
                    numInputs={6}
                    value={this.state.otp}
                    onChange={this.handleChange}
                    isInputNum={true}
                    containerStyle={{ display: "flex", justifyContent: "center" }}
                    inputStyle={{
                        width: "60px",
                        height: "90px",
                        margin: "30px 15px",
                        fontSize: "64px",
                        borderRadius: 10,
                        border: "3px solid"
                    }} />
                <div className={styles.content}>Gửi lại mã trong 60s</div>
            </div>
        )
    }
}