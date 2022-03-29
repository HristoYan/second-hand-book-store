import BookCards from "./BookCards";

const BookList = ({ books, onDeleteBook, onEditBook }) => {

    return (
        <div className="BookList-items">
            {
                books.map(book => (<BookCards  book={book} key={book.id} onDeleteBook={onDeleteBook} onEditBook={onEditBook}/>))
            }
        </div>
    );
}

export default BookList;