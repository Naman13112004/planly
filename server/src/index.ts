import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";

import requirementRoutes from "./routes/requirementRoutes.js";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("DB Connected Successfully...");
} catch (error) {
    console.error("Mongoose connection issue: " + error);
}

// Health check
app.get("/", (req, res) => {
    res.json("API is running...");
})

// Mount the route
app.use("/api/requirements", requirementRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})