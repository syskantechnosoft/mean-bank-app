const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // Disconnect if already connected (e.g. by server.js initialization side-effect if any)
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    process.env.JWT_SECRET = 'testsecret';
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// afterEach block removed to persist state for dependent tests provided in integration/api.test.js
