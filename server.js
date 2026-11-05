const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log("MONGO_URL exists:", !!process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed");
        console.error("Error:", error.message);
        console.error("Code:", error.code);
        process.exit(1);
    }
}
startServer();