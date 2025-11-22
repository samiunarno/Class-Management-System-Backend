import mongoose, { Schema, Document } from "mongoose";
export interface ISubmission extends Document {
    assignmentId: Schema.Types.ObjectId;
    studentId: Schema.Types.ObjectId;
    filename: string;
    emailMessageId?: string;
    dropboxLink?: string;
    dropboxDirectLink?: string;
    uploadedAt: Date;
}
declare const _default: mongoose.Model<ISubmission, {}, {}, {}, mongoose.Document<unknown, {}, ISubmission, {}, {}> & ISubmission & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Submission.d.ts.map