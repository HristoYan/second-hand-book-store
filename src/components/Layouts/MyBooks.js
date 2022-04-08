import React from 'react';
import BookList from './BooksList'
import { useUser } from '../../hooks/useUser';

const MyBooks = ({books, onDeleteBook, onEditBook, onBookSelect}) => {
    const {user} = useUser();
    console.log(user);
    const myBooks = books.filter(book => book.sellerId === user.id);

    return (
        <div className="container">
            <div className="section">
                <h2 style={{ color: "#2196F3", margin: "50px" }}>Reading Time</h2>
                <div className="row">
                    <BookList  books={myBooks} onDeleteBook={onDeleteBook} onEditBook={onEditBook} onBookSelect={onBookSelect}/>
                </div>
            </div>
        </div >
    )
}

export default MyBooks