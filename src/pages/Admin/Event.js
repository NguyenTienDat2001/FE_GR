import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button, message } from 'antd';
import { apiUrl } from '../../domain/domain';
import axios from 'axios';
// import moment from 'moment';
const Event = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => text.toString().padStart(4, '0'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (text) => `${text}đ`,
        },
        {
            title: 'Điểm',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: '',
            dataIndex: 'status',
            key: 'action',
            render: (text, record) => {
                return (
                    <div>
                        {text !== '0' ? (
                            <span className="btn btn-primary btn-sm" onClick={() => updateStatus(record.id, "0")}>
                                <i className="fas fa-check-circle"></i>
                                Active
                            </span>
                        ) : (
                            <span className="btn btn-danger btn-sm" onClick={() => updateStatus(record.id, "1")}>
                                <i className="fas fa-ban"></i>
                                Block
                            </span>
                        )}
                        <div onClick={() => deleteEvent(record.id)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>
                            <i className="fas fa-trash"></i>
                            Xóa
                        </div>
                    </div>
                );

            },
        },
    ];
    const handleAdd = () => {
        navigate('/admin/event/add')
    }
    const updateStatus = (id, status) => {
        const data = {
            status: status
        };
        axios.put(`${apiUrl}/api/events/${id}`, data)
            .then(res => {
                getEvent()
                console.log('update sucessfully');
            });
    }
        const deleteEvent = (id) => {
            axios.delete(`${apiUrl}/api/events/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        console.log('Delete item in cart successfully');
                        getEvent()
                    } else if (res.status === 201) {
                        console.log('You do not have permission to delete this item.');
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        setTimeout(() => {
                            message.success('Bạn chưa được cấp quyền xóa')
                        }, 2000)
                    }
                })
            
            
        }
    
    useEffect(() => {
        getEvent()
    }, []);

    const getEvent = () => {
        fetch(`${apiUrl}/api/events`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.events)
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Danh sách sự kiện</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                                    <li className="breadcrumb-item active">Sự kiện</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card
                    title="Danh sách sự kiện"
                    bordered={false}
                    extra={<Button className=' bg-green-500' onClick={handleAdd} type="primary">Thêm</Button>}
                >
                    <Table dataSource={events} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Event