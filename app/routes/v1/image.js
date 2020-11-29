var express = require("express");
var mongoose = require("mongoose"); //mongoDBに接続するためのライブラリ
var router = express.Router();
var ImageModel = require("../../models/imageModel");
var UserModel = require("../../models/userModel");

router.get("/", function (req, res) {
  ImageModel.find().then(function (images) {
    res.json(images);
  });
});

router.get("/:id", function (req, res) {
  var id = req.params.id;
  ImageModel.findOne({ id: id }, function (err, image) {
    res.json(image);
  });
});

router.post("/", function (req, res) {
  // モデル作成
  var Image = new ImageModel();

  // データを詰め込む
  Image._id = new mongoose.Types.ObjectId();
  Image.id = req.body.id;
  Image.image = req.body.image;

  // 登録済みの画像を削除する
  ImageModel.remove({ id: req.body.id }, function (err) {
    // 何もしない
  });

  // 保存処理
  Image.save(function (err) {
    if (err) {
      // エラーがあった場合エラーメッセージを返す
      res.send(err);
    } else {
      // ユーザのImageの外部キー更新
      UserModel.findById(Image.id, function (err, user) {
        if (err) {
          res.send(err);
        } else {
          user.image = Image._id;

          user.save(function (err) {
            if (err) {
              res.send(err);
            } else {
              res.json({ message: "Success" });
            }
          });
        }
      });
    }
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
