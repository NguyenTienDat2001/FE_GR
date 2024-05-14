import { useParams } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { Alert, Button, Input, Select, message, Modal } from 'antd';
import axios from "axios";
import './Detail.css';
import { useState, useEffect } from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
function Detail() {
  const { id } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [book, setBook] = useState('')
  const [quantity, setQuantity] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState(null)
  const [voice, setVoice] = useState("hue-baoquoc")
  const [loading, setLoading] = useState(true);
  const [isborrow, setIsborrow] = useState();
  const [duration, setDuration] = useState("1");
  const synth = window.speechSynthesis;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //

  //
  const readTextFromHTML = (htmlString) => {
    // Tạo một phần tử div ẩn để làm bảng điều khiển cho việc parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Lấy ra nội dung văn bản từ phần tử div
    const textContent = tempDiv.textContent || tempDiv.innerText || '';

    // Trả về nội dung văn bản thuần túy
    return textContent.trim();
  }

  const handleVoice = (value) => {
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      setIsSpeaking(false)
    }
    setVoice(value)
  }
  const speak = () => {
    setIsSpeaking(!isSpeaking)
    if (isSpeaking) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    } else {
      if (audio) {
        audio.play();
      }
    }
  };
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

  const generateRandomCode = (length) => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  const handleBorrow = (book_id) => {
    setIsModalOpen(false);
    const formdata = {
      order_id: generateRandomCode(8),
      book_id: book_id,
      user_id: localStorage.getItem('user_id'),
      duration: duration,
      total_price: 20000 * duration
    };
    console.log('formdata', formdata);
    axios.post('http://127.0.0.1:8000/api/payment', formdata)
      .then(res => {
        window.location.href = res.data;
        console.log(res);

      })
  }
  const readmore = isOpen ? null : 'description'
  useEffect(() => {
    const handleAudioEnded = () => {
      setIsSpeaking(false); // Khi audio kết thúc, đặt isSpeaking về false
    };

    if (audio) {
      audio.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [audio]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}`, {
      headers: {
        'Authorization': token
      }
    },)
      .then(res => {
        setBook(res.data.book)
        setIsborrow(res.data.isborrow)
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (book) {
      const updateAudio = async () => {
        setLoading(true)
        axios.post(`https://viettelai.vn/tts/speech_synthesis`, {
          text: readTextFromHTML(book.description),
          voice: voice,
          id: "2",
          without_filter: false,
          speed: 1.0,
          tts_return_option: 2
        }, {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            'token': 'bef0e6a9c828f8a0808cc5bd28fc6264'
          },
          responseType: 'arraybuffer'
        })
          .then(res => {
            console.log("Response data:", res.data);
            const audioBlob = new Blob([res.data], { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log("Audio URL:", audioUrl);
            const newaudio = new Audio(audioUrl);
            setAudio(newaudio);
            setLoading(false);

          })
          .catch(error => {
            setLoading(false);
            console.error("Error:", error);
          });
      };
      updateAudio();
    }
  }, [voice, book]);
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
          <div className="flex justify-start items-center gap-4 ">
            <div className='flex items-center py-3 gap-2'>
              <span className='text-red text-4xl pr-1 m-0'>{book.sell_price}đ</span>
              <span className='text-gray text-2xl pr-1'><del>{book.sell_price + 5000}đ</del></span>
              <span className='text-white text-lg p-0 mr-1 bg-red-600'>15%</span>
            </div>
            <div>
              {!isborrow && book.category === "Truyện chữ" && (
                <Button onClick={showModal} style={{ backgroundColor: 'blue', color: 'white' }}>Thuê sách</Button>
              )}
              {isborrow && book.category === "Truyện chữ" && (
                <Button disabled style={{ backgroundColor: 'gray', color: 'white' }}>Đã thuê</Button>
              )}
            </div>
            <Modal
              title="Thuê sách"
              open={isModalOpen}
              onOk={() => handleBorrow(book.id)}
              onCancel={handleCancel}
              okButtonProps={{ style: { backgroundColor: 'blue', color: 'white' } }}
              width={400}
            >
              <div className=" mb-3">Chi phí 20000đ/tháng</div>
              <Select className=" w-full" defaultValue={duration} onChange={(value) => setDuration(value)}>
                <Option value="1">1 tháng</Option>
                <Option value="2">2 tháng</Option>
                <Option value="3">3 tháng</Option>
                <Option value="6">6 tháng</Option>
              </Select>

            </Modal>

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
          <div className=" pb-3">
            {loading ? (
              <div>Loading audio...</div>
            ) : (
              <div>
                {audio && (
                  <audio
                    src={audio.src}
                    controls
                  />
                )}
              </div>
            )}
          </div>
          <div className="pb-3">
            <div className={readmore}>
              <div className="flex gap-2 items-center">
                {/* <i className={`hover:cursor-pointer fas fa-volume-${isSpeaking ? 'up' : 'mute'}`} onClick={speak}></i> */}
                <Select defaultValue={voice} onChange={handleVoice}>
                  <Option value="hn-quynhanh">Quỳnh Anh - Giọng nữ miền Bắc chất lượng cao</Option>
                  <Option value="hcm-diemmy">Diễm My - Giọng nữ miền Nam chất lượng cao</Option>
                  <Option value="hue-maingoc">Mai Ngọc - Giọng nữ miền Trung chất lượng cao</Option>
                  <Option value="hn-phuongtrang">Phương Trang - Giọng nữ miền Bắc chất lượng cao</Option>
                  <Option value="hn-thanhtung">Thanh Tùng - Giọng nam miền Bắc</Option>
                  <Option value="hue-baoquoc">Bảo Quốc - Giọng nam miền Trung</Option>
                  <Option value="hcm-minhquan">Minh Quân - Giọng nam miền Nam</Option>
                  <Option value="hn-thaochi">Thảo Chi - Giọng nữ miền Bắc</Option>
                  <Option value="hcm-phuongly">Phương Ly - Giọng nữ miền Nam</Option>
                  <Option value="hcm-thuyduyen">Thùy Duyên - Giọng nữ miền Nam</Option>
                  <Option value="hn-tienquan">Tiến Quân - Giọng nam miền Bắc</Option>
                </Select>
              </div>
              {/* {book.description} */}
              <div dangerouslySetInnerHTML={{ __html: book.description }} />
            </div>
          </div>
          <Button className="bg-red-400" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Ẩn bớt...' : 'Xem thêm...'}</Button>
        </div>
      </div>

    </div>
  );
}

export default Detail;
