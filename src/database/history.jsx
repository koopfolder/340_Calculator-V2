import React from "react";

const history = () => {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  // Insert
  const insertHistory = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });

  //   Query
  const queryHistory = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo
      .collection("customers")
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
  });

  //   Delete
  const deleteHistory = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: "Mountain 21" };
    dbo.collection("customers").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });

  return (
    <div className="history">
      <h1>hello, history</h1>
    </div>
  );
};

export default history;
