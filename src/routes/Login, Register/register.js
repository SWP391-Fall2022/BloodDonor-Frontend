import { Link } from "react-router-dom";
import { Button } from 'antd';
import donor from '../../assets/register-donor.png'
import doctor from '../../assets/register-doctor.png'
import styles from '../../components/Register/register.module.css';

const Register = () => {
    return <div className={styles.mainBackground}>
        <div className={styles.container}>
            <div className={`${styles.title}`}>BẠN ĐĂNG KÝ VỚI VAI TRÒ</div>
            <div className={`${styles.detailCol}`}>
                <div className={`${styles.detailContainer}`}>
                    <Link to='/register/donor'>
                        <Button id={`${styles.registerBtn}`} type="primary" size="large">NGƯỜI HIẾN MÁU</Button>
                    </Link>
                    <img className={`${styles.img}`} src={donor} alt="Donor" />
                </div>
                <div className={`${styles.detailContainer}`}>
                    <Link to='/register/place'>
                        <Button id={`${styles.registerBtn}`} type="primary" size="large">NƠI HIẾN MÁU</Button>
                    </Link>
                    <img className={`${styles.img}`} src={doctor} alt="Doctor" />
                </div>
            </div>
        </div>
    </div>

};

export default Register;