import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, Select } from 'antd';
import { apiUrl } from '../../domain/domain';
import axios from 'axios';
const { Option } = Select;
const Order = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [selectedValue, setSelectedValue] = useState('all');

    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const viewDetail = (order_id) => {
        navigate(`/admin/order/${order_id}`)
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(4, '0'),
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
            render: (text, record) => (
                <div>
                    <span>
                        <a className="btn btn-primary btn-sm" onClick={() => viewDetail(record.id)}>
                            <i className="fas fa-eye">
                            </i>
                            View
                        </a>
                    </span>
                    {text === '1' && (<span onClick={() => checkOrder(record.id)} className="btn btn-success btn-sm">
                        <i className="fas fa-check">
                        </i>
                        Xác nhận
                    </span>)}
                </div>
            ),
        },
    ];

    useEffect(() => {
        getOrder();
    }, []);
    const getOrder = () => {
        fetch(`${apiUrl}/api/orders/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setOrders(data.orders)
            })
            .catch((error) => console.log(error));
    }
    const checkOrder = (order_id) => {
        const data = {
            order_id: order_id,
        };
        axios.post(`${apiUrl}/api/orders/check`, data)
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
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Đơn hàng</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Đơn hàng</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
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

export default Order