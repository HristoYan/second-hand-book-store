import React from 'react';
import '../utilities/styleH2.css';
import CommentList from './CommentList';

const Comments = ({book}) => {
    
    return (
        <div className="container">
            <div className="section">
                <h2>Comment Section</h2>
                <div className="row">
                    <CommentList  comments={book.comments} />
                </div>
            </div>
        </div >
    )
}

export default Comments