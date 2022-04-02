import React from 'react';
import './BookCards.css';
import { useUser } from '../../hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';

const BookCards = ({ book, onDeleteBook, onEditBook, setFavorite, setCart, cart, onBookSelect }) => {
    const { user } = useUser();
    const userId = user?.id;
    const navigate = useNavigate();
    const params = useParams();
    console.log(cart);

    function onAddingFavorite() {

        console.log(`Book Favorite: ${book.id}`);
        setFavorite(book.id);
        navigate("/favorites");
    }

    function onAddingCart () {
        console.log(`Add to Cart: ${JSON.stringify(book)}`);
        if(!!cart) {

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
            <div>
                {user && <button className='navButon' onClick={onBookClick}>See More</button>}
                {(user && userId !== book.sellerId) && <button className='navButon' onClick={() => onAddingCart(book)}>Add to Cart</button>}
                {(user && userId !== book.sellerId) && <button className='navButon' onClick={onAddingFavorite}>Add to Favorite</button>}
                {(userId === book.sellerId || user?.role === "Admin") && <div>
                    <button className='navButon' onClick={() => onDeleteBook(book.id)}>Delete</button>
                    <button className='navButon' onClick={() => onEditBook(book)}>Edit</button>
                </div>
                }
            </div>
        </div >
    )
}

export default BookCards