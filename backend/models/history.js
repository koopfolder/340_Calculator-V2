const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const HistorySchema = new Schema({
    _id: ObjectId,
    value: String,
    result: String,
  });

  const history = mongoose.model('history', HistorySchema);

  module.exports=history;