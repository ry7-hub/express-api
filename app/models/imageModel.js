var mongoose = require("mongoose"); //mongoDBに接続するためのライブラリ
var Schema = mongoose.Schema; //mongoDBのスキーマを作る

var ImageSchema = new Schema({
  id: String,
  image: String,
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model("ImageModel", ImageSchema);
