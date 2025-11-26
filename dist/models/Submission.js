// src/models/Submission.ts
import mongoose, { Schema } from "mongoose";
const submissionSchema = new Schema({
    assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
    },
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    emailMessageId: { type: String },
    // 🔥 NEW — Replaced DropBox
    cloudinaryUrl: { type: String },
    cloudinaryPublicId: { type: String },
    uploadedAt: { type: Date, default: Date.now },
});
export default mongoose.model("Submission", submissionSchema);
//# sourceMappingURL=Submission.js.map