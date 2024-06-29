// LoginForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl } from '../domain/domain';
import "./LoginForm.css";
import { Button, message, Card, Form, Row, Col, Input } from 'antd';



const SignupForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [mess, setMess] = useState('')
  // const history = useHistory();

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setMess('Email không hợp lệ');
      return;
    }
    else {
      setMess('');

    }

    if (newpassword !== password) {
      setMess('Nhập lại mật khẩu không khớp');
      return;
    }
    else {
      setMess('');

    }
    const url = `${apiUrl}/api/register`;
    const data = {
      email: username,
      password: password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result.message);
        if (result.errorCode === 1) {
          message.config({
            top: 100,
            duration: 2,
          });
          setTimeout(() => {
            message.success(result.message)
          }, 2000)
        }
        if (result.errorCode === 0) {
          console.log(result)
          setUsername("")
          setNewPassword("")
          setPassword("")
          message.config({
            top: 100,
            duration: 2,
          });
          setTimeout(() => {
            message.success("Đăng ký thành công")
          }, 2000)
        }
        // navigate('/login')
      })
      .catch(error => {
        console.error(error);


      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://st3.depositphotos.com/3800275/37740/i/450/depositphotos_377407064-stock-photo-books-on-wooden-desk-table.jpg')" }}>
      <Card>
        <h2 className='font-sans text-center text-lg text-blue-500 font-medium'>Trang đăng ký</h2>
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
              <Form.Item label="Nhập lại mật khẩu">
                <Input type='password' value={newpassword} onChange={(e) => setNewPassword(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Button className=' bg-blue-400 w-full' onClick={handleSignup}><span className='text-bold text-base text-white'>Đăng ký</span></Button>
            </Col>
          </Row>
        </Form>
        <div>Bạn đã có tài khoản? <Link to='/login'><span className='text-blue-400'>Đăng nhập</span></Link> tài khoản của bạn</div>
        <div>
          {mess && <p className='text-red-400'>{mess}</p>}
        </div>

      </Card>
    </div>
  );
};

export default SignupForm;
