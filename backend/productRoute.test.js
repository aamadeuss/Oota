const request = require('supertest');
const Item = require('./models/Orders');
const app = require('./index');
const data = require('./db');
let server;

orderPort = 5001;

beforeAll( async () => {
    server = app.listen(orderPort, () => {
        console.log(`Review test server listening on port ${orderPort}`);
    });
});

afterAll( async () => {
    if(server){
        await new Promise((resolve) => server.close(resolve));
    }
});

describe('Review routes', () => {
    
    it('should get all items', async () => {
        const response = await request(server)
          .post('/api/auth/foodData')
          .send();
    
        expect(response.status).toBe(200);
        expect(response.body[0]).toBeDefined();
        expect(response.body[1]).toBeDefined();
    });

    it('should store first review from new user', async () => {
        const email = 'a@ba.com';
        const orderData = [{ product: 'Product 1', quantity: 2 }, { product: 'Product 2', quantity: 1 }];
        const orderDate = new Date();
        const response = await request(server)
        .post('/api/auth/orderData')
        .send({email, order_data: orderData, order_date: orderDate});
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should store review from existing user', async () => {
        const email = 'a@a.com';
        const orderData = [{ product: 'Product 1', quantity: 2 }, { product: 'Product 2', quantity: 1 }];
        const orderDate = new Date();
        const response = await request(server)
        .post('/api/auth/orderData')
        .send({email, order_data: orderData, order_date: orderDate});
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should get reviews from email', async () => {
        const email = 'a@a.com';
        const response = await request(server)
        .post('/api/auth/myOrderData')
        .send({email});
        expect(response.status).toBe(200);
        expect(response.body.orderData).toBeDefined();
    });
});