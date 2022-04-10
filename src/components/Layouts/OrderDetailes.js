import React from 'react';
import '../utilities/styleH2.css';
import OrderDetailesList from './OrderDetailesList';

const OrderDetailes = ({orders}) => {
    
    return (
        <div className="container">
            <div className="section">
                <h2>Your Order Detailes</h2>
                <div className="row">
                    <OrderDetailesList  orders={orders}/>
                </div>
            </div>
        </div >
    )
}

export default OrderDetailes