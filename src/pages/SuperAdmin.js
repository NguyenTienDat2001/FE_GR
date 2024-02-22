// LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SuperAdmin = () => {

    const [users, setusers] = useState([]);


    useEffect(() => {
        // Gọi API để lấy dữ liệu danh sách cuốn sách
        fetch('http://127.0.0.1:8000/user')
            .then((response) => response.json())
            .then((data) => setusers(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div style={{ margin: "10px 0 0 10px" }}>
            <Link to='/login' >
                <button type="submit">Log out</button>
            </Link>
            <h2>List user</h2>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.user}</td>
                            <td>{user.role === 1 ? (<>User</>) : (<>Admin</>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuperAdmin;
