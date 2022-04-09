
const ORDERS_API_BASE_URL = 'http://127.0.0.1:5000/api';

class OrdersApiClient {
    constructor(baserApiUrl) {
        this.baserApiUrl = baserApiUrl;
    }


    async fetchOrderById(orderId) {
        return this.handleResponse(async () => fetch(`${ORDERS_API_BASE_URL}/orders/books/${orderId}`));
    }

    async fetchOrderByUserId(userId) {
        return this.handleResponse(async () => fetch(`${ORDERS_API_BASE_URL}/orders/${userId}`));
    }

    async postNewOrder(userId, orderId, books, total) {
        return this.handleResponse(async () => fetch(`${ORDERS_API_BASE_URL}/orders`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ userId, orderId, books, total })
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

export default new OrdersApiClient(ORDERS_API_BASE_URL);



