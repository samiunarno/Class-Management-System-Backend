/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ON `);
    }
    catch (error) {
        console.error('connecting to MongoDB: OFF', error);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map