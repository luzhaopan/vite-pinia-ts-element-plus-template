var express = require("express")
const DataModel = require("../model/DataModel")
var router = express.Router()

router.get("/dataList", function (req, res, next) {
const { pageNumber, pageSize } = req.query
  DataModel.countDocuments({}).then((total) => {
  const skipValue = (pageNumber - 1) * pageSize;
   DataModel.find()
   .skip(skipValue)
   .limit(pageSize)
   .sort({ createdTime: -1 })
    .then((data) => {
      res.send({
        code: 200,
        data: data,
        total: total
      })
    })
    .catch((err) => {
      console.log("查询失败", err)
    })
  });
  
})

router.post("/add", function (req, res, next) {
  const { name } = req.body
  DataModel.findOne({ name }).then(data => {
    if(!data){
      const createdTime = new Date();
      const newData = { ...req.body, createdTime: createdTime }
      DataModel.create(newData).then(data => {
          res.send({
            code: 200,
            msg: ""
          })
        })
        .catch((err) => {
          console.log("失败", err)
        })
    } else {
      res.send({
        code: 409,
        msg: "用户名已存在"
      })
    }
  })
   .catch((err) => {
     console.log("失败", err)
   })
})

router.post("/edit", function (req, res, next) {
  const { _id } = req.body
  // console.log(req.body);
  // 更新条件
  // const query = { _id: id };
  // 更新内容
  // const update = {  name  };
  DataModel.updateOne({ _id: _id }, { ...req.body}).then(data => {
    res.send({
      code: 200
    })
  })
   .catch((err) => {
     console.log("失败", err)
   })
})

router.get("/delete/:id", function (req, res, next) {
  DataModel.deleteOne({ _id: req.params.id }).then(data => {
    res.send({
      code: 200
    })
  })
   .catch((err) => {
     console.log("失败", err)
   })
})

module.exports = router
