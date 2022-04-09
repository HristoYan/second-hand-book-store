
const BOOKS_API_BASE_URL = 'http://127.0.0.1:5000/api';

class BooksApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }

    async fetchBooksFromGoogleApi(tags) {
        if(tags.split(',')){
            tags.split(',').map(tag=>tag.trim()).join('+');
        }
        console.log(tags);
        return this.handleResponse(async () => fetch(`https://www.googleapis.com/books/v1/volumes?q=${tags}`));
    }

    async fetchBooksForSell() {
        console.log(`fetchBooksForSell`);
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books`));
    }

    async fetchBookById(bookId) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${bookId}`));
    }

    async postNewBook(book) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(book)
        }));
    }

    
    async putUpdateBook(book) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${book.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify(book)
        }));
    }
    
    async deleteBook(bookId) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${bookId}`, {
            method: 'DELETE',
        }));
    }

    async handleResponse(asyncRequestFunc) {
        try {
            const resp = await asyncRequestFunc();
            const content = await resp.json();

            if (resp.status < 400) {
                return content;
            } else {

                return Promise.reject(`Error performing HTTP request: ${resp.status}: ${JSON.stringify(resp)}`);
            }
        } catch (err) {

            return Promise.reject(`Error performing HTTP request: ${err}`);
        }
    }
}

export default new BooksApiClient(BOOKS_API_BASE_URL);



