var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/answerSql");
var questionSql = require("../databases/questionSql");
var userSql = require("../databases/querySql");
var pool = mysql.createPool(db.mysql);
var urlencodedParser = bodyParser.urlencoded({ extended: false })

let query = function (sql, values) {
  return new Promise(((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if(err) throw err;
      connection.query(sql, values, (err, rows) =>{
        if(err) {
          reject(err);
        } else {
          rows = JSON.parse( JSON.stringify(rows));
          resolve(rows);
        }
        connection.release();
      })
    })
  }))
}

var responseJSON = function(res,ret){
  if(typeof ret == 'undefined'){
    res.json({code:"-200",msg:"操作失败"});
  }else{
    res.json(ret);
  }

};

// 查询
router.post("/queryInfo", urlencodedParser, async function (req, res, next) {
  var params = req.body;
  var rows = await query(querySql.queryTotal, params.question_id);
  var rows2 = await query(querySql.queryQuestionInfo, [params.question_id, params.start, params.num]);
  var code = {
    status: 1,
    msg: "成功！",
    total: rows[0]["COUNT(*)"],
    info: rows2
  }
  responseJSON(res, code);
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
    connection.query(querySql.update, [params.content, params.anonymous, params.dt_create, params.question_id, params.user_id], function (err, result) {
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
    connection.query(querySql.delete, [params.question_id, params.user_id], function (err, result) {
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

// 查询id
router.post("/queryByID", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.queryById, [params.question_id, params.user_id], function (err, result) {
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

router.post("/queryByUser", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.queryByUser, [params.id, params.start, params.end], function (err, result) {
      if(err) throw err
      result = JSON.parse( JSON.stringify(result));
      async.map(result, function (item, callback) {
        connection.query(questionSql.queryById, item.question_id , function (err, result0) {
          if(err) throw err;
          result0 = JSON.parse( JSON.stringify(result0));
          item.questionInfo = result0[0];
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





module.exports = router;