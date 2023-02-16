const express = require("express");
const router = express.Router();
const history = require("../models/history");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  history
    .find({})
    .exec()
    .then((data) => {
      res.status(200).json({
        message: data
      });
    })
    .catch((err) => {
      res.status(500).json({
        message:err
      });
    });

});

router.post("/", (req, res, next) => {
  const history_1 = new history({
    _id: mongoose.Types.ObjectId(),
    value: req.body.value,
    result: req.body.result,
  });
  history_1
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        message: err,
      });
    });
});

router.delete("/", (req, res, next) => {
  res.status(200).json({
    message: "hello, this is delete history",
  });
});

module.exports = router;
