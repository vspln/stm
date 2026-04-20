require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server (always last)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
