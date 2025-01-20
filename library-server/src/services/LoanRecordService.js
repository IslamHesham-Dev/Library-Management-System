var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import LoanRecordDao from '../daos/LoanRecordDao';
import { findBookById, modifyBook } from './BookService';
import { LoanRecordDoesNotExistError } from '../utils/LibraryErrors';
export function generateRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let createdRecord = new LoanRecordDao(record);
            createdRecord = yield createdRecord.save();
            let book = yield findBookById(record.item);
            let records = book.records;
            records = [createdRecord, ...records];
            book.records = records;
            yield modifyBook(book);
            return createdRecord;
        }
        catch (error) {
            throw error;
        }
    });
}
export function modifyRecord(record) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedRecord = yield LoanRecordDao.findOneAndUpdate({ _id: record._id }, record, { new: true });
            if (updatedRecord) {
                let book = yield findBookById(record.item);
                let records = book.records;
                records[0] = updatedRecord;
                book.records = records;
                yield modifyBook(book);
                return updatedRecord;
            }
            throw new LoanRecordDoesNotExistError("The record does not exist");
        }
        catch (error) {
            throw error;
        }
    });
}
export function findAllRecords() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao.find();
        }
        catch (error) {
            throw error;
        }
    });
}
export function queryRecords(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield LoanRecordDao.find({ [params.property]: params.value }).populate("item").sort("-loanedDate");
        }
        catch (error) {
            throw error;
        }
    });
}
