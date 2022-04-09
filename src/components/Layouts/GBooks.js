import React from 'react';
import GBookList from './GBookList';
import '../utilities/styleH2.css';

const GBooks = ({ books, setBookToSell, titleCheck, setMessage }) => {
    console.log(books);
    return (
        <div className="container">
            <div className="section">
                <h2>Reading Time</h2>
                <div className="row">
                    <GBookList books={books} setBookToSell={setBookToSell} titleCheck={titleCheck} setMessage={setMessage}/>
                </div>
            </div>
        </div >
    )
}

export default GBooks