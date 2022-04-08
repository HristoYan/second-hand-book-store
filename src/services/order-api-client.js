
const BOOKS_API_BASE_URL = 'http://127.0.0.1:5000/api';

class OrdersApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }

  
    async fetchBookById(bookId) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/books/${bookId}`));
    }

    async postNewOrder(userId, orderId, books, total) {
        return this.handleResponse(async () => fetch(`${BOOKS_API_BASE_URL}/orders`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({userId, orderId, books, total})
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

export default new OrdersApiClient(BOOKS_API_BASE_URL);



