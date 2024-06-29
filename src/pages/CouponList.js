import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import { apiUrl } from '../domain/domain';
import moment from 'moment';
import axios from 'axios';
const CouponList = () => {
    const navigate = useNavigate()
    const columns = [
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
            title: 'Điểm',
            dataIndex: 'point',
            key: 'point',
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
        {
            title: '',
            key: 'action',
            render: (record) => (
                // <span className={`btn btn-info btn-sm ${record.point < user.point ? 'cursor-not-allowed' : 'hover:cursor-pointer'}`} onClick={() => handleExchange(record.id)}>
                //     Đổi
                // </span>
                <div>
                    <Button onClick={() => handleExchange(record.id)} className='bg-green-400' disabled={record.point > user.point}>Đổi</Button>
                </div>
            ),
        },
    ];
    const [coupons, setCoupons] = useState([])
    const [user, setUser] = useState([])

    const handleExchange = (id) => {
        const data = {
            coupon_id: id,
        };
        axios.post(`${apiUrl}/api/coupons/exchange`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(result => {
                window.location.reload();
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        fetch(`${apiUrl}/api/coupons/gift`)
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setCoupons(data.coupon)
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        fetch(`${apiUrl}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('user is', data.user);
                setUser(data.user)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>

            <div>
                <h3 className=' font-bold text-lg pb-3'>Bạn có {user.point} điểm</h3>
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

export default CouponList