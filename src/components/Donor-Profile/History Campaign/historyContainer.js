import styles from '../donor.module.css'
import { Modal, Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

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
        dataIndex: 'info',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    return (
                        <Link onClick={info}>
                            <Tag color='green' key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        </Link>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Trạng thái',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Đã đăng ký</a>
                <a>Đã tham gia</a>
                <a>Hủy tham gia</a>
            </Space>
        ),
    },
];
const data = [
    {
        stt: '1',
        campaign: 'John Brown',
        tags: ['Chi tiết'],
    },
    {
        stt: '2',
        campaign: 'Jim Green',
        tags: ['Chi tiết'],
    },
    {
        stt: '3',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '4',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '5',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '6',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '7',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '8',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '9',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
    },
    {
        stt: '10',
        campaign: 'Joe Black',
        tags: ['Chi tiết'],
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
        <div className={styles.infoContainer} style={{ width: '700px' }}>
            <div className={styles.title}>LỊCH SỬ CHIẾN DỊCH</div>
            <Table rowKey={data => data.stt} columns={columns} dataSource={data} pagination={{ defaultPageSize: 5 }} style={{ textAlign: 'center' }} />
        </div>
    )
}