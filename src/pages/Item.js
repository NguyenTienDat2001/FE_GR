import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
const Item = ({ book }) => {
  //
  // const handleErrorImage = (data) => {
  //   setDefaultImage((prev) => ({
  //     ...prev,
  //     [data.target.alt]: data.target.alt,
  //     linkDefault: imgGirl,
  //   }));
  // };
  const navigate = useNavigate()
  const viewdetail = (book_id) => {
    navigate(`/detail/${book_id}`)
  }
  const addCart = (book_id) => {
    const formdata = {
      user_id: localStorage.getItem('user_id'),
      book_id: book_id,
      quantity: 1
    };
    console.log('formdata', formdata);
    axios.post(`http://127.0.0.1:8000/api/cart/add`, formdata)
      .then(res => {
        console.log(res);
      })
  }
  //  
  return (
    <div className="card pb-1 pl-1 pr-1">
      <div className="card-top hover:cursor-pointer" onClick={() => viewdetail(book.id)}>
        <img className='h-36 w-full mx-auto'
          src={
            book.img
          }
          alt={book.name}
        // onError={handleErrorImage}
        />
        <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-11 md:leading-normal">{book.name}</div>
        {/* <h1 class="text-black text-sm md:text-base overflow-hidden 
        overflow-ellipsis whitespace-normal md:whitespace-nowrap 
        md:overflow-ellipsis md:line-clamp-2 md:h-14 md:leading-normal">
          {book.name}
        </h1> */}
        <div class="text-black text-sm md:text-base overflow-hidden md:line-clamp-2 md:h-7 md:leading-normal">{book.author}</div>
      </div>

      <div className='flex items-center'>
        <span className='text-red text-sm pr-1 m-0'>{book.sell_price}đ</span>
        <span className='text-gray text-xs pr-1'><del>{book.sell_price + 5000}đ</del></span>
        <span className='text-white text-xs p-0 mr-1 bg-red-600 w-6 flex items-center justify-center'>{Math.floor((1 - book.sell_price / (book.sell_price + 5000)) * 100)}%</span>
      </div>
      <div className='flex justify-center gap-1'>
        <Button onClick={() => addCart(book.id)} type="primary" danger size='small'>
          Mua ngay
        </Button>
        <HeartOutlined />
      </div>
    </div>
  );
}

export default Item;
