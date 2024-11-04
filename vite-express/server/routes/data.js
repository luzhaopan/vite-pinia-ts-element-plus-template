var express = require("express")
const DataModel = require("../model/DataModel")
var router = express.Router()

router.get("/dataList", function (req, res, next) {

   // 插入数据库
  //  DataModel.create(list)
  //   .then((data) => {
  //     console.log("注册成功", data)
  //   })
  //   .catch((err) => {
  //     console.log("注册失败", err)
  //   })
   DataModel.find()
    .then((data) => {
      res.send({
        code: 200,
        data: data
      })
    })
    .catch((err) => {
      console.log("查询失败", err)
    })
})

router.post("/edit", function (req, res, next) {
  const { id, name } = req.body
  // console.log(req.body);
  // 更新条件
  // const query = { _id: id };
  // 更新内容
  // const update = {  name  };
  DataModel.updateOne({ id },{name}).then(data => {
    res.send({
      code: 200
    })
  })
   .catch((err) => {
     console.log("失败", err)
   })
})

module.exports = router
