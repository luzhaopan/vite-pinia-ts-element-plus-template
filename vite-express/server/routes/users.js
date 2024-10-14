var express = require('express');
const UserModel = require('../model/UserModel');
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
     // 读取前端cookies
    // console.log(req.cookies);
    // 设置cookies
    res.cookie('username', 'zhangsan');
    // 插入数据库
    UserModel.create({
      username,
      password
    }).then((data) => {
      console.log('插入成功', data);
    }).catch((err) => {
      console.log('插入失败', err);
    })
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

router.get('/list', function(req, res, next) {
  res.send({
    code: 200,
    data: [{
      title: '亚锦赛',
      desc: '亚锦赛国乒男团3-1中国台北夺冠 王楚钦再拿2分'
    },
    {
      title: '欧国联',
      desc: '欧国联-贝林厄姆破门 英格兰1-2队史首负希腊'
    },
    {
      title: '英超',
      desc: '国家队比赛日超低赔又没打出 这1特征暗示冷门'
    },
    {
      title: '英超',
      desc: '切尔西不急于让凯利曼复出，重要的是让球员恢复'
    }]
  });
});

router.get('/tableData', function(req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        id: 2,
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      },
      {
        id: 3,
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Home'
      },
      {
        id: 4,
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
        tag: 'Office'
      }
    ]
  });
});

module.exports = router;
