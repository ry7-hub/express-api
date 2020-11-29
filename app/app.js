// ライブラリ読み込み
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var config = require("./config");

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/ExpressAPI');
mongoose.connect(config.database);
mongoose.connection.on("error", function (err) {
  console.log("MongoDB connection error:" + err);
  process.exit(-1);
});

// body-parserの設定
// base64とりあえず対応
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.json({ extended: true, limit: "10mb" }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

// CORS settings.
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  next();
};
app.use(allowCrossDomain);

var router = require("./routes/v1/");
app.use("/api/v1/", router);

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
