import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Table, Card, Button } from 'antd';
const User = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '300px',
        },
        {
            title: 'Role',
            dataIndex: 'rolename',
            key: 'rolename',
        },

    ];
    const [users, setUsers] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/api/profile')
            .then((response) => response.json())
            .then((data) => {
                // console.log('books is', data);
                setUsers(data.users)
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
                                <h1>Coupon List</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Coupons</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card 
                title="Product list"  
                bordered={false}
                >
                    <Table dataSource={users} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default User