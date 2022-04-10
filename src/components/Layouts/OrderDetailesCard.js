import React from 'react';
import './BookCards.css';

const OrderDetailesCard = ({ order }) => {


    return (
        <div id='card' className="card col s12 m4" style={{ height: "500px", width: "370px", margin: "10px" }}>
            <div style={{ height: "430px" }}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img id="book-card" className="Book-image activator responsive-img" src={order.imgUrl} alt="Book Picture" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{order.title}<i className="material-icons right">more_vert</i></span>
                    <p className="card-title grey-text text-darken-4">Authors: {order.authors.join(', ')}</p>
                    <p>Price: ${order.price}</p>
                </div>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{order.title}<i className="material-icons right">close</i></span>
                <p className="card-title grey-text text-darken-4">Condition: {order.condition} out of 5</p>
                <p className="card-title grey-text text-darken-4">Seller: {order.seller}</p>
                <div>
                    <p className="card-title grey-text text-darken-4">Description:</p>
                    {order.description}
                </div>
            </div>
        </div >
    )
}

export default OrderDetailesCard