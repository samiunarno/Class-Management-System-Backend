import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
const app = express();
// Connect to MongoDB
connectDB();
// Security middleware
app.use(helmet());
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'http://localhost:5174',
//     'http://localhost:3000'
//   ],
//   credentials: true
// }));
const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("*", cors(corsConfig));
app.use(cors(corsConfig));
// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);
// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// Add this route BEFORE your main routes
app.get('/api/debug/cloudinary', (req, res) => {
    const config = {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'Missing'
    };
    console.log('🔍 Cloudinary Config Check:', config);
    res.json({
        status: 'Debug Route',
        cloudinary: config,
        node_env: process.env.NODE_ENV
    });
});
// Health check route
app.get("/api", (req, res) => {
    res.json({
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);
// Error handling middleware
app.use(errorHandler);
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "You are On Route Try api/health" });
});
export default app;
//# sourceMappingURL=app.js.map