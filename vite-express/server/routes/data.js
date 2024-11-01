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

module.exports = router
