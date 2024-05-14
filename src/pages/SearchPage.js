import { Radio, Space } from 'antd';
import { useState, useEffect } from 'react';
import BookList from '../component/Book/BookList';
import BookItem from '../component/Book/BookItem';
import axios from 'axios';
import './SearchPage.css'
import Item from './Item';
const SearchPage = () => {
    const [cate, setCate] = useState('0');
    const [age, setAge] = useState('0');
    const [price, setPrice] = useState('0');
    const [bookname, setBookname] = useState();
    const [books, setBooks] = useState([]);
    
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
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/books')
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
                <div className="grid grid-cols-4 grid-rows-1 gap-10">
                {books.map(book => (
              <Item key={book.id} book={book} />
            ))}
                </div>
            </div>
        </div>
    )
};

export default SearchPage