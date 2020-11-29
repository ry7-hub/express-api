var mongoose = require("mongoose"); //mongoDBに接続するためのライブラリ
var Schema = mongoose.Schema; //mongoDBのスキーマを作る

var UserSchema = new Schema({
  name: String,
  screen_name: String,
  description: String,
  password: String,
  image: [{ type: Schema.Types.ObjectId, ref: "ImageModel" }],
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model("UserModel", UserSchema);
