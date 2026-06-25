const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const transcriptRoutes = require("./routes/transcriptRoutes");
const reportRoutes = require("./routes/reportRoutes");
const workflowRoutes = require("./routes/workflowRoutes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use( "/api/enrollments", enrollmentRoutes);
app.use( "/api/grades", gradeRoutes );
app.use( "/api/transcripts", transcriptRoutes );
app.use( "/api/reports", reportRoutes );
app.use( "/api/workflow", workflowRoutes );


app.get("/", (req, res) => {
    res.send("University Management System API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

