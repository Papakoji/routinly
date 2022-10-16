const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("../backend/routes/authRoutes");
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/errorHandler");
const routeNotFound = require("./middleware/routeNotFound");

const app = express();

app.set("view engine", "ejs");

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/routine", routineRoutes);
app.use(routeNotFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
const connection = async () => {
  await mongoose.connect(process.env.MONGO_LOCAL_URL);
  app.listen(PORT, ()=>{
    console.log(`Server is running in port ${PORT} and is connected to the database`);
  })
}
connection();