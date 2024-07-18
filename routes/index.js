var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<html><body><h1>API DPSI - Portal Akademik</h1><p>by Dila Erisma</p></body></html>');
});

module.exports = router;
