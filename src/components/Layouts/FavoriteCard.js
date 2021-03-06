import React from 'react';
import './BookCards.css';
import { useUser } from '../../hooks/useUser';
import userApiClient from '../../services/user-api-client';
import { useNavigate } from 'react-router-dom';

const FavoriteCards = ({ book, setCart, cart, onBookSelect }) => {
    const { user, setNewUser } = useUser();
    const userId = user?.id;
    const navigate = useNavigate();
    console.log(`adding to cart: ${cart}`);

    function onAddingCart() {
        console.log(`Add to Cart: ${JSON.stringify(book)}`);

        setCart(cart => [...cart, book]);

        navigate('/favorites');
    }

    async function onRemoveBook() {

        console.log(user);
        const newUser = await userApiClient.putUpdateUser({
            ...user,
            favorite: user.favorite.filter(fav => fav !== book.id)
        });
        setNewUser(newUser);
        navigate('/favorites')

    }

    const onBookClick = () => {
        onBookSelect(book.id);
        navigate(`/book`);
    }
    return (
        <div className="card col s12 m4" style={{ height: "500px", width: "400px", margin: "10px" }}>
            <div style={{ height: "430px" }}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img id="book-card" className="Book-image activator responsive-img" src={book.imgUrl} alt="Book Picture" />
                </div>
                <div className="card-content">
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
            </div>
            <div className="buttons-div">
                {user && <button id='see_more' className='navButon' onClick={onBookClick}>See More</button>}
                {(user && userId !== book.sellerId) && <button className='navButon' onClick={onAddingCart}>
                    <span id="logo-container" href="#" className="brand-logo">
                        <span className="large material-icons" >add_shopping_cart</span>
                    </span>
                </button>}
                <button className='navButon' onClick={onRemoveBook}>
                    <span id="logo-container" href="#" className="brand-logo">
                        <span className="large material-icons" >remove_circle</span>
                    </span>
                </button>
            </div>
        </div >
    )
}

export default FavoriteCards