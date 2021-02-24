var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');


var db = require("../databases/db");
var querySql = require("../databases/commentSql");
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

// 按文章查询
router.post("/queryByArticleAll", urlencodedParser, async function (req, res, next) {
  var params = req.body;
  var rows = await query(querySql.queryTotal, params.article_id);
  var code = {
    status: 1,
    msg: "成功！",
    total: rows[0]["COUNT(*)"],
  }
  responseJSON(res, code);
});

// 按文章查询
router.post("/queryByArticle", urlencodedParser, async function (req, res, next) {
  var params = req.body;
  var rows2 = await query(querySql.searchByArticle, [params.article_id, params.dt_start, params.dt_end]);
  var code = {
    status: 1,
    msg: "成功！",
    info: rows2
  }
  responseJSON(res, code);
});

// 按作者查询
router.post("/queryByUser", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    connection.query(querySql.searchByUser, [params.user_id, params.dt_start, params.dt_end], function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      var code = {
        status: 1,
        info: result
      };
      responseJSON(res, code);
      connection.release();
    })
  })
});


// 添加
router.post("/addComment", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.addComment, [params.article_id, params.user_id, params.content, params.parent_id, params.dt_create], function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result);
      var code = {
        status: 1,
        msg: "成功",
        info: result
      };
      responseJSON(res, code);
      connection.release();
    })
  })
});

// 新增
router.post("/delete", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.delete, params.article_id, function (err, result) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(result);
      var code = {
        status: 1,
        msg: "成功",
        info: result
      };
      responseJSON(res, code);
      connection.release();
    })
  })
});

module.exports = router;
