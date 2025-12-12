const authController = require('../../src/controllers/authController');
const User = require('../../src/models/User');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock User Model
jest.mock('../../src/models/User');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Controller Unit Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    test('register should return 400 if user exists', async () => {
        req.body = { email: 'existing@example.com', password: 'password' };
        User.findOne.mockReturnValue(Promise.resolve({ email: 'existing@example.com' }));

        await authController.register(req, res);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toEqual({ msg: 'User already exists' });
    });

    test('register should create user and return token', async () => {
        req.body = {
            name: 'New User',
            email: 'new@example.com',
            password: 'password',
            phone: '123',
            address: 'here'
        };

        User.findOne.mockReturnValue(Promise.resolve(null));
        User.prototype.save = jest.fn().mockReturnValue(Promise.resolve());
        bcrypt.genSalt.mockReturnValue('salt');
        bcrypt.hash.mockReturnValue('hashedPassword');
        jwt.sign.mockImplementation((payload, secret, options, callback) => callback(null, 'token'));

        await authController.register(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toHaveProperty('token');
    });
});
