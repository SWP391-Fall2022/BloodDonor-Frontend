import { Button } from "antd"
import "./campaignshortcutwithcampaign.css"
import img_1 from "../../../assets/homepage-organization-shortcut-1.png"
const CampaignShortcutWithCampaign = () =>{
return <section id="create-shortcut">
        <img src={img_1}></img>
        <h1>Hiện tại đang diễn ra chiến dịch 103</h1>
        <p>Bạn có muốn tạo thêm chiến dịch mới không?</p>
        <div className="button-shortcut">
            <Button type="primary" value="small">Tạo chiến dịch</Button>
            <Button>Tạo thông báo khẩn</Button>
        </div>
</section>
}
export default CampaignShortcutWithCampaign