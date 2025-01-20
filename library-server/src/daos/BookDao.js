import mongoose, { Schema } from 'mongoose';
import { LoanRecordSchema } from './LoanRecordDao';
;
const BookSchema = new Schema({
    barcode: { type: String, required: true, unique: true },
    cover: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    authors: { type: [String], required: true },
    description: { type: String, required: true },
    subjects: { type: [String], required: true },
    publicationDate: { type: Date, required: true },
    publisher: { type: String, required: true },
    pages: { type: Number, required: true },
    genre: { type: String, required: true },
    records: [LoanRecordSchema]
});
export default mongoose.model('Book', BookSchema);
