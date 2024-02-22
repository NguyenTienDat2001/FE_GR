import './BookItem.css'
import { Button } from 'antd';
const BookItem = ({ book }) => (
    <div className="book-card">
        <div className='book-card-top'>
            <img src={book.img} alt=''></img>
            <h3>{book.name}</h3>
            <p>{book.author}</p>
        </div>

        <div className='book-card-bottom'>
            <div className='flex justify-items-center'>
                <span className=''>{book.sell_price}đ</span>
                <span className=''><del>{book.sell_price + 5000}đ</del></span>
                <span className=''>15%</span>
            </div>
            <Button style={{backgroundColor:'blue'}} type="primary" danger size='small'>
                Mua ngay
            </Button>
            <Button type="primary" danger size='small'>
                Thêm yêu thích
            </Button>
        </div>
    </div>
);

export default BookItem;