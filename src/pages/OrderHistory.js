import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
const OrderHistory = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Thông tin',
            dataIndex: 'infor',
            key: 'infor',
            width: '600px',
            render: (infor) => (
                <div>
                    <ul>
                        {infor.map((item) => (
                            <li key={item.id}>
                                <span style={{ fontWeight: 'bold'}}>{item.quantity} quyển</span> - {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Đã thanh toán';
                    case "1":
                        return 'Đang giao';
                    case "2":
                        return 'Đã hủy';
                    default:
                        return 'Unknown Type';
                }
            },
        },
    ];
    const [orders, setOrders] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/order/user/1')
            .then((response) => response.json())
            .then((data) => {
                console.log('orders is', data);
                setOrders(data.data)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>

            <div style={{ width: '80%', margin: 'auto' }}>
                <Card
                    title="Coupon list"
                    bordered={false}
                >
                    <Table dataSource={orders} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default OrderHistory