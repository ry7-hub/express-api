var express = require("express");

// ルーティングする
var router = express.Router();

// routerにルーティングの動作を書いていく
// router.get('/', function(req, res) {
//     res.json({
//         message: "Hello, world!!!"
//     });
// });

router.use("/user", require("./user.js"));
router.use("/auth", require("./auth.js"));
router.use("/image", require("./image.js"));

//routerをモジュールとして扱う準備
module.exports = router;
