import { Request, Response } from 'express';
import BookController from '../src/controllers/BookController';
import { findAllBooks } from '../src/services/BookService';

jest.mock('../src/services/BookService', () => ({
    findAllBooks: jest.fn(),
}));

describe('BookController - getAllBooks', () => {
    const mockRequest = () => ({} as Request);

    const mockResponse = () => {
        const res = {} as Response;
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    it('should return 200 and a list of books on success', async () => {
        const req = mockRequest();
        const res = mockResponse();

        // Mock the findAllBooks service
        (findAllBooks as jest.Mock).mockResolvedValue([
            {
                barcode: '12345',
                title: 'Book One',
                authors: ['Author One'],
                genre: 'Fiction',
            },
            {
                barcode: '67890',
                title: 'Book Two',
                authors: ['Author Two'],
                genre: 'Non-Fiction',
            },
        ]);

        await BookController.getAllBooks(req, res);

        expect(findAllBooks).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Retrieved all books',
            count: 2,
            books: [
                {
                    barcode: '12345',
                    title: 'Book One',
                    authors: ['Author One'],
                    genre: 'Fiction',
                },
                {
                    barcode: '67890',
                    title: 'Book Two',
                    authors: ['Author Two'],
                    genre: 'Non-Fiction',
                },
            ],
        });
    });

    it('should return 500 if an error occurs', async () => {
        const req = mockRequest();
        const res = mockResponse();

        // Mock an error being thrown by findAllBooks
        (findAllBooks as jest.Mock).mockRejectedValue(new Error('Database error'));

        await BookController.getAllBooks(req, res);

        expect(findAllBooks).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unable to retrieve books at this time',
            error: new Error('Database error'),
        });
    });
});
