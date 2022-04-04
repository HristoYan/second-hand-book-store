import React from 'react';
import './CommentCards.css';

const BookCards = ({ comment }) => {
    console.log(`Comment in Card: >>> ${comment}`);
    return (
        <>
            <div className='comment-container'>
                <div className='comment-author'>
                    From: <strong>{comment.creator}</strong>
                </div>
                <div className='comment-content'>
                    Content: {comment.content}
                </div>
            </div>
        </>
    )
}

export default BookCards