const express = require("express");
const mongoose = require("mongoose");
const mainIndex = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

//temporary workaround until this project is continued in a future sprint
app.use((req, res, next) => {
  req.user = {
    _id: "6882cd1b7da154aa9060e506",
  };
  next();
});

app.use("/", mainIndex);

app.listen(PORT, () => {
  console.log(`on port ${PORT}`);
});
