import styles from '../donor.module.css'
import { Empty, Modal, Table, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
    },
    {
        title: 'Chiến dịch',
        dataIndex: 'campaign',
        key: 'campaign',
        align: 'center',
    },
    {
        title: 'Trạng thái',
        key: 'state',
        dataIndex: 'state',
        align: 'right',
    },
];
const data = [
    {
        key: '1',
        stt: '1',
        campaign: 'John Brown',
        state: "Đã hủy",
    },
    {
        key: '2',
        stt: '2',
        campaign: 'Jim Green',
        state: "Đã tham gia",
    },
    {
        key: '3',
        stt: '3',
        campaign: 'Joe Black',
        state: "Đã hủy",
    },
    {
        key: '4',
        stt: '4',
        campaign: 'Joe Black',
        state: "Đã đăng ký",
    },
    {
        key: '5',
        stt: '5',
        campaign: 'Joe Black',
        state: "Đã tham gia",
    },
    {
        key: '6',
        stt: '6',
        campaign: 'Joe Black',
        state: "Đã hủy",
    },
];

function info(record) {
    Modal.info({
        title: <h2><strong>THÔNG TIN SỨC KHỎE</strong></h2>,
        content: (
            <div>
                <div><strong>Test: </strong>{record.state}</div>
                <div><strong>Cân nặng: </strong>50kg</div>
                <div><strong>Nhóm máu: </strong>AB</div>
                <div><strong>Lượng máu: </strong>450cc</div>
                <div><strong>Chi tiết sức khỏe: </strong>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non</div>
            </div>
        ),
        closable: true,
        okText: 'Đóng',
        width: '600px'
    });
}

export default function HistoryContainer() {
    return (
        <div className={styles.infoContainerHistory}>
            <div className={styles.title}>LỊCH SỬ CHIẾN DỊCH
                <Tooltip
                    title="Nhấn vào một dòng để xem thông tin sức khỏe của bạn"
                    arrowPointAtCenter
                    placement="right"
                >
                    <QuestionCircleOutlined style={{ position: 'relative', left: '20px' }} />
                </Tooltip>
            </div>
            <Table locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Lịch sử rỗng" /> }}
                onRow={(record, rowIndex) => ({
                    onClick: event => { info(record) }
                })}
                columns={columns} dataSource={data} pagination={{ defaultPageSize: 5 }} style={{ textAlign: 'center' }}
            />
        </div>
    )
}