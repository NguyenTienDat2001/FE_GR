import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import { apiUrl } from '../domain/domain';
import moment from 'moment';
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
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
            width: '300px',
        },
        {
            title: 'Kiểu',
            dataIndex: 'type',
            key: 'type',
            render: (text) => {
                switch (text) {
                    case "0":
                        return 'Free ship';
                    case "1":
                        return 'Giảm theo %';
                    case "2":
                        return 'Giảm theo số tiền cố định';
                    default:
                        return 'Unknown Type';
                }
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: '200px',
            render: (text) => {
                const statusText = (text === "2") ? 'ĐÃ SỬ DỤNG' : 'CHƯA SỬ DỤNG';
                const statusColor = (text === "2") ? 'red' : 'green';
                const statusStyle = {
                    color: statusColor,
                    fontWeight: "bold"
                };

                return <div style={statusStyle}>{statusText}</div>;
            },
        },
        {
            title: 'Điều kiện',
            dataIndex: 'condition',
            key: 'condition',
            render: (text) => {
                return text !== null ? text + 'đ' : '';
            },
        },
        // {
        //     title: 'Ngày bắt đầu',
        //     dataIndex: 'start_date',
        //     key: 'start_date',
        //     render: (text) => moment(text).format('DD-MM-YYYY'),
        // },
        // {
        //     title: 'Ngày hết hạn',
        //     dataIndex: 'end_date',
        //     key: 'end_date',
        //     render: (text) => moment(text).format('DD-MM-YYYY'),
        // },
    ];
    const [coupons, setCoupons] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch(`${apiUrl}/api/coupons/mycoupon`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupon)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>

            <div>
                <Card
                    title="Danh sách mã giảm giá"
                    bordered={false}
                >
                    <Table dataSource={coupons} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default MyCoupon