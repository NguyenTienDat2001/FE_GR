// LoginForm.jsx
import React, { useState } from 'react';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Password.css'
import avatar from '../img/background_avatar.jpg'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

const Password = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  // const history = useHistory();

  const handleUpdate = () => {
    // Xử lý logic đăng nhập

    // Lưu thông tin đăng nhập vào biến trạng thái hoặc localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    const url = 'http://localhost:8000/user/update';
    const data = {
      user: username,
      pass: password
    };
    console.log(data);

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // Xử lý kết quả trả về từ API
      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });
  };

  // Chuyển hướng đến trang Dashboard

  return (
    <div>
      <div className='profile'>
        <div className='menu1'>
          <div className='my-avatar'>
            <div className='avatar'>
              <img src={avatar} alt='' />
            </div>
            <div style={{marginLeft:'10px'}}>Tiến Đạt<br/><h8>Sửa hồ sơ</h8></div>
          </div>
          <div><UserOutlined /> Tài khoản của tôi</div>
          <div><ShoppingOutlined /> Đổi mật khẩu</div>
          <div><ShoppingCartOutlined /> Đơn hàng</div>
        </div>
        <div className='infor'>
          <div className='intro'>
            Hồ sơ của tôi <br />
            Quản lý thông tin của bạn
          </div>
          <div className='content'>
            <div className='label'>
              Mật khẩu hiện tại<br />
              Nhập lại mật khẩu cũ<br />
              Mật khẩu <br />
              Nhập lại mật khẩu<br />
              <Button>Lưu</Button>
            </div>
            <div className='label-value'>
              ***********<br />
              <Input placeholder="" /><br />
              <Input placeholder="" /><br />
              <Input placeholder="" /><br />
            </div>
            <div className='update_avatar'>
              <div className='avatar1'>
                <img src={avatar} alt='' />
              </div>
              <div><Button type="primary" danger >Chọn ảnh</Button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
