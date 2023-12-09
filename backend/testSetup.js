const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// Set up a MongoDB memory server
beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear/reset the database before each test
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

// Disconnect and stop the MongoDB memory server
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});