import mongoose, { Schema } from 'mongoose';
;
export const LoanRecordSchema = new Schema({
    status: { type: String, required: true },
    loanedDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    returnedDate: { type: Date, required: false },
    patron: { type: Schema.Types.ObjectId, required: true },
    employeeOut: { type: Schema.Types.ObjectId, required: true },
    employeeIn: { type: Schema.Types.ObjectId, required: false },
    item: { type: Schema.Types.ObjectId, required: true, ref: 'Book' }
}, {
    timestamps: true
});
export default mongoose.model('LoanRecord', LoanRecordSchema);
