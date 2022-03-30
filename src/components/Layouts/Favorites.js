import React, { useEffect, useState } from 'react';
import BookList from './BooksList';
import '../utilities/styleH2.css';
import { useUser } from '../../hooks/useUser';
import UserApi from '../../services/user-api-client';

const Favorites = ({ users, books, favorite, onDeleteBook }) => {
    console.log(books);
    const { user } = useUser();
    let [favBooksId, setFavBooksId] = useState();

    const oldUserInfo = users.filter(u => u.id === user.id);
    console.log(oldUserInfo[0]);
    const userInfo = oldUserInfo[0];

    
    useEffect(async () => {
        let favArr = userInfo.favorite;
        favArr.push(favorite);
        console.log(favArr);
        const userObj = {
            ...user,
            favorite: favArr
        }
        const updatedUser = await UserApi.putUpdateUser(userObj);
        console.log(updatedUser.favorite);
        setFavBooksId(updatedUser.favorite);
    }, []);
    
    console.log(favBooksId);
    let resultedBooks=[];
    if (Array.isArray(favBooksId)) {
        for (const favId of favBooksId) {
            const temp = books.filter(book => book.id === favId);
            resultedBooks.push(temp)
        }
    }
    console.log(resultedBooks);
    let favBooks=[];
    for (let i = 0; i < resultedBooks.length; i++) {
        favBooks.push(resultedBooks[i][0])
        
    }
    console.log(favBooks);
    return (
        <div className="container">
            <div className="section">
                <h2>Reading Time</h2>
                <div className="row">
                    <BookList books={favBooks} onDeleteBook={onDeleteBook} />
                </div>
            </div>
        </div >
    )
}

export default Favorites