import { useNavigate } from 'react-router-dom';
import orderApiClient from '../../services/order-api-client';
import './OrderCards.css';

export const OrderCards = ({ order, setOrderSelect }) => {
    const navigane = useNavigate();
    async function orderDisplay() {
        const response = await orderApiClient.fetchOrderById(order.orderId);
        console.log(`OrderResponse: ${response.ordered_books}`);
        setOrderSelect(response.ordered_books);
        navigane('/order-detailes');
    }
    return (
        <div id="order-card" className="card col m12" onClick={orderDisplay}>
            <div className="card-content lightblue order">

                <div className='order-info' id='ordernum'><h5>Order # </h5>{order.orderId}</div>
                <div className='order-info' id='date'><h6>Date:</h6> {order.createdDate} </div>
                <div className='order-info' id='order-price'><h6> Order Price:</h6> ${order.orderTotal}</div>
                <div className='order-info' id='status'><h6>Order Status:</h6> {order.status}</div>
            </div>
        </div>
    );
}