import { Row, Col, Card, Button, message } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { apiUrl } from '../domain/domain';
import './SearchPage.css';
import axios from 'axios';
const Bookmark = () => {
    const [books, setBooks] = useState([]);
    const addCart = (book_id) => {
        const formdata = {
            book_id: book_id,
            quantity: 1
        };
        console.log('formdata', formdata);
        axios.post(`${apiUrl}/api/cart/add`, formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                console.log(res);
                message.config({
                    top: 100,
                    duration: 2,
                  });
                setTimeout(() => {
                    message.success('Đã thêm vào giỏ hàng')
                }, 2000)
            })
    }
    const cancelBookmark = (book_id) => {
        axios.delete(`${apiUrl}/api/books/bookmark/${book_id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                console.log(res);
                getBookmark();
            })
    }
    useEffect(() => {
        getBookmark();
    }, []);
    const getBookmark = () => {
        fetch(`${apiUrl}/api/books/bookmark/all`, {
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
    }
    return (
        <div style={{ width: '80%', margin: 'auto', paddingTop: "10px" }}>
            <div className='flex justify-between pb-1 pt-1 items-center pl-1 pr-1 rounded-sm mb-1'>
                <span className=' font-bold text-lg text-red-500'>Danh mục yêu thích</span>
            </div>
            <Row gutter={[16, 16]}>
                {books &&
                    books.length > 0 &&
                    books.map((item, index) => (
                        <Col xs={24} sm={12} lg={4} key={index}>
                            <Card
                                hoverable
                                style={{ width: '100%', padding: 0 }}
                                cover={<img className="w-full h-48 object-cover" alt={item.name} src={item.img} />}
                            >
                                <div class="text-black text-sm p-0 md:text-base overflow-hidden md:line-clamp-2 md:h-11 md:leading-normal">{item.name}</div>
                                <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-7 md:leading-normal">{item.author}</div>
                                <div className='flex items-center'>
                                    <span className='text-red text-base font-bold pr-1 m-0'>{item.price}đ</span>
                                </div>
                                <div className='flex justify-center gap-1'>
                                    <Button onClick={() => addCart(item.book_id)} type="primary" danger size='small'>
                                        Mua ngay
                                    </Button>
                                    <div >
                                        <HeartFilled onClick={() => cancelBookmark(item.book_id)} style={{ color: 'red' }} />
                                    </div>
                                </div>


                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    )
};

export default Bookmark