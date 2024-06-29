// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Password.css'
import avatar from '../img/background_avatar.jpg'
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Input, Form, Row, Col, Card, message } from 'antd';
import { apiUrl } from '../domain/domain';
import axios from 'axios';

const Password = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [password, setPassword] = useState(localStorage.getItem('password'));
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [imageUrl, setImageUrl] = useState('');
  const [oldpass, setOldpass] = useState();
  const [newpass, setNewpass] = useState();
  const [repass, setRepass] = useState();
  // const history = useHistory();

  const handleUpdate = () => {
    const url = `${apiUrl}/api/change`;
    const data = {
      email: email,
      password: oldpass,
      newpass: newpass
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
        if (result.status === 200) {
          console.log(result);
          message.config({
            top: 100,
            duration: 2,
          });
          setTimeout(() => {
            message.success('Đổi mật khẩu thành công')
          }, 2000)
        }
        else {
          message.config({
            top: 100,
            duration: 2,
          });
          setTimeout(() => {
            message.success(result.message)
          }, 2000)
        }
        // Xử lý kết quả trả về từ API
      })
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });

  };

  useEffect(() => {
    axios.get(`${apiUrl}/api/users/profile`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      },
    })
      .then(res => {
        console.log(res.data);
        setName(res.data.user.name)
        setEmail(res.data.user.email)
        setImageUrl(res.data.user.avatar)


      })
      .catch(error => console.log(error));
  }, [])



  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: "10px" }}>
      <Card>
        <div className='flex flex-col gap-3'>
          <div className='flex pl-5'>
            <div style={{ height: 50, width: 50, borderRadius: '50%', overflow: "hidden" }}>
              <img src={imageUrl} alt='' />
            </div>
            <div style={{ marginLeft: '10px' }}><h1 className=' font-bold text-lg'>{name}</h1><h8>{email}</h8></div>
          </div>
          <div className='flex'>
            <div className='bg-white flex-[2_2_0%] justify-center items-center px-5 py-4'>
              <Form
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 150 }}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Mật khẩu hiện tại">
                      <Input value="**********" disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Nhập lại mật khẩu cũ">
                      <Input type='password' value={oldpass} onChange={e => setOldpass(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Mật khẩu">
                      <Input type='password' value={newpass} onChange={e => setNewpass(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Nhập lại mật khẩu">
                      <Input type='password' value={repass} onChange={e => setRepass(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Button className=' bg-blue-400' onClick={handleUpdate}><span className='text-bold text-base text-white'>Lưu</span></Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Password;
