// LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";
import axios from 'axios';
import { Button, message, Card, Form, Row, Col, Input } from 'antd';
import Password from './Password';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mess, setMess] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  // const history = useHistory();
  localStorage.setItem('isLogin', 0);
  const handleLogin = () => {
    // Xử lý logic đăng nhập
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setMess('Email không hợp lệ');
      return;
    }
    else{
      setMess('');
    }

    // Lưu thông tin đăng nhập vào biến trạng thái hoặc localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    const url = 'http://localhost:8000/api/login';
    const data = {
      email: username,
      password: password
    };
    // console.log(data);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        localStorage.setItem('user_id', result.data.id);
        localStorage.setItem('token', result.token);
        if (result.errorCode === 0) {
          if (result.data.role === '2') {
            navigate('/');
          }
          else {
            navigate('/admin');
          }
        }
        else {
          console.log(result.message);
          message.config({
            top: 100,
            duration: 2,
          });
          setTimeout(() => {
            message.success(result.message)
          }, 2000)
        }
      })
      .catch(error => {
        console.error(error);
      });


  };
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://st3.depositphotos.com/3800275/37740/i/450/depositphotos_377407064-stock-photo-books-on-wooden-desk-table.jpg')" }}>
      <Card>
        <h2 className='font-sans text-center text-lg text-blue-500 font-medium'>Trang đăng nhập</h2>
        {/* <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div> */}
        {/* <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
        {/* <div className='items-center'>
            <Button type="primary" size='large' className='bg-blue-600 w-full' onClick={handleLogin}>Log in</Button>
            
          </div> */}

        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 150 }}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Email">
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Mật khẩu">
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button className=' bg-blue-400 w-full' onClick={handleLogin}><span className='text-bold text-base text-white'>Đăng nhập</span></Button>
            </Col>
          </Row>
        </Form>
        <div>Bạn chưa có tài khoản? <Link to='/signup'><span className='text-blue-400'>Đăng ký</span></Link>  tài khoản mới</div>
        <div >
          {mess && <p className='text-red-400'>{mess}</p>}
        </div>

      </Card>


    </div>
  );
};

export default LoginForm;
