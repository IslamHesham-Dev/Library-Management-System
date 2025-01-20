import { Request, Response } from 'express';
import AuthController from '../src/controllers/AuthController'
import { register } from '../src/services/UserService';

jest.mock('../src/services/UserService', () => ({
    register: jest.fn(),
}));

describe('AuthController - handleRegister', () => {
    const mockRequest = (body: any) => ({
        body,
    }) as Request;

    const mockResponse = () => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('should return 201 and user data on successful registration', async () => {
        const req = mockRequest({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        const res = mockResponse();

        // Mock the register service
        (register as jest.Mock).mockResolvedValue({
            _id: '12345',
            type: 'USER',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
        });

        await AuthController.handleRegister(req, res);

        expect(register).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User successfully created',
            user: {
                _id: '12345',
                type: 'USER',
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
            },
        });
    });

    it('should return 409 if user already exists', async () => {
        const req = mockRequest({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        const res = mockResponse();

        (register as jest.Mock).mockRejectedValue(new Error('E11000 duplicate key error collection:'));

        await AuthController.handleRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User with email already exists',
            error: 'E11000 duplicate key error collection:',
        });
    });

    it('should return 500 for unexpected errors', async () => {
        const req = mockRequest({
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        const res = mockResponse();

        (register as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

        await AuthController.handleRegister(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unable to register user at this time',
            error: 'Unexpected error',
        });
    });
});
