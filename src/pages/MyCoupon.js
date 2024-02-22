import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
const MyCoupon = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
            width: '300px',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Free ship';
                    case "1":
                        return 'Giam theo %';
                    case "2":
                        return 'Giam theo so tien co dinh';
                    default:
                        return 'Unknown Type';
                }
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: '200px',
            render: (text) => {
                const statusText = (text === "2") ? 'Đã sử dụng' : 'Chưa sử dụng';
                const statusColor = (text === "2") ? 'red' : 'green';
                const statusStyle = {
                    backgroundColor: statusColor,
                    padding: '8px', 
                    color: 'white', 
                    borderRadius: '5px', 
                    display: 'inline-block',
                    width: '110px',
                    textAlign: 'center',
                };
        
                return <div style={statusStyle}>{statusText}</div>;
            },
        },
        {
            title: 'Điều kiện',
            dataIndex: 'condition',
            key: 'condition',
            render: (text) => {
                return text !== null ? text + 'Đ' : '';
            },
        },
        {
            title: 'Start',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End',
            dataIndex: 'end_date',
            key: 'end_date',
        },
    ];
    const [coupons, setCoupons] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/coupons/mycoupon')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupons)
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
                    <Table dataSource={coupons} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default MyCoupon