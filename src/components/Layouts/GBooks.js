import React from 'react';
import GBookList from './GBookList';
import '../utilities/styleH2.css';

const GBooks = ({ books, setBookToSell, setTitle, setMessage }) => {
    console.log(books);
    return (
        <div className="container">
            <div className="section">
                <h2>Reading Time</h2>
                <div className="row">
                    <GBookList books={books} setBookToSell={setBookToSell} setTitle={setTitle} setMessage={setMessage}/>
                </div>
            </div>
        </div >
    )
}

export default GBooks