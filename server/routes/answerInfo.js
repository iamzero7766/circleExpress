var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');


var db = require("../databases/db");
var querySql = require("../databases/answerSql");
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
router.post("/queryInfo", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.query, [params.start, params.num], function (err, result) {
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

// 添加
router.post("/addQuestion", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, [params.question_id, params.user_id, params.content, params.anonymous, params.dt_create], function (err, result) {
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

// 更新
router.post("/update", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, [params.content, params.anonymous, params.dt_create, params.question_id, params.user_id], function (err, result) {
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

// 删除
router.post("/deleteQuestion", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, [params.question_id, params.user_id], function (err, result) {
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