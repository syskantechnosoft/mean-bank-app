const request = require('supertest');
const express = require('express');
const cors = require('cors');
const authRoutes = require('../../src/routes/authRoutes');
const accountRoutes = require('../../src/routes/accountRoutes');
const userRoutes = require('../../src/routes/userRoutes');
const User = require('../../src/models/User');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);

describe('Banking App Integration Tests', () => {
    let token;
    let userId;

    test('POST /api/auth/register - Should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                phone: '1234567890',
                address: '123 Test St'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });

    test('POST /api/auth/login - Should login user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        // Store for subsequent calls
        token = res.body.token;
    });

    test('POST /api/accounts - Should create a new account', async () => {
        const res = await request(app)
            .post('/api/accounts')
            .set('x-auth-token', token)
            .send({ accountType: 'Savings' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('accountNumber');
        expect(res.body.accountType).toBe('Savings');
    });

    test('GET /api/users/profile - Should get user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('x-auth-token', token);

        expect(res.statusCode).toBe(200);
        expect(res.body.email).toBe('test@example.com');
    });
});
