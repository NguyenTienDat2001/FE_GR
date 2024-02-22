
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
function PaymentResult() {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('vnp_Amount');
    const bankCode = queryParams.get('vnp_BankCode');
    const orderInfo = queryParams.get('vnp_OrderInfo');
    const order_id = queryParams.get('order_id');
    const handleReturn = () => {
        const data = {
            order_id: order_id,
            amount: amount/100,
            bank_code: bankCode,
            infor: orderInfo,
        };
        console.log("data", data);
        axios.post(`http://127.0.0.1:8000/api/payment/trans`, data)
            .then(result => {
                console.log(result);
                // window.location.href = result.data;
                navigate('/')
            })
            .catch(error => {
                console.error(error);
            })
        
    }
    
    // Lấy các thông tin khác

    return (
        <div>
            <h1>Xác nhận thanh toán</h1>
            <p>Số tiền: {amount/100}</p>
            <p>Mã ngân hàng: {bankCode}</p>
            <p>Thông tin đơn hàng: {orderInfo}</p>
            {/* Hiển thị các thông tin khác */}
            <Button onClick={handleReturn}>Quay lai</Button>
        </div>
    );
}

export default PaymentResult;
