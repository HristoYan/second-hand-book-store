import React from 'react';
import './BookCards.css';
import { useUser } from '../../hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import userApiClient from '../../services/user-api-client';

const FavoriteCards = ({ book, setCart, cart, onBookSelect, userInfo }) => {
    const { user } = useUser();
    const userId = user?.id;
    const navigate = useNavigate();
    const params = useParams();
    console.log(cart);
    
    function onAddingCart() {
        console.log(`Add to Cart: ${JSON.stringify(book)}`);
        if (!!cart) {

            setCart(cart => [...cart, book]);
        } else {
            setCart(book);
        }
        navigate("/");

    }

    async function onRemoveBook() {
        const oldFav = userInfo.favorite;
        console.log(`OldFav: >>${oldFav}`);
        console.log(`BookID: >>${book.id}`);

        const index = oldFav.indexOf(book.id);
        console.log(`Index: >>${index}`);

        oldFav.splice(index, 1);
        console.log(`Left after Splice: >>${oldFav}`);
        await userApiClient.putUpdateUser({
            ...user,
            favorite: oldFav
        });
        navigate('/favorites')

    }

    const onBookClick = () => {
        onBookSelect(book.id);
        navigate(`/book`);
    }
    return (
        <div className="card col s12 m4" style={{ height: "600px", width: "370px", margin: "10px" }}>
            <div className="card-image waves-effect waves-block waves-light">
                <img id="book-card" className="Book-image activator responsive-img" src={book.imgUrl} alt="Book Picture" />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{book.title}<i className="material-icons right">more_vert</i></span>
                <p className="card-title grey-text text-darken-4">Authors: {book.authors.join(', ')}</p>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{book.title}<i className="material-icons right">close</i></span>
                <p>Price: ${book.price}</p>
                <p className="card-title grey-text text-darken-4">Condition: {book.condition} out of 5</p>
                <p className="card-title grey-text text-darken-4">Seller: {book.seller}</p>
                <div>
                    <p className="card-title grey-text text-darken-4">Description:</p>
                    {book.description}
                </div>
            </div>
            <div className="buttons-div">
                {user && <button className='navButon' onClick={onBookClick}>See More</button>}
                {(user && userId !== book.sellerId) && <button className='navButon' onClick={() => onAddingCart(book)}>
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