import React from 'react';
import '../utilities/styleH2.css';
import { useUser } from '../../hooks/useUser';

import FavoriteList from './FavoriteList';

const Favorites = ({ books, onDeleteBook, setCart, onBookSelect }) => {
    console.log(books);
    const { user } = useUser();
    
    const favBooks = books.filter(book => user.favorite.includes(book.id) )
    return (
        <>
            {!!(favBooks) ? <div className="container">
                <div className="section">
                    <h2>Your Favorite Books</h2>
                    <div className="row">
                        <FavoriteList books={favBooks} onDeleteBook={onDeleteBook} setCart={setCart} onBookSelect={onBookSelect}/>
                    </div>
                </div>
            </div > : <h2>Nothing in  Favorites yet!</h2>}
        </>
    )
}

export default Favorites;

