import React from 'react';
import '../utilities/styleH2.css';
import OrderList from './OrderList';

const OrdersView = ({orders}) => {
    
    return (
        <div className="container">
            <div className="section">
                <h2>Your Ordres</h2>
                <div className="row">
                    <OrderList  orders={orders}/>
                </div>
            </div>
        </div >
    )
}

export default OrdersView