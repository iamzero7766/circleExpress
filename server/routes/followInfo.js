var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/followSql");
var questionSql = require("../databases/questionSql");
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

// 查询
router.post("/query", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.search, [params.user_id, params.question_id], function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      result = JSON.parse( JSON.stringify(result));
      var code = {
        status: 1,
        msg: "成功！"
      }
      if (result.length > 0) {
        code.info = true;
      } else {
        code.info = false;
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
    connection.query(querySql.addFollow, [params.user_id, params.question_id], function (err, result) {
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
router.post("/delete", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.delete, [params.user_id, params.question_id], function (err, result) {
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


// 查询用户关注问题
router.post("/queryByUser", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.searchByUser, [params.user_id, params.start, params.end], function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      result = JSON.parse( JSON.stringify(result));
      async.map(result, function (item, callback) {
        connection.query(questionSql.queryById, item.question_id , function (err, result0) {
          if(err) throw err;
          result0 = JSON.parse( JSON.stringify(result0));
          item.question_title = result0[0].question_title;
          item.question_info = result0[0].question_info;
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

// 查询关注问题
router.post("/queryByUserQuestion", urlencodedParser, async function (req, res, next) {
  var params = req.body;
  var result = await query(querySql.searchByUser, [params.user_id, params.start, params.end]);
  for(let item of result) {
    var rows0 = await query(questionSql.queryById, item.question_id);
    item.questionInfo = rows0[0];
    var rows1 = await query(answerSql.queryQuestionInfo, [item.question_id, 0, 1]);
    item.answeInfo = rows1;
  }
  var code = {
    status: 1,
    msg: "成功！",
    info: result
  }
  responseJSON(res, code);
});




module.exports = router;