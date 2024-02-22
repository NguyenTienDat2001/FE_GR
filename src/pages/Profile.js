// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Profile.css'
import avatar from '../img/background_avatar.jpg'
import { Button } from 'antd';
import { Radio, DatePicker, Input } from 'antd';
import axios from 'axios';

const Profile = () => {
  const [sex, setSex] = useState()
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [dob, setDOB] = useState()
  const user_id = localStorage.getItem('user_id')
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/profile/${user_id}`)
      .then(res => {
        setName(res.data.data.name)
        setPhone(res.data.data.phone_number)
        setSex(res.data.data.sex)
        setAddress(res.data.data.address)
      })
      .catch(error => console.log(error));
  }, [])
  const handleUpdate = () => {
    console.log('cap nhat thong tin');
    const data = {
      user_id: localStorage.getItem('user_id'),
      name: name,
      sex: sex,
      phone: phone,
      address: address,
      // dob: dob,
    };
    axios.post(`http://127.0.0.1:8000/api/profile`, data)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      })
  }
  return (
    <div>
      <div className='profile'>
        <div className='menu1'>
          <div className='my-avatar'>
            <div className='avatar'>
              <img src={avatar} alt='' />
            </div>
            <div style={{ marginLeft: '10px' }}>Tiến Đạt<br /><h8>Sửa hồ sơ</h8></div>
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
              Email<br />
              Tên<br />
              Số điện thoại<br />
              Địa chỉ<br />
              Giới tính <br />
              <Button onClick={handleUpdate}>Lưu</Button>
            </div>
            <div className='label-value'>
              <Input value='dat@gmail.com' disabled /><br />
              <Input value={name} onChange={e => setName(e.target.value)} /><br />
              <Input value={phone} onChange={e => setPhone(e.target.value)} /><br />
              <Input value={address} onChange={e => setAddress(e.target.value)} /><br />
              <Radio.Group value={sex}>
                <Radio value='nam' onChange={e => setSex(e.target.value)}>Nam</Radio>
                <Radio value='nu' onChange={e => setSex(e.target.value)}>Nữ</Radio>
                <Radio value='other'onChange={e => setSex(e.target.value)}>Khác</Radio>
              </Radio.Group><br />
              {/* <DatePicker value={dob} onChange={e => setDOB(e.target.value)}/><br /> */}
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

export default Profile;
