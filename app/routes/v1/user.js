var express = require("express");
var router = express.Router();
var UserModel = require("../../models/userModel");
var ImageModel = require("../../models/imageModel");

router.get("/", function (req, res) {
  // UserModel.find().then(function (users) {
  //   res.json(users);
  // });
  UserModel.find()
    .populate("image")
    .exec(function (err, userModel) {
      if (err) return { message: "errror" };
      res.json(userModel);
    });
});

router.get("/:id", function (req, res) {
  var userId = req.params.id;
  UserModel.findById(userId, function (err, user) {
    res.json(user);
  });
});

router.post("/", function (req, res) {
  // モデル作成
  var User = new UserModel();

  // データを詰め込む
  User.name = req.body.name;
  User.screen_name = req.body.screen_name;
  User.description = req.body.description;
  User.password = req.body.password;

  // 保存処理
  User.save(function (err) {
    if (err) {
      // エラーがあった場合エラーメッセージを返す
      res.send(err);
    } else {
      // エラーがなければ、「Success」
      res.json({ message: "Success" });
    }
  });
});

router.put("/:id", function (req, res) {
  var userId = req.params.id;

  UserModel.findById(userId, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      user.screen_name = req.body.screen_name;
      user.description = req.body.description;

      user.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Success" });
        }
      });
    }
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
