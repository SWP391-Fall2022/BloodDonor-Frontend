import { Link } from "react-router-dom";
import { Button } from 'antd';
import donor from '../assets/Donor.png'
import doctor from '../assets/Doctor.png'
import styles from '../styles/register.module.css';

const Register = () => {
    return <div className={styles.mainBackground}>
        <div className={styles.container}>
            <div className={`${styles.title}`}>BẠN ĐĂNG KÝ VỚI VAI TRÒ</div>
            <div className={`${styles.btnContainer}`}>
                <Link to='/register/donor-volunteer'>
                    <Button className={`${styles.btn} ${styles.btnLeft}`} type="primary" size="large">NGƯỜI HIẾN MÁU</Button>
                </Link>
                <Link to='/register/donor-place'>
                    <Button className={`${styles.btn} ${styles.btnRight}`} type="primary" size="large">NƠI HIẾN MÁU</Button>
                </Link>
            </div>
            <div className={`${styles.imgContainer}`}>
                <img className={`${styles.img}`} src={donor} alt="Donor"/>
                <img className={`${styles.img}`} src={doctor} alt="Doctor"/>
            </div>
        </div>
    </div>

};

export default Register;