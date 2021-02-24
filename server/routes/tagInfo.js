var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/tagSql");
var pool = mysql.createPool(db.mysql);
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var responseJSON = function(res,ret){
  if(typeof ret == 'undefined'){
    res.json({code:"-200",msg:"操作失败"});
  }else{
    res.json(ret);
  }

};

// 查询
router.post("/query", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.query, function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      result = JSON.parse( JSON.stringify(result));
      var code = {
        status: 1,
        msg: "成功！",
        info: result
      }
      responseJSON(res, code);
      connection.release();
    })
  })
});


// 增加
router.post("/add", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, params.name, function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result);
      var code = {
        status: 1,
        msg: "成功！",
        info: result
      }
      responseJSON(res, code);
      connection.release();
    })
  })
});





module.exports = router;