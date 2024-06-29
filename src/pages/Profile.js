// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Profile.css'
import avatar from '../img/background_avatar.jpg'
import { Button } from 'antd';
import { Radio, DatePicker, Input, Form, Row, Col, Select, Card } from 'antd';
import { storage } from '../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import dayjs from 'dayjs';
import axios from 'axios';
import { apiUrl } from '../domain/domain';

const Profile = () => {
  const [sex, setSex] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [dob, setDOB] = useState()
  const user_id = localStorage.getItem('user_id')
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);

  const onChangeDate = (date, dateString) => {
    setDOB(date)
    console.log("dtring is", dateString);
    console.log("date is", date);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const imageRef = ref(storage, `avatars/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          console.log('File available at', url);
        });
      }
    );
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
        setPhone(res.data.user.phone_number)
        setSex(res.data.user.sex)
        setAddress(res.data.user.address)
        setImageUrl(res.data.user.avatar)
        setDOB(res.data.user.DOB);

      })
      .catch(error => console.log(error));
  }, [])
  const handleUpdate = () => {
    console.log('cap nhat thong tin');
    const data = {
      user_id: localStorage.getItem('user_id'),
      name: name,
      sex: sex,
      phone_number: phone,
      address: address,
      avatar: imageUrl,
      DOB: dob,
    };
    axios.post(`${apiUrl}/api/users/profile`, data)
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      })
  }
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
            {/* <div className='label'>
              Email<br />
              Tên<br />
              Số điện thoại<br />
              Địa chỉ<br />
              Giới tính <br />
              Ngay sinh <br />
              <div>
                <Button className=' bg-blue-700' onClick={handleUpdate}>Lưu</Button>
              </div>
            </div>
            <div className='label-value'>
              <Input value='dat@gmail.com' disabled /><br />
              <Input value={name} onChange={e => setName(e.target.value)} /><br />
              <Input value={phone} onChange={e => setPhone(e.target.value)} /><br />
              <Input value={address} onChange={e => setAddress(e.target.value)} /><br />
              <Radio.Group value={sex}>
                <Radio value='nam' onChange={e => setSex(e.target.value)}>Nam</Radio>
                <Radio value='nu' onChange={e => setSex(e.target.value)}>Nữ</Radio>
                <Radio value='other' onChange={e => setSex(e.target.value)}>Khác</Radio>
              </Radio.Group><br />
              <DatePicker value={dayjs(dob)} onChange={onChangeDate} />

            </div> */}
            <div className='bg-white flex-[2_2_0%] justify-center items-center px-5 py-4'>
              <Form
                labelCol={{ span: 20 }}
                wrapperCol={{ span: 150 }}
                layout="vertical"
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input value={email} disabled />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Tên">
                      <Input value={name} onChange={e => setName(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Số điện thoại" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                      <Input value={phone} onChange={e => setPhone(e.target.value)} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Địa chỉ" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                      <Input value={address} onChange={e => setAddress(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Giới tính" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                      <Radio.Group value={sex}>
                        <Radio value='nam' onChange={e => setSex(e.target.value)}>Nam</Radio>
                        <Radio value='nu' onChange={e => setSex(e.target.value)}>Nữ</Radio>
                        <Radio value='other' onChange={e => setSex(e.target.value)}>Khác</Radio>
                      </Radio.Group><br />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Ngày sinh" labelCol={{ span: 12 }} wrapperCol={{ span: 24 }}>
                      <DatePicker value={dayjs(dob)} onChange={onChangeDate} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                <Button className=' bg-blue-400' onClick={handleUpdate}><span className='text-bold text-base text-white'>Lưu</span></Button>
                </Row>
              </Form>
            </div>
            <div className='update_avatar flex-[1_1_0%]'>
              {imageUrl && (
                <div>
                  <img className=' pb-3' src={imageUrl} alt="Uploaded Avatar" height="150px" width="150px" />
                  <a className='font-bold text-base' href={imageUrl} target="_blank" rel="noopener noreferrer">Xem ảnh</a>
                </div>
              )}
              <div className='pt-2 pb-2'>
                <input type="file" onChange={handleChange} />
              </div>
              <div className='mt-[12px]' >
                <Button className=' bg-green-400' onClick={handleUpload}><span className='text-bold text-base text-white'>Upload</span></Button>
              </div>
              <br />

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
