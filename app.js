require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainIndex = require("./routes/index");
const errorHandler = require("./middlewares/errorhandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const winston = require("winston");
const expressWinston = require("express-winston");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(requestLogger);
app.use(express.json());

app.use("/", mainIndex);

app.use(errorLogger);
// celebrate error handler
app.use(errors());

// centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
