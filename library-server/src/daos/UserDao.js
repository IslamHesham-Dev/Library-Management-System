import mongoose, { Schema } from 'mongoose';
;
const UserSchema = new Schema({
    type: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    versionKey: false
});
export default mongoose.model('User', UserSchema);
