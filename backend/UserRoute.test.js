const request = require('supertest');

const route = require('./Routes/Auth');
const app = require('./index');
const data = require('./db');

let server;
app.use('/api/users', route);
userPort = 5000;

beforeAll( async () => {
    server = app.listen(userPort, () => {
        console.log(`User server listening on port ${userPort}`);
    });
});

afterEach(async () => {
    if(server){
        await new Promise((resolve) => server.close(resolve));
    }
})

it('should register a new user', async () => {
    const email = generateRandomEmail(); // Generate a random email address
    const response = await request(app) // Use the server instance instead of app
      .post('/api/users/createuser')
      .send({
        name: 'John Doe',
        email,
        password: 'password123',
        location: '1234 Main St, San Francisco, CA 94123',
      });
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
});

  // Helper function to generate a random email address
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}

it('should not register a new user with an existing email address', async () => {
    const response = await request(app)
      .post('/api/users/createuser')
      .send({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password456',
        location: '1234 Main St, San Francisco, CA 94123',
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('User already exists');
});

// Test login route
it('should log in a user with valid credentials', async () => {
    const response = await request(app) // Use the server instance instead of app
      .post('/api/users/login')
      .send({
        email: 'a@a.com',
        password: '1234567890',
      });
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
  
  it('should return an error with invalid credentials', async () => {
    const response = await request(app) // Use the server instance instead of app
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });
  
    expect(response.status).toBe(400);
    // expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Try logging in with correct credentials');
  });
  
  // Add more test cases for other routes as needed


afterAll( async () => {
    if(server){
        await new Promise((resolve) => server.close(resolve));
    }
});