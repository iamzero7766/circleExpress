var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/articleSql");
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


// 添加
router.post("/addArticle", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.add, [params.arcticle_title, params.user_id, params.content, params.dt_create, params.type, params.tips, params.original], function (err, result) {
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
router.post("/updateArticle", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.update, [params.content, params.id], function (err, result) {
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
    connection.query(querySql.delete, params.id, function (err, result) {
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

// 总体查询id
router.post("/query", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.query, [params.start, params.end], function (err, result) {
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

router.post("/queryAll", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.queryAll, function (err, result) {
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

// 按id查询
router.post("/queryInfo", urlencodedParser, function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if(err) {
      console.log(err);
      return;
    }
    var params = req.body;
    console.log(params);
    connection.query(querySql.queryInfo, params.id, function (err, result) {
      if(err) throw err
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

// 按id查询
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