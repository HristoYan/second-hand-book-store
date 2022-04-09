

export const OrderCards = ({ order }) => {

    return (
        <div id="order-card" className="card col m12" >
            <div className="card-content lightblue order">

                <div><h5>Order # </h5>{order.orderId}</div>
                <div>Date: {order.createdDate} </div>
                <p> Order Price: ${order.orderTotal}</p>
                <span>Order Status: {order.status}</span>
            </div>
        </div>
    );
}