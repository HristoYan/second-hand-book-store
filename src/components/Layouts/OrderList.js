import {OrderCards} from "./OrderCards";

const OrderList = ({ orders }) => {
    console.log(`ORDERS: ${orders.orders}`);
    return (
        <div className="BookList-items">
            {
                orders?.map(order => (<OrderCards  order={order} key={order.orderId}/>))
            }
        </div>
    );
}

export default OrderList;