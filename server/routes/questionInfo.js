var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/questionSql");
var answerSql = require("../databases/answerSql");
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
    connection.query(querySql.query, [params.start, params.num], function (err, result) {
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

router.post("/query", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.query, [params.start, params.num], function (err, result) {
      if(err) throw err
      result = JSON.parse( JSON.stringify(result));
      async.map(result, function (item, callback) {
        connection.query(answerSql.queryByQuestion, item.question_id, function (err, result0) {
          if(err) throw err;
          item.answeInfo = result0;
          callback(null, item);
        });
      }, function (err, results) {
        var code = {
          status: 1,
          msg: "成功！",
          info: results
        }
        responseJSON(res, code);
        connection.release();
      })
    })
  })
});
// 按id查询
router.post("/queryByID", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.queryById, params.id, function (err, result) {
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
})

// 添加
router.post("/addQuestion", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, [params.title, params.info, params.user_id, params.anonymous, params.dt_create], function (err, result) {
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
    connection.query(querySql.add, [params.info, params.anonymous, params.dt_create, params.id], function (err, result) {
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
    connection.query(querySql.add, params.id, function (err, result) {
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