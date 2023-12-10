const request = require('supertest');
const Order = require('./models/Orders');
const app = require('./index');
const data = require('./db');
let server;

orderPort = 5000;

beforeAll( async () => {
    server = app.listen(orderPort, () => {
        console.log(`Order test server listening on port ${orderPort}`);
    });
});

afterEach(async () => {
    if(server){
        await new Promise((resolve) => server.close(resolve));
    }
})

afterAll( async () => {
    if(server){
        await new Promise((resolve) => server.close(resolve));
    }
});

describe('Order routes', () => {
    it('should get all orders', async () => {
        const response = await request(app)
          .post('/api/users/foodData')
          .send();
    
        expect(response.status).toBe(200);
        expect(response.body[0]).toBeDefined();
        expect(response.body[1]).toBeDefined();
    });
});