
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import './GBookCards.css';

const GBookCards = ({ book, setBookToSell }) => {
    const {user} = useUser();
    const navigate = useNavigate();

    const theBook = {
        imgUrl: book.volumeInfo.imageLinks.thumbnail,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        year: book.volumeInfo.publishedDate,
        categories:book.volumeInfo.categories,
        description:book.volumeInfo.description

    }

    function sellThisBook() {
        console.log(theBook);
        setBookToSell(theBook);
        navigate('/sell-gbook');
    }

    return (
        <div className="card col s12 m4" style={{ height: "540px", width: "370px", margin: "10px"}}>
            <div className="card-image waves-effect waves-block waves-light">
                <img id="gbook" className="GBook-image activator responsive-img" src={book.volumeInfo.imageLinks.thumbnail} alt="Book Picture" />
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{book.volumeInfo.title}<i className="material-icons right">more_vert</i></span>
                <p>Authors: {book.volumeInfo.authors.join(', ')}</p>
            </div>
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{book.volumeInfo.title}<i className="material-icons right">close</i></span>
                <p>Published on: {book.volumeInfo.publishedDate}</p>
                <div>
                        {book.volumeInfo.description}
                </div>
            </div>
            <div>
                {user.role==='Seller' && <button className='navButon' onClick={sellThisBook}>Sell This Book</button>}
                {/* {user && <button className='navButon' onClick={() => onAddingFavorite(recipe)}>Favorite</button>}
        {(userId === recipe.authorId || user?.role === "Admin") && <div>
            <button className='navButon' onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            <button className='navButon' onClick={() => onRecipeEdit(recipe)}>Edit</button>
        </div>
        } */}
            </div>
        </div >
    )
}

export default GBookCards