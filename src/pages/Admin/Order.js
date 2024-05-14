import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
const Order = () => {
    const navigate = useNavigate()
    const viewDetail = (order_id) => {
        navigate(`/admin/order/${order_id}`)
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User',
            dataIndex: 'email',
            key: 'email',
            // width: '300px',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Da thanh toan';
                    case "1":
                        return 'Dang giao';
                    case "2":
                        return 'Da huy';
                    default:
                        return 'Unknown Type';
                }
            },
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a className="btn btn-primary btn-sm" onClick={() => viewDetail(record.id)}>
                        <i className="fas fa-eye">
                        </i>
                        View
                    </a>
                </span>
            ),
        },
    ];
    
    const [orders, setOrders] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/order')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setOrders(data.data)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Orders</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Orders</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card 
                title="Product list"  
                bordered={false}
                >
                    <Table dataSource={orders} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Order