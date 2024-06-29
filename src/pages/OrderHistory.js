import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, Select } from 'antd';
import { apiUrl } from '../domain/domain';
import axios from 'axios';
const { Option } = Select;
const OrderHistory = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(4, '0'),
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'updatedAt',
            key: 'createdAt',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
            key: 'receiver',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Số tiền',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color;
                let statusText;

                switch (text) {
                    case "0":
                        statusText = 'ĐÃ HOÀN THÀNH';
                        color = 'green';
                        break;
                    case "1":
                        statusText = 'ĐANG XỬ LÝ';
                        color = 'blue';
                        break;
                    case "2":
                        statusText = 'ĐÃ HỦY';
                        color = 'red';
                        break;
                    default:
                        statusText = 'Unknown Type';
                        color = 'black';
                }

                return <span style={{ color, fontWeight: 'bold' }}>{statusText}</span>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'action',
            render: (text, record) => {
                return <div>
                    <span className="btn btn-primary btn-sm" onClick={() => viewDetail(record.id)} href='/'>
                        <i className="fas fa-eye">
                        </i>
                        Xem
                    </span>
                    {text === '1' && (<span onClick={() => cancelOrder(record.id)} className="btn btn-danger btn-sm">
                        <i className="fas fa-times-circle">
                        </i>
                        Hủy
                    </span>)}
                    {!record.ispay && text === "1" && (<span onClick={() => handlePayment(record)} className="btn btn-primary btn-sm">
                        Thanh toán
                    </span>)}

                </div>
            },
        },
    ];
    const [orders, setOrders] = useState([])
    const [selectedValue, setSelectedValue] = useState('all');

    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const viewDetail = (order_id) => {
        navigate(`/admin/order/${order_id}`)
    }
    useEffect(() => {
        getOrder();
    }, []);
    const getOrder = () => {
        fetch(`${apiUrl}/api/orders`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('orders is', data);
                setOrders(data.orders)
            })
            .catch((error) => console.log(error));
    }
    const generateRandomCode = (length) => {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    const handlePayment = (order) => {
        const data = {
            order_id: generateRandomCode(8),
            history_id: order.id,
            total_price: order.account,
        };
        console.log(data);
        axios.post(`${apiUrl}/api/payment`, data)
            .then(result => {
                console.log(result);
                window.location.href = result.data;

            })
            .catch(error => {
                console.error(error);
            })
    }
    const cancelOrder = (order_id) => {
        const data = {
            order_id: order_id,
        };
        axios.post(`${apiUrl}/api/orders/cancel`, data)
            .then(result => {
                console.log(result);
                getOrder();
            })
            .catch(error => {
                console.error(error);
            })
    }
    let filteredOrders = orders;
    if (selectedValue !== 'all') {
        filteredOrders = orders.filter(order => order.status === selectedValue);
    }
    return (
        <div>

            <div style={{ width: '80%', margin: 'auto' }}>
                <Card
                    title="Danh sách đơn hàng"
                    bordered={false}
                    extra={
                        <Select value={selectedValue} onChange={handleChange} className=' w-36'>
                            <Option value="all">Tất cả</Option>
                            <Option value="0">Đã hoàn thành</Option>
                            <Option value="1">Đang xử lý</Option>
                            <Option value="2">Đã hủy</Option>
                        </Select>
                    }
                >
                    <Table dataSource={filteredOrders} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default OrderHistory