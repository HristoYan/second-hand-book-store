import React from 'react';
import BookList from './BooksList';
import '../utilities/styleH2.css';

const Titled = ({ title, onDeleteBook, onEditBook, setFavorite, setCart, cart, onBookSelect }) => {
    console.log(`Titled: ${JSON.stringify(title)}`);
    return (
        <>
            {!!(title) ? <div className="container">
                <div className="section">
                    <h2>Reading Time</h2>
                    <div className="row">
                        <BookList books={title} onBookSelect={onBookSelect} onDeleteBook={onDeleteBook} onEditBook={onEditBook} setFavorite={setFavorite} setCart={setCart} cart={cart} />
                    </div>
                </div>
            </div > : <h3>We Don't Have This Book</h3>}
        </>
    )
}

export default Titled;