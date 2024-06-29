import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../domain/domain';
import { Table, Card } from 'antd';
const User = () => {
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width: '100px',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '300px',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'DOB',
            key: 'DOB',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span className='flex gap-1'>
        //             <div className="btn btn-info btn-sm">
        //                 <i className="fas fa-pencil-alt">
        //                 </i>
        //                 Edit
        //             </div>
        //             <div className="btn btn-danger btn-sm">
        //                 <i className="fas fa-trash">
        //                 </i>
        //                 Delete
        //             </div>
        //         </span>
        //     ),
        // },

    ];
    const [users, setUsers] = useState([])
    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch(`${apiUrl}/api/users`)
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
                                <h1>Quản lý khách hàng</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">Khách hàng</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <Card 
                title="Danh sách khách hàng"  
                bordered={false}
                >
                    <Table dataSource={users} columns={columns} />
                </Card>
            </div>

        </div>
    )
};

export default User