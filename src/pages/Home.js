import './Home.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgGirl from '../img/hot_phto.png';
import Item from './Item';
import { useState, useEffect } from 'react';
import { AppstoreOutlined, ArrowLeftOutlined, ArrowRightOutlined, MailOutlined, RightCircleOutlined } from '@ant-design/icons';
import { Button, Menu, Radio, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
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

const Home = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [defaultImage, setDefaultImage] = useState({})
  const [books, setBooks] = useState([])
  const [textdes, setTextdes] = useState()
  const [texttest, setTexttest] = useState('<p><strong>&nbsp; &nbsp;&nbsp;</strong>Vào thế kỷ 19, đế chế Anh quốc áp đặt sự thống trị của mình bao trùm khắp thế giới. Tầng lớp quý tộc tự cho mình những đặc ân chưa từng thấy, khiến hố ngăn giai cấp ngày càng bị đào sâu.</p><p>&nbsp; &nbsp; &nbsp;Sinh ra trong một gia đình quý tộc như thế, nhưng Albert James Moriarty cảm thấy chán ghét chính dòng máu đang chảy trong người mình, và trong một lần thăm cô nhi viện, cậu đã tìm thấy hai đứa trẻ cùng chung lý tưởng. Cậu quyết định nhận nuôi cả hai, bước đầu tiên đưa William James Moriarty bước lên vũ đài, với khát khao thay đổi thế giới, mang lại một cuộc sống tươi đẹp hơn cho nhân loại.</p>')
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "flex", background: "#3498DB", borderRadius: "50%" }}
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
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const navigate = useNavigate()

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
    <div className='flex pl-36 pr-36 gap-7'>
      <div className='filter w-1/5 shadow mt-4 rounded'>
        <div>
          <p className='label-text'>Danh mục</p>
          <Radio.Group>
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
          <Radio.Group>
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
          <Radio.Group>
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
      <div className='mt-4 w-4/5'>

        <div className='flex justify-between pb-1 pt-1 bg-orange-300 items-center pl-1 pr-1 rounded-sm mb-1'>
          <span>Sách mới</span>
          <div>Xem tất cả<RightCircleOutlined /></div>
        </div>
        <div className='slider-class'>
          <Slider {...settings}>
            {books.slice(0,40).map(book => (
              <Item key={book.id} book={book} />
            ))}
          </Slider>
        </div>
        <div className='flex justify-between pb-1 pt-1 mt-4 bg-orange-300 items-center pl-1 pr-1 rounded-sm mb-1'>
          <span>Sách bán chạy</span>
          <div>Xem tất cả<RightCircleOutlined /></div>
        </div>
        <div className='slider-class'>
          <Slider {...settings}>
            {books.slice(0,20).map(book => (
              <Item key={book.id} book={book} />
            ))}
          </Slider>
        </div>
        <div className='body_content'>
        </div>
      </div>
    </div>

  );
};

export default Home;
