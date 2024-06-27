import { Radio, Space, Row, Col, Card, Pagination, Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import axios from 'axios';
const { Meta } = Card;
const SearchPage = () => {
    const [cate, setCate] = useState('0');
    const [age, setAge] = useState('0');
    const [price, setPrice] = useState('0');
    const [bookname, setBookname] = useState();
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };
    //
    const addCart = (book_id) => {
        const formdata = {
            book_id: book_id,
            quantity: 1
        };
        console.log('formdata', formdata);
        axios.post(`http://127.0.0.1:8000/api/cart/add`, formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            },
        })
            .then(res => {
                console.log(res);
            })
    }
    const onChangecate = (e) => {
        console.log('radio checked', e.target.value);
        setCate(e.target.value);
        axios.post(`http://127.0.0.1:8000/api/books/search`, {
            cate: e.target.value,
            age: age,
            price: price
        })
            .then(res => {
                console.log(res);
                setBooks(res.data.books)
            })

    };
    const onChangeage = (e) => {
        console.log('radio checked', e.target.value);
        setAge(e.target.value);
        axios.post(`http://127.0.0.1:8000/api/books/search`, {
            cate: cate,
            age: e.target.value,
            price: price
        })
            .then(res => {
                console.log(res);
                setBooks(res.data.books)
            })
    };
    const onChangeprice = (e) => {
        console.log('radio checked', e.target.value);
        setPrice(e.target.value);
        axios.post(`http://127.0.0.1:8000/api/books/search`, {
            cate: cate,
            age: age,
            price: e.target.value
        })
            .then(res => {
                console.log(res);
                setBooks(res.data.books)
            })
    };
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/books', {
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
        <div className="book-search flex gap-7">
            <div className='filter w-1/5'>
                <div>
                    <p className='label-text'>Danh mục</p>
                    <Radio.Group onChange={onChangecate} value={cate}>
                        <Space direction="vertical">
                            <Radio value='0'>Tất cả</Radio>
                            <Radio value='Truyện tranh'>Truyện tranh</Radio>
                            <Radio value='Truyện chữ'>Truyện chữ</Radio>
                            <Radio value='Văn học'>Văn học</Radio>
                            <Radio value='Kinh tế'>Kinh tế</Radio>

                        </Space>
                    </Radio.Group>
                </div>

                <div>
                    <p className='label-text'>Độ tuổi</p>
                    <Radio.Group onChange={onChangeage} value={age}>
                        <Space direction="vertical">
                            <Radio value='0'>Tất cả</Radio>
                            <Radio value='1'>Sách 0-6 tuổi</Radio>
                            <Radio value='2'>Sách 6-15 tuổi</Radio>
                            <Radio value='3'>Sách 15-18 tuổi</Radio>
                            <Radio value='4'>Sách trên 18 tuổi</Radio>

                        </Space>
                    </Radio.Group>
                </div>

                <div>
                    <p className='label-text'>Giá</p>
                    <Radio.Group onChange={onChangeprice} value={price}>
                        <Space direction="vertical">
                            <Radio value='0'>Tất cả</Radio>
                            <Radio value='1'>Nhỏ hơn 50000đ</Radio>
                            <Radio value='2'>50000-100000đ</Radio>
                            <Radio value='3'>100000-200000đ</Radio>
                            <Radio value='4'>200000-400000đ</Radio>
                            <Radio value='5'>400000-1000000đ</Radio>
                            <Radio value='6'>Trên 1000000đ</Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
            <div className='search-content w-4/5'>
                <div className='flex justify-between pb-1 pt-1 items-center pl-1 pr-1 rounded-sm mb-1'>
                    <span className=' font-bold text-lg text-red-500'>Kết quả tìm kiếm</span>
                </div>
                <div style={{ margin: 'auto', paddingTop: "10px" }}>
                    <Row gutter={[16, 16]}>
                        {books.slice((currentPage - 1) * pageSize, currentPage * pageSize) &&
                            books.slice((currentPage - 1) * pageSize, currentPage * pageSize).length > 0 &&
                            books.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((item, index) => (
                                <Col xs={24} sm={12} lg={6} key={index}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%', padding: 0 }}
                                        cover={<img className="w-full h-48 object-cover" alt={item.name} src={item.img} />}
                                    >
                                        <div class="text-black text-sm p-0 md:text-base overflow-hidden md:line-clamp-2 md:h-11 md:leading-normal">{item.name}</div>
                                        <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-7 md:leading-normal">{item.author}</div>
                                        <div className='flex items-center'>
                                            <span className='text-red text-base font-bold pr-1 m-0'>{item.sell_price}đ</span>
                                        </div>
                                        <div className='flex justify-center gap-1'>
                                            <Button onClick={() => addCart(item.id)} type="primary" danger size='small'>
                                                Mua ngay
                                            </Button>
                                            <div >
                                                {item.isbookmark ? (
                                                    <HeartFilled style={{ color: 'red' }} />
                                                ) : (
                                                    <HeartOutlined />
                                                )}
                                            </div>
                                        </div>


                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={books.length}
                        onChange={handlePageChange}
                        showSizeChanger
                        onShowSizeChange={handlePageChange}
                        style={{ marginTop: '16px', textAlign: 'center' }}
                    />
                </div>
                {/* <div className="grid grid-cols-4 grid-rows-1 gap-10">
                    {books.map(book => (
                        <Item key={book.id} book={book} />
                    ))}
                </div> */}
            </div>
        </div>
    )
};

export default SearchPage