var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');


var db = require("../databases/db");
var querySql = require("../databases/querySql");
var pool = mysql.createPool(db.mysql);
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var responseJSON = function(res,ret){
    if(typeof ret == 'undefined'){
        res.json({code:"-200",msg:"操作失败"});
    }else{
        res.json(ret);
    }

};

router.get("/query", function (req, res, next) {
   pool.getConnection(function (err, connection) {
       if(err) {
           console.log(err);
           return;
       }
       var params = req.query || req.params;
       connection.query(querySql.UserSql.query, function (err, result) {
           if(err) {
               console.log(err);
               return;
           }
           console.log(result);
           responseJSON(res, result);
           connection.release();
       })
   })
});

router.post("/queryLogin", urlencodedParser, function (req, res, next) {
   pool.getConnection(function (err, connection) {
       if(err) {
           console.log(err);
           return;
       }
       var params = req.body;
       console.log(params);
       connection.query(querySql.UserSql.search, [params.userName, params.userPassword], function (err, result) {
           if(err) {
               console.log(err);
               return;
           }
           console.log(result);
           var code = {};
           if(result.length == 0) {
               code = {
                   status: 0,
                   msg: "用户名或密码错误"
               }
           } else {
               code = {
                   status: 1,
                   msg: "成功！",
                   info: result
               }
           }
           responseJSON(res, code);
           connection.release();
       })
   })
});


module.exports = router;
