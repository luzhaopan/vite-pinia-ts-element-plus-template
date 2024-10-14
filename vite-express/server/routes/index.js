var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // // 读取前端cookies
  // console.log(req.cookies);
  // // 设置cookies
  // res.cookie('username', 'zhangsan');
  res.render('index', { title: 'Express' });
});

module.exports = router;
