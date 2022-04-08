
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartCards from "./CartCard";
import orderApiClient from "../../services/order-api-client";
import { useUser } from "../../hooks/useUser";
import { v4 as uuid } from "uuid";
import './CartList.css';

const CartList = ({ cart, setCart }) => {
    const {user} = useUser();
    const cartTotal = cart.reduce((currTotal, item) => {
        return currTotal + Number(item.price);
    }, 0);
    const [totale, setTotale] = useState(cartTotal);
    const cartOrderedBooks = cart.map((book) => book.id);
    const [orderedBooks, setOrderedBooks] = useState(cartOrderedBooks);
    const navigate = useNavigate();


    function addProduct(bookId, price) {
        setOrderedBooks([...orderedBooks, bookId]);

        setTotale((prevTotal) => prevTotal+price);
    }

    function removeProduct(bookId, price) {
        const updatedBooks = orderedBooks.filter(oBook => oBook !== bookId)
        setOrderedBooks(updatedBooks);

        setTotale((prevTotal) => prevTotal-price);
    }

    const handleClick = async() => {
        const orderId= uuid();
        // console.log(`cart: ${JSON.stringify(cart)}`);
        const books = cart.filter(book => orderedBooks.includes(book.id));
        console.log(`cart: ${JSON.stringify(books)}`);

        const response = await orderApiClient.postNewOrder(user.id, orderId, books, totale.toFixed(2));
        if(response.status === 'ok') {
            setCart([]);
            setTotale(0);
            if(!alert(`You have successfully bought books for: $${totale} with order id: ${orderId}`)) { navigate('/')}
        }
         
    }
    return (
        <>
            <div className="BookList-items">
                {
                    cart?.map(product => (<CartCards product={product} key={product.id} removeProduct={removeProduct}  addProduct={addProduct}/>))
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