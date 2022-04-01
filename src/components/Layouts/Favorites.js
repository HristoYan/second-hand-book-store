import React, { useEffect, useState } from 'react';
import BookList from './BooksList';
import '../utilities/styleH2.css';
import { useUser } from '../../hooks/useUser';
import UserApi from '../../services/user-api-client';
import Loader from '../utilities/Loader';

const Favorites = ({ users, books, favorite, onDeleteBook, setCart }) => {
    console.log(books);
    const { user } = useUser();
    let [favBooksId, setFavBooksId] = useState();

    const oldUserInfo = users.filter(u => u.id === user.id);
    console.log(oldUserInfo[0]);
    const userInfo = oldUserInfo[0];

    let booksId = books.map(el => el.id);
    console.log(booksId);

    useEffect(async () => {
        let filtered;
        if (userInfo.favorite) {
            filtered = (userInfo.favorite).filter(e => booksId.includes(e));
            if (!(filtered.includes(favorite))) {
                console.log(`book pushed in array!`);
                filtered.push(favorite);
            }
        } else {
            console.log(`book created!`);

            filtered.push(favorite);
        }

        // if(!filtered) {
        //     console.log(`book created!`);

        //     filtered.push(favorite);
        // } else {
        //     console.log(`book already exist!`);
        //     return filtered;
        // }

        console.log(filtered);
        const userObj = {
            ...user,
            favorite: filtered
        };
        const updatedUser = await UserApi.putUpdateUser(userObj);
        console.log(updatedUser.favorite);
        setFavBooksId(updatedUser.favorite);
    }, []);

    if (!favBooksId) {
        return <Loader />;
    }

    console.log(favBooksId);

    let resultedBooks = [];

    for (const favId of favBooksId) {
        const temp = books.filter(book => book.id === favId);
        resultedBooks.push(temp)
    }

    console.log(resultedBooks);
    let favBooks = [];
    for (let i = 0; i < resultedBooks.length; i++) {
        favBooks.push(resultedBooks[i][0])

    }

    console.log(favBooks);

    return (
        <>
            {!!(favBooks) ? <div className="container">
                <div className="section">
                    <h2>Your Favorite Books</h2>
                    <div className="row">
                        <BookList books={favBooks} onDeleteBook={onDeleteBook} setCart={setCart} />
                    </div>
                </div>
            </div > : <h2>No Favorites yet!</h2>}
        </>
    )
}

export default Favorites;