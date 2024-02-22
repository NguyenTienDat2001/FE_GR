import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
import axios from 'axios';
// import moment from 'moment';
const Event = () => {
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Description',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Point',
            dataIndex: 'point',
            key: 'point',
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'action',
            render: (text, record) => {
                if (text !== '0') {
                    return <div>
                        <span className="btn btn-primary btn-sm" onClick={() => updateStatus(record.id, "0")}>
                            <i className="fas fa-folder">
                            </i>
                            Active
                        </span>
                    </div>
                }
                else {
                    return <div>
                        <span onClick={() => updateStatus(record.id, "1")} className="btn btn-danger btn-sm">
                            <i className="fas fa-trash">
                            </i>
                            Block
                        </span>
                    </div>
                }
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
        axios.put(`http://localhost:8000/api/events/${id}`, data)
            .then(res => {
                if (res.data.status === 200) {
                    window.location.reload();
                    console.log('update sucessfully');
                }
            });
    }
    const [events, setEvents] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/events')
            .then((response) => response.json())
            .then((data) => {
                // console.log('books is', data);
                setEvents(data.event)
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            <div className="content-wrapper">

                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Event List</h1>
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
                <Card
                    title="Import list"
                    bordered={false}
                    extra={<Button onClick={handleAdd} type="primary">Add</Button>}
                >
                    <Table dataSource={events} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default Event