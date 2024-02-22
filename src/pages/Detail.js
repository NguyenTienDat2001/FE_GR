import { useParams } from "react-router-dom";
import { Button, Input } from 'antd';
import axios from "axios";
import './Detail.css';
import { useState, useEffect } from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
function Detail() {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [book, setBook] = useState('')
  const [quantity, setQuantity] = useState(1);
  const handleChange = (event) => {
    setQuantity(event.target.value);
  }
  const handleDecrement = () => {
    setQuantity((prev) => prev - (prev >= 2 ? 1 : 0))
  }
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }
  const addCart = (book_id) => {
    const formdata = {
      user_id: localStorage.getItem('user_id'),
      book_id: book_id,
      quantity: quantity
    };
    console.log('formdata', formdata);
    axios.post(`http://127.0.0.1:8000/api/cart/add`, formdata)
      .then(res => {
        console.log(res);
      })
  }
  const readmore = isOpen ? null : 'description'
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}`)
      .then(res => {
        setBook(res.data.data)
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <div>
      <div className="detail-content shadow-sm rounded-lg">
        <div className="left-content">
          <img src={book.img} />
          <div className="custom-button">
            <Button className="border-orange-500 text-red-500 font-bold text-sm" type="primary" size='small'>
              <div className="flex justify-center justify-items-center gap-1">
                <HeartOutlined />
                Thêm yêu thích
              </div>
            </Button>
            <Button className="font-bold text-sm" onClick={() => addCart(book.id)} type="primary" danger size='small'>
              <div className="flex justify-center justify-items-center gap-1">
                <ShoppingCartOutlined />
                Mua ngay
              </div>
            </Button>
          </div>
        </div>
        <div className="right-content pt-8 pr-20">
          <div className=" text-4xl pb-3">{book.name}</div>
          <div>Nhà xuất bản: <span className="font-bold">NXB {book.publisher}</span></div>
          <div>Tác giả: <span className="font-bold">{book.author}</span></div>
          <div>Thể loại: <span className="font-bold">{book.category}</span></div>
          <div className='flex items-center py-3 gap-2'>
            <span className='text-red text-4xl pr-1 m-0'>{book.sell_price}đ</span>
            <span className='text-gray text-2xl pr-1'><del>{book.sell_price + 5000}đ</del></span>
            <span className='text-white text-lg p-0 mr-1 bg-red-600'>15%</span>
          </div>
          <div className="flex items-center pb-3 gap-5">
            <span className="font-bold text-lg">Số lượng</span>
            <div className="flex items-center gap-0">
              <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleDecrement()} type="primary" danger>
                -
              </Button>
              <Input className="h-7 rounded-none w-12 text-center" size="small" value={quantity} onChange={handleChange} />
              <Button className="flex items-center h-7 rounded-none text-center" onClick={() => handleIncrement()} type="primary" danger>
                +
              </Button>
            </div>
          </div>
          <div className="pb-3">
          <div className={readmore}>
            {book.description}
          </div>
          </div>
          <Button className="bg-red-400" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Ẩn bớt...' : 'Xem thêm...'}</Button>
        </div>
      </div>

    </div>
  );
}

export default Detail;
