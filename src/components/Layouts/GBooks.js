import React from 'react';
import GBookList from './GBookList';
import '../utilities/styleH2.css';

const GBooks = ({ books, setBookToSell }) => {
    console.log(books);
    return (
        <div className="container">
            <div className="section">
                <h2>Reading Time</h2>
                <div className="row">
                    <GBookList books={books} setBookToSell={setBookToSell}/>
                </div>
            </div>
        </div >
    )
}

export default GBooks