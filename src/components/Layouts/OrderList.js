import {OrderCards} from "./OrderCards";

const OrderList = ({ orders, setOrderSelect }) => {
    console.log(`ORDERS: ${JSON.stringify(orders)}`);
    return (
        <div className="BookList-items">
            {
                orders?.map(order => (<OrderCards  order={order} key={order.orderId} setOrderSelect={setOrderSelect}/>))
            }
        </div>
    );
}

export default OrderList;