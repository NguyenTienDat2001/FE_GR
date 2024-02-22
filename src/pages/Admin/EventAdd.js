import { useState } from 'react';
import { Card, Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const EventAdd = () => {
    const navigate = useNavigate()
    const [des, setDes] = useState()
    const [value, setValue] = useState()
    const [point, setPoint] = useState()
    const handleClose = () => {
        navigate('/admin/event')
    }
    const data = {
        des: des,
        value: value,
        point: point,
    };
    const handleAdd = () => {
        console.log(data);
        axios.post(`http://127.0.0.1:8000/api/events`, data)
            .then(result => {
                console.log(result);
                message.config({
                    top: 100, // Thay đổi giá trị top tùy thuộc vào vị trí mong muốn
                    duration: 2,
                  });
                setTimeout(() => {
                    message.success('Add event successfully')
                }, 2000)
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Event Add</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Events</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: "80%" }}>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                        >
                            <Form.Item label="Description">
                                <Input value={des} onChange={e => setDes(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Value">
                                <Input value={value} onChange={e => setValue(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="Point">
                                <Input value={point} onChange={e => setPoint(e.target.value)} />
                            </Form.Item>
                            <Button onClick={handleAdd} color='blue'>Add</Button>
                            <Button onClick={handleClose} color='blue'>Close</Button>
                        </Form>
                    </Card>
                </div>

            </div>

        </div>
    )
};

export default EventAdd