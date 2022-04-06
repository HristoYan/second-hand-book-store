import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import booksApiClient from '../../services/books-api-client';

export const CommentForm = ({book, comment, setComment}) => {
    const {user} = useUser();
    const[oldBook, setOldBook] = useState();
    const navigate = useNavigate();
    const username = user.username;

    useEffect(async() => {
      const oldOne = await booksApiClient.fetchBookById(book.id);
      console.log(`Old Book Info: >>>${oldOne}`);
      setOldBook(oldOne);
    
    }, [comment])
    

    async function commentSubmit() {
        console.log(`Comment content: >>>${comment}`);
        console.log(`Book: >>>${JSON.stringify(book)}`);
        const commentInfo = {
            creator: username,
            content: comment
        }
        const bookCopy = JSON.parse(JSON.stringify(book));
        bookCopy.comments.push(commentInfo);
        console.log(JSON.parse(JSON.stringify(bookCopy)));
        await booksApiClient.putUpdateBook(bookCopy);
        document.getElementById('comment').textContent = '';
        navigate('/book');
    }

    return (
        <div className='comment-area'>
            <div className="row">
                <div className="input-field col s12">
                    <textarea id="comment" name='comment' className="materialize-textarea" 
                    placeholder='Comment' 
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
            </div>
            <div className="row center"> 
            <button className="btn waves-effect waves-light" type="button" onClick={commentSubmit}>Submit
                <i className="material-icons right">send</i>
            </button>
            </div>
        </div>
    )
}
