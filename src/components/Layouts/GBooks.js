import React from 'react'
import GBookList from './GBookList'

const GBooks = ({ books }) => {
    console.log(books);
    return (
        <div className="container">
            <div className="section">
                <h2 style={{ color: "#2196F3", margin: "50px" }}>Reading Time</h2>
                <div className="row">
                    <GBookList books={books} />
                </div>
            </div>
        </div >
    )
}

export default GBooks