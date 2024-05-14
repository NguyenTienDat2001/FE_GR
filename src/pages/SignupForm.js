// LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./LoginForm.css";
import { Button } from 'antd';


const SignupForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [mess, setMess] = useState('')
  // const history = useHistory();

  const handleSignup = () => {
    // Xử lý logic đăng nhập
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setMess('Email invalid');
      return;
    }

    if (newpassword !== password) {
      setMess('Password is not correct');
      return;
    }

    // Lưu thông tin đăng nhập vào biến trạng thái hoặc localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    const url = 'http://localhost:8000/api/register';
    const data = {
      email: username,
      password: password
    };
    console.log('data:', data);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setUsername("")
        setNewPassword("")
        setPassword("")
        navigate('/login')
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{backgroundImage: "url('https://st3.depositphotos.com/3800275/37740/i/450/depositphotos_377407064-stock-photo-books-on-wooden-desk-table.jpg')"}}>
      {/* <Link to="/">
        <button>Home page</button>
      </Link> */}
      <div className="login-container">
        <h2>Sign up</h2>

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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password again</label>
          <input
            type="password"
            placeholder="Enter password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div  >
          <Button type="primary" size='large' className='bg-blue-600' onClick={handleSignup}>Sign up</Button>
          <Link to="/login">
            <Button type='primary' size='large' className=' ml-44 pt-2 pb-2 pr-4 pl-4 bg-blue-600'>Log in</Button>
          </Link>
        </div>
        <div>
          {mess && <p>{mess}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
