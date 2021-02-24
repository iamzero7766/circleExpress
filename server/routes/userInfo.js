var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
var async = require('async');


var db = require("../databases/db");
var querySql = require("../databases/querySql");
var questionSql = require("../databases/questionSql");
var answerSql = require("../databases/answerSql");
var articleSql = require("../databases/articleSql");
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

router.get("/query", function (req, res, next) {
   pool.getConnection(function (err, connection) {
       if(err) {
           console.log(err);
           return;
       }
       var params = req.query || req.params;
       connection.query(querySql.query, function (err, result) {
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

router.post("/queryById", urlencodedParser, function (req, res, next){
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.queryById, params.user_id, function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            result = JSON.parse( JSON.stringify(result));
            var code = {
                status: 1,
                msg: "成功！",
                info: result
            };
            responseJSON(res, code);
            connection.release();
        })
    })
})

router.post("/queryLogin", urlencodedParser, function (req, res, next) {
   pool.getConnection(function (err, connection) {
       if(err) {
           console.log(err);
           return;
       }
       var params = req.body;
       console.log(params);
       connection.query(querySql.search, [params.user_phone, params.userPassword], function (err, result) {
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

router.post("/add", urlencodedParser, async function (req, res, next) {
    var params = req.body;
    var result = await query(querySql.queryPhone, params.user_phone);
    console.log(result);
    if(result.length > 0) {
        var code = {
            status: 0,
            info: "该手机号已被注册，请直接登录"
        }
        responseJSON(res, code);
    } else {
        var result2 = query(querySql.add, [params.user_name, params.user_password, params.user_info, params.user_phone]);
        if(result2) {
            var code2 = {
                status: 0,
                info: "注册成功，请登录"
            }
            responseJSON(res, code2);
        }
    }
});

// 修改密码
router.post("/checkPassword", urlencodedParser, function (req, res, next) {
    var params = req.body;
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.searchPassword, [params.user_id, params.userPassword], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {};
            if(result.length === 0) {
                code = {
                    status: 0,
                    msg: "密码错误"
                }
            } else {
                code = {
                    status: 1,
                    msg: "成功！",
                }
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新信息
router.post("/updatePassword", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.updatePassword, [params.newPassword, params.user_id], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                msg: "修改成功！",
                info: result
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新信息
router.post("/updateInfo", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.updateInfo, [params.user_info, params.user_id], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                msg: "修改成功！",
                info: result
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新信息
router.post("/updateName", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.updateName, [params.user_name, params.user_id], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                msg: "修改成功！",
                info: result
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新背景图
router.post("/updateBack", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.updateBack, [params.back, params.user_id], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                msg: "修改成功！",
                info: result
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});

// 更新头像
router.post("/updateAvatar", urlencodedParser, function (req, res, next) {
    pool.getConnection(function (err, connection) {
        if(err) {
            console.log(err);
            return;
        }
        var params = req.body;
        console.log(params);
        connection.query(querySql.updateAvatar, [params.avatar, params.user_id], function (err, result) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(result);
            var code = {
                status: 1,
                msg: "修改成功！",
                info: result
            }
            responseJSON(res, code);
            connection.release();
        })
    })
});


// 获取基本信息
router.post("/getUserMessage", urlencodedParser, async function (req, res, next) {
    var params = req.body;
    var rows = await query(querySql.queryById, params.id);
    var rows2 = await query(questionSql.queryCount, params.id);
    var rows3 = await query(answerSql.queryCount, params.id);
    var rows4 = await query(articleSql.queryCount, params.id);
    var code = {
        status: 1,
        msg: "成功！",
        questionTotal: rows2[0]["COUNT(*)"],
        answerTotal: rows3[0]["COUNT(*)"],
        articleTotal: rows4[0]["COUNT(*)"],
        info: rows
    }
    responseJSON(res, code);
})


module.exports = router;
