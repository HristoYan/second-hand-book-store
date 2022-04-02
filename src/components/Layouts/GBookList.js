import GBookCards from "./GBookCards";

const GBookList = ({ books, setBookToSell, setTitle, setMessage }) => {
    return (
        <div className="BookList-items">
            {
                books.map(book => (<GBookCards  book={book} key={book.id} setBookToSell={setBookToSell} setTitle={setTitle} setMessage={setMessage}/>))
            }
        </div>
    );
}

export default GBookList;