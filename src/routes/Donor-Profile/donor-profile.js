import { Outlet, Navigate } from 'react-router-dom';
import { FooterSmall } from '../../components/Footer/FooterSmall';
import { Navbar } from '../../components/NavBar/navbar';
import { SideBarforDonor } from '../../components/SideBar/SideBarforDonor'
import styles from './donor.module.css'
function DonorProfile() {

    const [rendered, setRendered] = useState(false)
    const rolePath = JSON.parse(sessionStorage.getItem('userRole'))
    const location = useLocation();

    useEffect(() => {
        // Send JWT to backend to get user
        const token = JSON.parse(sessionStorage.getItem('JWT_Key'))
        let json = {
            headers: new Headers({
                'Authorization': "Bearer " + token,
            })
        }
        async function fetchAPI() {
            const response = await fetch(`${process.env.REACT_APP_BACK_END_HOST}/v1/donors/me`, json)
                .then((res) => res.json())
                .catch((error) => { console.log(error) })
            console.log(response);
            if (response.success) {
                //current pathname/route
                if (location.pathname === "/donor/changePassword") {
                    sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                    sessionStorage.setItem('name', JSON.stringify(response.body.name))                    
                    sessionStorage.removeItem('user')
                }
                if (location.pathname === "/donor") {
                    sessionStorage.setItem('avatar', JSON.stringify(response.body.avatar))
                    sessionStorage.setItem('name', JSON.stringify(response.body.name)) 
                    const user = {
                        "name": response.body.name,
                        "phone": response.body.user.phone,
                        "birthday": response.body.birthday,
                        "sex": response.body.sex,
                        "identityNum": response.body.identityNum,
                        "bloodType": response.body.bloodType,
                        "districtId": response.body.user.districtId,
                        "addressDetails": response.body.user.addressDetails,
                        "anamnesis": response.body.anamnesis,
                    }
                    sessionStorage.setItem('user', JSON.stringify(user))
                }
                setRendered(true)
            } else {

            }
        }
        fetchAPI();
    }, []);

    if (rolePath === null || rolePath !== "/donor") {
        return <Navigate to={`/`} />
    } else if (rendered) {
        return (
            <>
                <Navbar />
                <div class={styles.donorSideBar}><SideBarforDonor /></div>
                <div ><Outlet /></div>
                <FooterSmall />
            </>
        )
    } else {
        return (
            <>
                <div>Đang cập nhật thông tin</div>
            </>
        )
    }
}

export default DonorProfile