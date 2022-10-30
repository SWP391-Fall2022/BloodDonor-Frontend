import styles from '../donor.module.css'
import { Button, Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
    },
    {
        title: 'Thông tin sức khỏe',
        key: 'tags',
        dataIndex: 'tags',
        render: (index) => (
            <Button onClick={info}>
                <Tag color='green' key={index}>
                    Chi tiết
                </Tag>
            </Button>
        ),
    },
    {
        title: 'Trạng thái',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Link>Đã đăng ký</Link>
                <Link>Đã tham gia</Link>
                <Link>Hủy tham gia</Link>
            </Space>
        ),
    },
];
const data = [
    {
        stt: '1',
        campaign: 'John Brown',
        tags: 1,
    },
    {
        stt: '2',
        campaign: 'Jim Green',
        tags: 2,
    },
    {
        stt: '3',
        campaign: 'Joe Black',
        tags: 3,
    },
    {
        stt: '4',
        campaign: 'Joe Black',
        tags: 4,
    },
    {
        stt: '5',
        campaign: 'Joe Black',
        tags: 5,
    },
    {
        stt: '6',
        campaign: 'Joe Black',
        tags: 6,
    },
    {
        stt: '7',
        campaign: 'Joe Black',
        tags: 7,
    },
    {
        stt: '8',
        campaign: 'Joe Black',
        tags: 8,
    },
    {
        stt: '9',
        campaign: 'Joe Black',
        tags: 9,
    },
    {
        stt: '10',
        campaign: 'Joe Black',
        tags: 10,
    },
];

function info() {
    Modal.info({
        title: <h2><strong>THÔNG TIN SỨC KHỎE</strong></h2>,
        content: (
            <div>
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
            <div className={styles.title}>LỊCH SỬ CHIẾN DỊCH</div>
            <Table rowKey={data => data.stt} columns={columns} dataSource={data} pagination={{ defaultPageSize: 5 }} style={{ textAlign: 'center' }} />
        </div>
    )
}