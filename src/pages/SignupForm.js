// LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./LoginForm.css";


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
    <div>
      <Link to="/">
        <button>Home page</button>
      </Link>
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
          <button type="submit" onClick={handleSignup}>Sign up</button>

          <Link to="/login">
            <button style={{ marginLeft: "180px", padding: "10px 15px" }}>Log in</button>
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
