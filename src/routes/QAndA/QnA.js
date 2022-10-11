import React from "react";
import "./qna.css";
import { Navbar } from "../../components/NavBar/navbar";
import { Collapse } from "antd";
const { Panel } = Collapse;
const QnA = () => {
  return (
    <section id="QnA">
      <Navbar />
      <section className="QnA-cover">
        <h2>MỘT SỐ CÂU HỎI THƯỜNG GẶP</h2>
      </section>
      <section className="QnA-content">
        <Collapse className="QnA-container">
          <Panel header="1. Ai có thể tham gia hiến máu?" className="QnA-card">
            <li>
              Tất cả mọi người từ 18 - 60 tuổi, thực sự tình nguyện hiến máu của
              mình để cứu chữa người bệnh.
            </li>
            <li>
              Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. Lượng máu hiến
              mỗi lần không quá 9ml/kg cân nặng và không quá 500ml mỗi lần.
            </li>
            <li>
              Không bị nhiễm hoặc không có các hành vi lây nhiễm HIV và các bệnh
              lây nhiễm qua đường truyền máu khác.
            </li>
            <li>
              Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
            </li>
            <li>Có giấy tờ tùy thân.</li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="2. Ai là người không nên hiến máu?"
            className="QnA-card"
          >
            <li>
              Người đã nhiễm hoặc đã thực hiện hành vi có nguy cơ nhiễm HIV,
              viêm gan B, viêm gan C, và các vius lây qua đường truyền máu.
            </li>
            <li>
              Người có các bệnh mãn tính: tim mạch, huyết áp, hô hấp, dạ dày…
            </li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="3. Máu của tôi sẽ được làm những xét nghiệm gì?"
            className="QnA-card"
          >
            <li>
              Tất cả những đơn vị máu thu được sẽ được kiểm tra nhóm máu (hệ
              ABO, hệ Rh), HIV, virus viêm gan B, virus viêm gan C, giang mai,
              sốt rét.
            </li>
            <li>
              Bạn sẽ được thông báo kết quả, được giữ kín và được tư vấn (miễn
              phí) khi phát hiện ra các bệnh nhiễm trùng nói trên.
            </li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="4. Máu gồm những thành phần và chức năng gì?"
            className="QnA-card"
          >
            <h3>
              Máu là một chất lỏng lưu thông trong các mạch máu của cơ thể, gồm
              nhiều thành phần, mỗi thành phần làm nhiệm vụ khác nhau:
            </h3>
            <li>Hồng cầu làm nhiệm vụ chính là vận chuyển oxy.</li>
            <li>Bạch cầu làm nhiệm vụ bảo vệ cơ thể.</li>
            <li>Tiểu cầu tham gia vào quá trình đông cầm máu.</li>
            <li>
              Huyết tương: gồm nhiều thành phần khác nhau: kháng thể, các yếu tố
              đông máu, các chất dinh dưỡng...
            </li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="5. Tại sao lại có nhiều người cần phải được truyền máu?"
            className="QnA-card"
          >
            <h3>
            Mỗi giờ có hàng trăm người bệnh cần phải được truyền máu vì :
            </h3>
            <li>Bị mất máu do chấn thương, tai nạn, thảm hoạ, xuất huyết tiêu hoá...</li>
            <li>Do bị các bệnh gây thiếu máu, chảy máu: ung thư máu, suy tuỷ xương, máu khó đông...</li>
            <li> Các phương pháp điều trị hiện đại cần truyền nhiều máu: phẫu thuật tim mạch, ghép tạng...</li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="6. Nhu cầu máu điều trị ở nước ta hiện nay?"
            className="QnA-card"
          >
            <li>Mỗi năm nước ta cần khoảng 1.800.000 đơn vị máu điều trị.</li>
            <li>Máu cần cho điều trị hằng ngày, cho cấp cứu, cho dự phòng các thảm họa, tai nạn cần truyền máu với số lượng lớn.</li>
            <li>Hiện tại chúng ta đã đáp ứng được khoảng 54% nhu cầu máu cho điều trị.</li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="7. Tại sao khi tham gia hiến máu lại cần phải có giấy CMND?"
            className="QnA-card"
          >
           <h3>Mỗi đơn vị máu đều phải có hồ sơ, trong đó có các thông tin về người hiến máu. Theo quy định, đây là một thủ tục cần thiết trong quy trình hiến máu để đảm bảo tính xác thực thông tin về người hiến máu.</h3>
           </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="8. Hiến máu nhân đạo có hại đến sức khoẻ không?"
            className="QnA-card"
          >
           <h3>Quyền lợi và chế độ đối với người hiến máu tình nguyện theo Thông tư số 05/2017/TT-BYT Quy định giá tối đa và chi phí phục vụ cho việc xác định giá một đơn vị máu toàn phần, chế phẩm máu đạt tiêu chuẩn:</h3>
           <li>Máu có nhiều thành phần, mỗi thành phần chỉ có đời sống nhất định và luôn luôn được đổi mới hằng ngày. Ví dụ: Hồng cầu sống được 120 ngày, huyết tương thường xuyên được thay thế và đổi mới. Cơ sở khoa học cho thấy, nếu mỗi lần hiến dưới 1/10 lượng máu trong cơ thể thì không có hại đến sức khỏe.</li>
           <li>Nhiều công trình nghiên cứu đã chứng minh rằng, sau khi hiến máu, các chỉ số máu có thay đổi chút ít nhưng vẫn nằm trong giới hạn sinh lý bình thường không hề gây ảnh hưởng đến các hoạt động thường ngày của cơ thể.</li>
           <h3>Cơ sở thực tế:</h3>
           <li>Thực tế đã có hàng triệu người hiến máu nhiều lần mà sức khỏe vẫn hoàn toàn tốt. Trên thế giới có người hiến máu trên 400 lần. Ở Việt Nam, người hiến máu nhiều lần nhất đã hiến gần 100 lần, sức khỏe hoàn toàn tốt.</li>
           <li>Như vậy, mỗi người nếu thấy sức khoẻ tốt, không có các bệnh lây nhiễm qua đường truyền máu, đạt tiêu chuẩn hiến máu thì có thể hiến máu từ 3-4 lần trong một năm, vừa không ảnh hưởng xấu đến sức khoẻ của bản thân, vừa đảm bảo máu có chất lượng tốt, an toàn cho người bệnh.</li>
           </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="9. Khi hiến máu có thể bị nhiễm bệnh không?"
            className="QnA-card"
          >
           <h3>Kim dây lấy máu vô trùng, chỉ sử dụng một lần cho một người, vì vậy không thể lây bệnh cho người hiến máu.</h3>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="10. Ngày mai tôi sẽ hiến máu, tôi nên chuẩn bị như thế nào?"
            className="QnA-card"
          >
           <li>Tối nay bạn không nên thức quá khuya (ngủ trước 23:00).</li>
           <li>Nên ăn và không uống rượu, bia trước khi hiến máu.</li>
           <li>Mang giấy CMND, đủ giấy tờ tùy thân và thẻ hiến máu(nếu có) khi đi hiến máu.</li>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="11. Tôi có thể hiến máu sau khi tiêm vắc xin Covid-19 không?"
            className="QnA-card"
          >
          <h3>Khi tiêm vắc xin ngừa Covid-19, có thể tham gia hiến máu sau: 7 NGÀY, đề đảm bảo bạn không bị tác dụng phụ và đảm bảo đủ sức khỏe vào ngày hiến máu.</h3>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="12. Khi phát hiện bất thường, cảm thấy không an toàn với túi máu vừa hiến"
            className="QnA-card"
          >
          <h3>Sau khi tham gia hiến máu, nếu phát hiện có bất cứ điều gì khiến bạn cảm thấy không an toàn với túi máu vừa hiến (chợt nhớ ra 1 hành vi nguy cơ, có sử dụng loại thuốc nào đó mà bạn quên báo bác sĩ khi thăm khám, có xét nghiệm "DƯƠNG TÍNH" với SarS-CoV-2 bằng kỹ thuật test nhanh hoặc Real time RT-PCR,...) vui lòng báo lại cho đơn vị tiếp nhận túi máu nơi mà bạn đã tham gia hiến.</h3>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="13. Cảm thấy không khỏe sau khi hiến máu?"
            className="QnA-card"
          >
          <h3>Sau khi hiến máu, nếu có các triệu chứng chóng mặt, mệt mỏi, buồn nôn,... hãy liên hệ ngay cho đơn vị tiếp nhận máu để được hỗ trợ về mặt y khoa.</h3>
          </Panel>
        </Collapse>
        <Collapse className="QnA-container">
          <Panel
            header="14. Có dấu hiệu sưng, phù nơi vết chích?"
            className="QnA-card"
          >
          <h3>Sau khi hiến máu, nếu bạn có các dấu hiệu sưng, phù nơi vết chích. Xin đừng quá lo lắng, hãy chườm lạnh ngay vị trí sưng đó và theo dõi các dấu hiệu trên, nếu không giảm sau 24 giờ hãy liên hệ lại cho đơn vị tiếp nhận máu để được hỗ trợ.</h3>
          </Panel>
        </Collapse>
      </section>
    </section>
  );
};

export default QnA;
