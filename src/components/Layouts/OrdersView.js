import React from 'react';
import '../utilities/styleH2.css';
import OrderList from './OrderList';

const OrdersView = ({orders, setOrderSelect}) => {
    
    return (
        <div className="container">
            <div className="section">
                <h2>Your Ordres</h2>
                <div className="row">
                    <OrderList  orders={orders} setOrderSelect={setOrderSelect}/>
                </div>
            </div>
        </div >
    )
}

export default OrdersView