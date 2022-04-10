import OrderDetailesCard from "./OrderDetailesCard";

const OrderDetailesList = ({ orders }) => {
    console.log(`ORDERS: ${JSON.stringify(orders)}`);
    return (
        <div className="BookList-items">
            {
                orders?.map(order => (<OrderDetailesCard  order={order} key={order.id}/>))
            }
        </div>
    );
}

export default OrderDetailesList;