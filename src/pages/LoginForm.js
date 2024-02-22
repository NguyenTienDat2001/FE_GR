// LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mess, setMess] = useState('');
  const navigate = useNavigate();
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
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
            if (result.role === '2') {
              localStorage.setItem('user_id', result.user.id);
              navigate('/');
            }
            else if (result.role === '1'){
              navigate('/admin');
              localStorage.setItem('user_id', result.user.id);
            }
            else {
              navigate('/superadmin')
              localStorage.setItem('user_id', result.user.id);
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
    <div>
      <Link to="/">
        <button>Home page</button>
      </Link>
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
        <div  >
          <button type="submit" onClick={handleLogin}>Log in</button>

          <Link to="/signup">
            <button style={{ marginLeft: "180px", padding: "10px 15px" }}>Sign up</button>
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
