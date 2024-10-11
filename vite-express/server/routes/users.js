var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        name: 'John Doe'
      },
      {
        id: 2,
        name: 'Jane Doe'
      }
    ]
  });
});

module.exports = router;
