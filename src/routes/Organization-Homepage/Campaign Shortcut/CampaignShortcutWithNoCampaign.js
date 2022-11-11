import { Button } from "antd"
import "./campaignshortcutwithnocampaign.css"
import img_2 from "../../../assets/homepage-organization-shortcut-2.png"
import { Link } from "react-router-dom"
const CampaignShortcutWithNoCampaign = () =>{
return <section id="create-shortcut">
        <img src={img_2}></img>
        <h1>KHÔNG CÓ CHIẾN DỊCH NÀO Ở HIỆN TẠI</h1>
        <p>Bạn có muốn tạo thêm chiến dịch mới không?</p>
        <div className="button-shortcut">
            <Button type="primary" value="small"><Link to="/organization/manageCampaign/createCampaign">Tạo chiến dịch</Link></Button>
            <Button><Link to="/organization/notification/create">Tạo thông báo khẩn</Link></Button>
        </div>
</section>
}
export default CampaignShortcutWithNoCampaign