import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { apiUrl } from '../domain/domain';
import axios from 'axios';
const Item = ({ book, getBooks }) => {
  const navigate = useNavigate()
  const viewdetail = (book_id) => {
    navigate(`/detail/${book_id}`)
  }
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
      .catch(error => {
        console.error(error);
      });
  }
  const cancelBookmark = (book_id) => {
    axios.delete(`${apiUrl}/api/books/bookmark/${book_id}`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    })
      .then(res => {
        console.log(res);
        getBooks();
      })
      .catch(error => {
        console.error(error);
      });
  }
  const addBookmark =  (book_id) => {
    const formdata = {
      book_id: book_id,
    };

    console.log('formdata', formdata);

    axios.post(`${apiUrl}/api/books/bookmark`, formdata, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    })
      .then(res => {
        console.log(res.data);
        getBooks()
      })
      .catch(error => {
        console.error(error);
      });
  }
  //  
  return (
    <div className="card pb-1 pl-1 pr-1">
      <div className="card-top hover:cursor-pointer" onClick={() => viewdetail(book.id)}>
        <img className='h-36 w-full object-cover'
          src={
            book.img
          }
          alt={book.name}
        />
        <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-11 md:leading-normal">{book.name}</div>
        <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-7 md:leading-normal">{book.author}</div>
      </div>

      <div className='flex items-center'>
        <span className='text-red text-base font-bold pr-1 m-0'>{book.sell_price}đ</span>
      </div>
      <div className='flex justify-center gap-1'>
        <Button onClick={() => addCart(book.id)} type="primary" danger size='small'>
          Mua ngay
        </Button>
        <div >
          {book.isbookmark ? (
            <HeartFilled onClick={() => cancelBookmark(book.id)} style={{ color: 'red' }} />
          ) : (
            <HeartOutlined onClick={() => addBookmark(book.id)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
