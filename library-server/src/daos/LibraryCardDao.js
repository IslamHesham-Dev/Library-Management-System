import mongoose, { Schema } from 'mongoose';
const LibraryCardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, unique: true, ref: "User" }
});
export default mongoose.model('LibraryCard', LibraryCardSchema);
