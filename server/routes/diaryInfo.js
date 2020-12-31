var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');


var db = require("../databases/db");
var querySql = require("../databases/diarySql");
var pool = mysql.createPool(db.mysql);
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var responseJSON = function(res,ret){
    if(typeof ret == 'undefined'){
        res.json({code:"-200",msg:"操作失败"});
    }else{
        res.json(ret);
    }

};

// 查询一个月
router.post("/queryMonth", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        connection.query(querySql.query, [params.user_id, params.dt_start, params.dt_end], function (err, result) {
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

// 查询当日
router.post("/queryToday", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.queryToday, [params.user_id, params.dt_create], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                info: result
            };
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 新增
router.post("/addDiary", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.add, [params.user_id, params.temp, params.dt_create, params.type, params.value, params.content], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                info: result
            };
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新
router.post("/updateDiary", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.update, [params.content, params.value, params.user_id, params.dt_create], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                info: result
            };
            responseJSON(res, code);
            connection.release();
        })
    })
});


module.exports = router;
