// src/models/Submission.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  assignmentId: Schema.Types.ObjectId;
  studentId: Schema.Types.ObjectId;
  filename: string;
  emailMessageId?: string;

  // 🔥 NEW (Cloudinary fields)
  cloudinaryUrl?: string;
  cloudinaryPublicId?: string;

  uploadedAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
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

export default mongoose.model<ISubmission>("Submission", submissionSchema);
