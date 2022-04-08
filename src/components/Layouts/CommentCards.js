import React from 'react';
import './CommentCards.css';

const BookCards = ({ comment }) => {
    console.log(`Comment in Card: >>> ${comment}`);
    return (
        <>
            <div className='comment-container'>
                <div className='comment-author grey-text text-white-4'>
                    <strong>{comment.creator}:</strong>
                </div>
                <div className='comment-content grey-text text-white-4'>
                    {comment.content}
                </div>
            </div>
        </>
    )
}

export default BookCards