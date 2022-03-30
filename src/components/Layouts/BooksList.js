import BookCards from "./BookCards";

const BookList = ({ books, onDeleteBook, onEditBook, setFavorite }) => {

    return (
        <div className="BookList-items">
            {
                books?.map(book => (<BookCards  book={book} key={book.id} onDeleteBook={onDeleteBook} onEditBook={onEditBook} setFavorite={setFavorite}/>))
            }
        </div>
    );
}

export default BookList;