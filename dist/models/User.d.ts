import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'monitor' | 'student';
    approved: boolean;
    createdAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map