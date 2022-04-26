const express = require("express");
const app = express();
const updateCron = require("./updateCron");
// const dotenv = require("dotenv");
const cors = require("cors");
// dotenv.config();
app.use(cors());
// Import routes
const animalRoutes = require("./routes/animals");
// Middlewares
app.use(express.json());
app.use(updateCron);
// Route middlewares
app.use("/api/", animalRoutes);
app.listen(3002, () => console.log("Server is up and running"));
