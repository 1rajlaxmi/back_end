import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"; // Import the cors package
import path from "path"
import { fileURLToPath } from 'url';
import authRoutes from "./Routes/authRoutes.js"
import msgRoutes from "./Routes/msgRoutes.js"
import userRoutes from "./Routes/user_routes.js";
import { app,server } from "./socket/socket.js";


import connectMongodb from "./db/connect_db.js";

dotenv.config(); // Load environment variables before anything else

const PORT = process.env.PORT || 5000

// Set up CORS
// app.use(cors({
//   origin: 'https://chitchatraj.vercel.app', // Replace with your frontend's origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
//   credentials: true // If you want to allow cookies or authorization headers
// }));

// app.options('*', cors()); // Handle preflight requests

// Body parser and cookie parser
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other routes by sending the index.html file

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes)
app.use("/api/msg", msgRoutes)
app.use("/api/users", userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Start server
server.listen(PORT, () => {
  connectMongodb();
  console.log(`Server Running on port ${PORT}`);
});
