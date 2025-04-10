var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BookDao from '../daos/BookDao';
import { BookDoesNotExistError } from '../utils/LibraryErrors';
export function findAllBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield BookDao.find();
    });
}
export function findBookById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let book = yield BookDao.findById(id);
            if (book)
                return book;
            throw new BookDoesNotExistError("The specified book does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
export function modifyBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield BookDao.findOneAndUpdate({ barcode: book.barcode }, book, { new: true });
            if (id)
                return book;
            throw new BookDoesNotExistError("The book you are trying to modify does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
export function registerBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const savedBook = new BookDao(book);
        return yield savedBook.save();
    });
}
export function removeBook(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = yield BookDao.findOneAndDelete({ barcode });
            if (id)
                return "Successfully deleted book";
            throw new BookDoesNotExistError("The book you are trying to delete does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
export function queryBooks(page, limit, title, barcode, description, author, subject, genre) {
    return __awaiter(this, void 0, void 0, function* () {
        let books = yield BookDao.find();
        let filteredBooks = [];
        books.forEach((book) => {
            if (barcode) {
                if (book.barcode.toLowerCase().includes(barcode.toLowerCase()) &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (title) {
                if (book.title.toLowerCase().includes(title.toLowerCase()) &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (description) {
                if (book.description.toLowerCase().includes(description.toLowerCase()) &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (author) {
                if (book.authors.some((a) => a.toLowerCase().includes(author.toLowerCase())) &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (subject) {
                if (book.subjects.some((s) => s.toLowerCase().includes(subject.toLowerCase())) &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
            if (genre) {
                if (book.genre.toLowerCase() === genre.toLowerCase() &&
                    !filteredBooks.some((b) => b['barcode'] === book.barcode)) {
                    filteredBooks.push(book);
                }
            }
        });
        return paginateBooks(filteredBooks, page, limit);
    });
}
export function paginateBooks(books, page, limit) {
    let pageBooks = [];
    const pages = Math.ceil(books.length / Number(limit));
    if (Number(page) === pages) {
        const startPoint = (Number(page) - 1) * Number(limit);
        pageBooks = books.slice(startPoint);
    }
    else {
        const startPoint = (Number(page) - 1) * Number(limit);
        const endPoint = startPoint + Number(limit);
        pageBooks = books.slice(startPoint, endPoint);
    }
    const pageObject = {
        totalCount: books.length,
        currentPage: Number(page),
        totalPages: pages,
        limit: Number(limit),
        pageCount: pageBooks.length,
        items: pageBooks
    };
    return pageObject;
}
