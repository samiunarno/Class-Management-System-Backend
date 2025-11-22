import mongoose, { Document } from 'mongoose';
export interface IAssignment extends Document {
    title: string;
    description: string;
    deadline: Date;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAssignment, {}, {}, {}, mongoose.Document<unknown, {}, IAssignment, {}, {}> & IAssignment & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Assignment.d.ts.map