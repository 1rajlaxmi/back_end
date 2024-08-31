import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"; // Import the cors package

import authRoutes from "./Routes/authRoutes.js"
import msgRoutes from "./Routes/msgRoutes.js"
import userRoutes from "./Routes/user_routes.js";
import { app,server } from "./socket/socket.js";

import connectMongodb from "./db/connect_db.js";

dotenv.config(); // Load environment variables before anything else

const PORT = process.env.PORT || 5000

// Set up CORS
app.use(cors({
  origin: 'https://backend-git-main-rajlaxmis-projects.vercel.app', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  credentials: true // If you want to allow cookies or authorization headers
}));

app.options('*', cors()); // Handle preflight requests

// Body parser and cookie parser
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/msg", msgRoutes)
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Everything is fine");
})

// Start server
server.listen(PORT, () => {
  connectMongodb();
  console.log(`Server Running on port ${PORT}`);
});
