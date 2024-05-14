import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
const CouponList = () => {
    const navigate = useNavigate()
    const columns = [
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
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Start',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'End',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <span className="btn btn-info btn-sm" onClick={() => handleExchange(record.id)}>
                    Đổi
                </span>
            ),
        },
    ];
    const [coupons, setCoupons] = useState([])
    const [user, setUser] = useState([])

    const handleExchange = (id) => {
        const data = {
            coupon_id: id,
        };
        axios.post(`http://127.0.0.1:8000/api/coupons/exchange`, data)
            .then(result => {
                console.log(result);
                // window.location.href = result.data;

            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/coupons')
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupon)
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/profile/1')
            .then((response) => response.json())
            .then((data) => {
                console.log('user is', data.data);
                setUser(data.data)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>

            <div style={{ width: '80%', margin: 'auto' }}>
                <h3>Bạn có {user.point} điểm</h3>
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

export default CouponList