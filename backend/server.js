import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.js";
import authRoute from "./routes/auth.js";

const app = express();
const PORT = 8080;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api", chatRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    } catch (err) {
        console.log("Failed to connect with DB", err);
    }
};

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
    connectDB();
});