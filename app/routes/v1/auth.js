var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../../config");

var UserModel = require("../../models/userModel");
var VerifyToken = require("../middleware/verifyToken");

router.post("/login", function (req, res) {
  UserModel.findOne(
    {
      name: req.body.name,
    },
    function (err, user) {
      if (err) res.send(err);

      if (user) {
        // パスワードチェック
        if (user.password != req.body.password) {
          res.json({ message: "パスワードが違います。" });
        } else {
          // ユーザとパスワードの組が正しければトークンを発行します。
          // パスワードはpayloadの中に含めないように注意してください。
          const payload = {
            name: user.name,
          };
          var token = jwt.sign(payload, config.secret);

          // トークンを返します。
          res.json({
            success: true,
            id: user._id,
            name: user.name,
            token: token,
          });
        }
      } else {
        res.json({ message: "ユーザがいません。" });
      }
    }
  );
});

router.get("/me", VerifyToken, function (req, res, next) {
  UserModel.findOne({ name: req.decoded.name }, { password: 0 }, function (
    err,
    user
  ) {
    if (err) return res.status(500).send("ユーザの取得に失敗しました。");
    if (!user) return res.status(404).send("ユーザが見つかりません。");

    res.status(200).send(user);
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
