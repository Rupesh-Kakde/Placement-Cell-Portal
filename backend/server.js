

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const companyRoutes = require("./routes/companyRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors({
    origin: "https://placement-cell-portal-ten.vercel.app",
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Placement Cell Portal Backend Running");
});

// Routes

app.use("/api/students", studentRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
});