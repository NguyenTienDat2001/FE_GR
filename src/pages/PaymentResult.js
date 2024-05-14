
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect } from 'react';
import axios from 'axios';
function PaymentResult() {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('vnp_Amount');
    const bankCode = queryParams.get('vnp_BankCode');
    const orderInfo = queryParams.get('vnp_OrderInfo');
    const order_id = queryParams.get('order_id');
    const user_id = queryParams.get('user_id');
    const book_id = queryParams.get('book_id');
    const duration = queryParams.get('duration');
    let data = {};
    useEffect(() => {
        handleReturn()
    }, [])
    const handleReturn = () => {
        if (order_id) {
            data = {
                order_id: order_id,
                amount: amount / 100,
                bank_code: bankCode,
                infor: orderInfo,
            };
        } else {
            data = {

                book_id: parseInt(book_id, 10),
                user_id: parseInt(user_id, 10), 
                duration: parseInt(duration, 10),
                amount: amount / 100,
                bank_code: bankCode,
                infor: orderInfo,
            };
        }
        console.log("data", data);
        axios.post(`http://127.0.0.1:8000/api/payment/trans`, data)
            .then(result => {
                console.log(result);
                // window.location.href = result.data;
                // navigate('/')
            })
            .catch(error => {
                console.error(error);
            })

    }

    const handleOk = () => {
        navigate('/')
    }

    return (
        <div>
            <Modal title="Xác nhận thanh toán" open={true} onOk={handleOk}>
            <p>Số tiền: {amount / 100}</p>
            <p>Mã ngân hàng: {bankCode}</p>
            <p>Thông tin đơn hàng: {orderInfo}</p>
            </Modal>
        </div>
    );
}

export default PaymentResult;
