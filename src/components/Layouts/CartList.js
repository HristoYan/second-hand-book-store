
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCards from "./CartCard";
import './CartList.css';

const CartList = ({ cart, setCart }) => {
    const [totale, setTotale] = useState(0);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    function changeTotale(itemPrice) {
        setTotale((prevTotal) => prevTotal+itemPrice);
    }

    function changeOrder(itemTitle) {
        setOrder()
    }

    const handleClick = () => {
        console.log(order);
        setCart([]);
        setTotale(0);
        alert(`You have successfully bouht books for: $${totale}`);

        navigate('/');  
    }
    return (
        <>
            <div className="BookList-items">
                {
                    cart?.map(car => (<CartCards car={car} key={car.id} changeTotale={changeTotale} setOrder={setOrder}/>))
                }
            </div>
            <div id="price">
                <h3>Totale price: ${totale}</h3>
                <button type="button" className="btn-large waves-effect waves-light #2196F3" onClick={handleClick}>Check Out</button>
            </div>
        </>
    );
}

export default CartList;