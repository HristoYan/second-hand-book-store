
import { useState } from "react";
import CartCards from "./CartCard";
import './CartList.css';

const CartList = ({ cart }) => {
    const [totale, setTotale] = useState();

    const handleClick= () => {
        alert(`You have successfully bouht books for: $${totale}`);
        setTotale(0);
    }
    return (
        <>
            <div className="BookList-items">
                {
                    cart?.map(car => (<CartCards car={car} key={car.id} setTotale={setTotale}/>))
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