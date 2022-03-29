import GBookCards from "./GBookCards";

const GBookList = ({ books, setBookToSell }) => {
    return (
        <div className="BookList-items">
            {
                books.map(book => (<GBookCards  book={book} key={book.id} setBookToSell={setBookToSell}/>))
            }
        </div>
    );
}

export default GBookList;