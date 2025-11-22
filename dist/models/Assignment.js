import mongoose, { Schema } from 'mongoose';
const assignmentSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default mongoose.model('Assignment', assignmentSchema);
//# sourceMappingURL=Assignment.js.map