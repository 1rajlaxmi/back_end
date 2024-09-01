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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chitchatraj.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cors({
  origin: 'https://chitchatraj.vercel.app', // Replace with your frontend's origin
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
// server.listen(PORT, () => {
//   connectMongodb();
//   console.log(`Server Running on port ${PORT}`);
// });
server.listen(PORT, async () => {
  try {
    await connectMongodb(); // Wait for the MongoDB connection to be successful
    console.log(`MongoDB connected successfully`);
    console.log(`Server Running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if MongoDB fails to connect
  }
});

