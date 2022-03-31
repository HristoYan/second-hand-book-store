import React from 'react';
import '../utilities/styleH2.css';
import CartList from './CartList';

const Cart = ({ cart }) => {
    return (
        <div className="container">
            <div className="section">
                <h2>Shoping Cart</h2>
                <div className="row">
                    <CartList cart={cart}/>
                </div>
            </div>
        </div >
    )
}

export default Cart