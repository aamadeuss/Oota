const request = require('supertest');
const Item = require('./models/Orders');
const app = require('./index');
const data = require('./db');
let server;

orderPort = 5000;

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

    
});