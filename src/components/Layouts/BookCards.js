import React from 'react';
import './BookCards.css';
import { useUser } from '../../hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import userApiClient from '../../services/user-api-client';

const BookCards = ({ book, onDeleteBook, onEditBook, setFavorite, setCart, cart, onBookSelect }) => {
    const { user, setNewUser } = useUser();
    const userId = user?.id;
    const navigate = useNavigate();
    // const params = useParams();
    console.log(cart);

    async function onAddingFavorite() {
        console.log(user);
        const updatedUser = {
            ...user,
            favorite: [...user.favorite, book.id]
        }
        console.log(`updatedUser: ${JSON.stringify(updatedUser)}`);
        const newUser = await userApiClient.putUpdateUser(updatedUser);

        setNewUser(newUser);
        console.log(`Book Favorite: ${book.id}`);
        setFavorite(book.id);
        navigate("/favorites");
    }

    function onAddingCart() {
        console.log(`Add to Cart: ${JSON.stringify(book)}`);
        if (!!cart) {

            setCart(cart => [...cart, book]);
        } else {
            setCart(book);
        }
        navigate("/");

    }

    const onBookClick = () => {
        onBookSelect(book.id);
        navigate(`/book`);
    }
    return (
        <div id='card' className="card col s12 m4" style={{ height: "500px", width: "370px", margin: "10px" }}>
            <div style={{ height: "430px" }}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img id="book-card" className="Book-image activator responsive-img" src={book.imgUrl} alt="Book Picture" />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{book.title}<i className="material-icons right">more_vert</i></span>
                </div>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{book.title}<i className="material-icons right">close</i></span>
                <p className="card-title grey-text text-darken-4">Authors: {book.authors.join(', ')}</p>
                <p>Price: ${book.price}</p>
                <p className="card-title grey-text text-darken-4">Condition: {book.condition} out of 5</p>
                <p className="card-title grey-text text-darken-4">Seller: {book.seller}</p>
                <div>
                    <p className="card-title grey-text text-darken-4">Description:</p>
                    {book.description}
                </div>
            </div>
            <div className="buttons-div">
                {user && <button id='see_more' className='navButon see_more' onClick={onBookClick}>See More</button>}
                {(user && userId !== book.sellerId) && <button className='navButon icon' onClick={() => onAddingCart(book)}>
                    <span id="logo-container" href="#" className="brand-logo">
                        <span className="large material-icons" >add_shopping_cart</span>
                    </span>
                </button>}
                {(user && userId !== book.sellerId) && <button className='navButon icon' onClick={onAddingFavorite}>
                    <span id="logo-container" href="#" className="brand-logo">
                        <span className="large material-icons" >favorite</span>
                    </span>
                </button>}
                {(userId === book.sellerId || user?.role === "Admin") && <div className='navButon'>
                    <button className='navButon icon' onClick={() => onDeleteBook(book.id)}>
                        <span id="logo-container" href="#" className="brand-logo">
                            <span className="large material-icons" >delete_forever</span>
                        </span>
                    </button>
                    <button className='navButon icon' onClick={() => onEditBook(book)}>
                        <span id="logo-container" href="#" className="brand-logo">
                            <span className="large material-icons" >edit</span>
                        </span>
                    </button>
                </div>
                }
            </div>
        </div >
    )
}

export default BookCards