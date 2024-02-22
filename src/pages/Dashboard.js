import './Dashboard.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgGirl from '../img/hot_phto.png';
import Item from './Item';
import { useState, useEffect } from 'react';
import { AppstoreOutlined, ArrowLeftOutlined, ArrowRightOutlined, MailOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Danh mục', 'sub1', <MailOutlined />, [
    getItem('Truyện tranh', '5'),
    getItem('Văn học', '6'),
    getItem('Kinh tế', '7'),
    getItem('Sách & truyện tranh thiếu nhi', '8'),
  ]),
  getItem('Tác giả', 'sub2', <AppstoreOutlined />, [
    getItem('Nguyễn Nhật Ánh', '9'),
    getItem('Nguyễn Đông Thức', '10'),
  ]),
  getItem('Độ tuổi', 'sub3', <AppstoreOutlined />, [
    getItem('Sách 2-3 tuổi', '11'),
    getItem('Sách 3-6 tuổi', '12'),
    getItem('Sách 6-9 tuổi', '13'),
    getItem('Sách 9-12 tuổi', '14'),
    getItem('Sách 12-18 tuổi', '15'),
    getItem('Sách >18 tuổi', '16'),
  ]),
  getItem('Giá', 'sub4', <AppstoreOutlined />, [
    getItem('Nhỏ hơn 50000đ', '17'),
    getItem('Từ 50000-100000đ ', '18'),
    getItem('Từ 100000-200000đ', '19'),
    getItem('Từ 200000-400000đ', '20'),
    getItem('Từ 400000-1000000đ', '21'),
    getItem('Trên 1000000đ', '22'),
  ]),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [defaultImage, setDefaultImage] = useState({})
  const [books, setBooks] = useState([])
 
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "#3498DB", borderRadius: "50%"}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "#3498DB", borderRadius: "50%" }}
        onClick={onClick}
      />
    );
  }
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  const navigate = useNavigate()
  // const handleErrorImage = (data) => {
  //   setDefaultImage((prev) => ({
  //     ...prev,
  //     [data.target.alt]: data.target.alt,
  //     linkDefault: imgGirl,
  //   }));
  // };
  // const viewdetail = (book_id) => {
  //   navigate(`/detail/${book_id}`)
  // }
  // const addCart = (book_id) => {
  //   const formdata = {
  //     user_id: localStorage.getItem('user_id'),
  //     book_id: book_id,
  //     quantity: 1
  //   };
  //   console.log('formdata', formdata);
  //   axios.post(`http://127.0.0.1:8000/api/cart/add`, formdata)
  //     .then(res => {
  //       console.log(res);
  //     })
  // }
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
    <div>
      <div className='book-title'>
        <span>Sách mới</span>
        <div>Xem tất cả<RightCircleOutlined /></div>
      </div>
      <div className='slider-class'>
        <Slider {...settings}>
        {books.map(book => (
                <Item key={book.id} book={book} />
            ))}
        </Slider>
      </div>
      <div className='book-title'>
        <span>Sách bán chạy</span>
        <div>Xem tất cả<RightCircleOutlined /></div>
      </div>
      <div className='slider-class'>
        <Slider {...settings}>
        {books.map(book => (
                <Item key={book.id} book={book} />
            ))}
        </Slider>
      </div>
      <div className='body_content'>
        <div
          style={{
            width: 200,
            position: 'absolute',
            top: '46.5%'
          }}
        >
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
