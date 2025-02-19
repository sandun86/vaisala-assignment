import cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import fileRoutes from "./routes/file.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors({
    origin: "*", // Allow requests from frontend, in production, needed to be configure this with front end url
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary methods
    allowedHeaders: ["Content-Type", "x-api-key", "uuid"], // Allow custom headers
    credentials: true, // Allow cookies if needed
}));

// Handle preflight OPTIONS requests
app.options("*", cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/v1/file", fileRoutes);

// Health check route
app.get("/api/", (req, res) => {
    res.send("API is running!");
});

// Error handler
app.use(errorHandler);

export default app;
