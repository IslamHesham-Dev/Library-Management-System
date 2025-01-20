import { Request, Response } from 'express';
import AuthController from '../src/controllers/AuthController';
import { login } from '../src/services/UserService';
import { InvalidUsernameOrPasswordError } from '../src/utils/LibraryErrors';

jest.mock('../src/services/UserService', () => ({
    login: jest.fn(),
}));

describe('AuthController - handleLogin', () => {
    const mockRequest = (body: any) => ({
        body,
    }) as Request;

    const mockResponse = () => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('should return 200 and user data on successful login', async () => {
        const req = mockRequest({
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        const res = mockResponse();

        // Mock the login service
        (login as jest.Mock).mockResolvedValue({
            _id: '12345',
            type: 'USER',
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
        });

        await AuthController.handleLogin(req, res);

        expect(login).toHaveBeenCalledWith({
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'User logged in successfully',
            user: {
                _id: '12345',
                type: 'USER',
                firstName: 'John',
                lastName: 'Doe',
                email: 'johndoe@example.com',
            },
        });
    });

    it('should return 401 for invalid credentials', async () => {
        const req = mockRequest({
            email: 'johndoe@example.com',
            password: 'wrongpassword',
        });

        const res = mockResponse();

        (login as jest.Mock).mockRejectedValue(new InvalidUsernameOrPasswordError('Invalid username or password'));

        await AuthController.handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unable to login user at this time',
            error: 'Invalid username or password',
        });
    });

    it('should return 500 for unexpected errors', async () => {
        const req = mockRequest({
            email: 'johndoe@example.com',
            password: 'securepassword',
        });

        const res = mockResponse();

        (login as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

        await AuthController.handleLogin(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unable to login user at this time',
            error: 'Unexpected error',
        });
    });
});
