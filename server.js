const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// // Enable custom DNS
// console.log("Custom DNS enabled:", process.env.USE_PUBLIC_DNS);

// if (process.env.USE_PUBLIC_DNS === "true") {
//     dns.setServers(["8.8.8.8", "1.1.1.1"]);
// }

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
    origin:[ "http://localhost:5173","https://auth-frontend1-zeta.vercel.app"]
}));

app.use(express.json());

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log("MONGO_URL exists:", !!process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 15000
        });

        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed");
        console.error("Error:", error);
        process.exit(1);
    }
}

startServer();