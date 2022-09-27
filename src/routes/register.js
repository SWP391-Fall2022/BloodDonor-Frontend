import { Link } from "react-router-dom";
import { Button } from 'antd';
import styles from '../styles/register.module.css';

const Register = () => {
    return <div className={styles.mainBackground}>
        <div className={styles.container}>
            <div className={`${styles.title}`}>BẠN ĐĂNG KÝ VỚI VAI TRÒ</div>
            <div className={`${styles.btnContainer}`}>
                <Link to='/register/donor-volunteer'>
                    <Button className={`${styles.btn}`} type="primary" size="large">NGƯỜI HIẾN MÁU</Button>
                </Link>
                <Link to='/register/donor-place'>
                    <Button className={`${styles.btn}`} type="primary" size="large">NƠI HIẾN MÁU</Button>
                </Link>
            </div>
        </div>
    </div>

};

export default Register;