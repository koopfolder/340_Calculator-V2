const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("config");

const historyRouter = require("./Routes/historyCal");
const dbConfig = config.get("HistoryCal.dbConfig.dbName");

mongoose
  .connect(dbConfig)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database not Connected" + err);
  });

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use(morgan("dev"));

app.use(express.json());

app.use("/history", historyRouter);

app.use((req, res, next) => {
  const err = new Error("Not found");
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  console.log("Not found your URL");
});

module.exports = app;