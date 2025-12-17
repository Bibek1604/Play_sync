import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Log DB status
    const state = mongoose.connection.readyState;
    let dbStatus = "unknown";
    if (state === 1) dbStatus = "connected";
    else if (state === 2) dbStatus = "connecting";
    else if (state === 0) dbStatus = "disconnected";
    else if (state === 3) dbStatus = "disconnecting";

    console.log(`✅ Database status: ${dbStatus}`);

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
