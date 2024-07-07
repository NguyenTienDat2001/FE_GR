import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Table, Card, Button, Select } from 'antd';
import { apiUrl } from '../domain/domain';
import axios from 'axios';
const { Option } = Select;
const OrderHistoryDetail = () => {
    const { order_id } = useParams()
    const [infor, setInfor] = useState()
    const [books, setBooks] = useState()
    useEffect(() => {
        axios.get(`${apiUrl}/api/orders/${order_id}`)
            .then(res => {
                setInfor(res.data.transaction)
                setBooks(res.data.books)
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }, []);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(4, '0'),
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '500px',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'sell_price',
            key: 'sell_price',
        },
    ];
    return (
        <div>

            <div style={{ width: '80%', margin: 'auto' }}>
                <Card
                    title="Danh sách sản phẩm"
                    bordered={false}
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default OrderHistoryDetail