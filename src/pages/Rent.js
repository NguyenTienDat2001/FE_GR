import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import { Image } from 'react-bootstrap';
import { apiUrl } from '../domain/domain';
import moment from 'moment';
import axios from 'axios';
const Rent = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: '',
            dataIndex: 'img',
            key: 'img',
            width: '150px',
            render: (imgUrl) => (
                <Image className=' w-16 h-20' src={imgUrl} alt="Image" />
            ),
        },
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Ngày thuê',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (text) => moment(text).format('DD-MM-YYYY'),
        },
        {
            title: '',
            key: 'action',
            render: (record) => (
                <span className="btn btn-info btn-sm" onClick={() => viewdetail(record.book_id)}>
                    Xem
                </span>
            ),
        },
    ];
    const [books, setBooks] = useState([])
    const viewdetail = (book_id) => {
        navigate(`/rent/view/${book_id}`)
    }

    useEffect(() => {
        fetch(`${apiUrl}/api/books/borrow/list`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('books is', data);
                setBooks(data.books)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>

            <div style={{ width: '80%', margin: 'auto' }}>
                <Card
                    title="Sách đã thuê"
                    bordered={false}
                >
                    <Table dataSource={books} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Rent