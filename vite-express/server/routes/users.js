var express = require('express');
var router = express.Router();

const usersList = {
  'admin': {
    'name': 'admin',
    'password': '123456'
  },
  'lzp': {
    'name': 'lzp',
    'password': '123456'
  },
}

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const {username, password} = req.body;
  if (usersList[username] && usersList[username].password === password) {
    // req.session.user = usersList[username];
    res.send({
      code: 200,
      data:{
        name: username
      }
    });
  }else {
    res.send({
      code: 400,
      data: {
        message: '用户名或密码错误'
      }
    });
  }
});
router.get('/logout', function(req, res, next) {
  res.send({
    code: 200
  });
});

module.exports = router;
