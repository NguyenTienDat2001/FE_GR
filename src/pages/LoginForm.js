// LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";
import axios from 'axios';
import { Button } from 'antd';

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
      setMess('Email invalid');
      return;
    }

    // Lưu thông tin đăng nhập vào biến trạng thái hoặc localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    const url = 'http://localhost:8000/api/login';
    const data = {
      email: username,
      password: password
    };
    console.log(data);

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
        console.log(result);
        localStorage.setItem('user_id', result.data.id);
        localStorage.setItem('token', result.token);
            if (result.data.role === '2') {
              navigate('/');
            }
            else if (result.data.role === '1'){
              navigate('/admin');
            }
            else {
              navigate('/admin')
            }
        // console.log(result);
        // Xử lý kết quả trả về từ API
      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });


  };
  // Chuyển hướng đến trang Dashboard
  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: "url('https://st3.depositphotos.com/3800275/37740/i/450/depositphotos_377407064-stock-photo-books-on-wooden-desk-table.jpg')"}}>
      {/* <Link to="/">
        <button>Home page</button>
      </Link> */}
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex items-center'>
          <Button type="primary" size='large' className='bg-blue-600 w-20' onClick={handleLogin}>Log in</Button>
          <Link to="/signup">
          <Button type='primary' size='large' className=' flex justify-center w-20 ml-44 pt-2 pb-2 pr-4 pl-4 bg-blue-600'>Sign up</Button>

          </Link>
        </div>
        <div>
          {mess && <p>{mess}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
