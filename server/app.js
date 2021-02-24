var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var formidable = require('formidable');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userInfoRouter = require('./routes/userInfo');
var diaryRouter = require('./routes/diaryInfo');
var questionRouter = require('./routes/questionInfo');
var answerRouter = require('./routes/answerInfo');
var followRouter = require("./routes/followInfo");
var articleRouter = require("./routes/articleInfo");
var tagRouter = require("./routes/tagInfo");
var commentRouter = require("./routes/commentInfo");

var app = express();
//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploadImage')));
app.use(express.static(path.join(__dirname, 'uploadBack')));
app.use(express.static(path.join(__dirname, 'uploadAvatar')));

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));

app.use(express.static('./uploadImage'));
app.use(express.static('./uploadBack'));
app.use(express.static('./uploadAvatar'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userInfo', userInfoRouter);
app.use('/diary', diaryRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);
app.use('/follow', followRouter);
app.use('/article', articleRouter);
app.use('/tag', tagRouter);
app.use('/comment', commentRouter);

var TITLE = "ERROR";
// 上传图片
app.post('/image', (req, res, next) => {
  let defaultPath = './uploadImage/';
  let uploadDir = path.join(__dirname, defaultPath);
  let form = new formidable.IncomingForm();
  let getRandomID = () => Number(Math.random().toString().substr(4, 10) + Date.now()).toString(36)
  form.uploadDir = uploadDir;  //设置上传文件的缓存目录
  form.encoding = 'utf-8';        //设置编辑
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 10 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    let filePath = files.file['path'];
    let backName = filePath.split('.')[1]
    let oldPath = filePath.split('\\')[filePath.split('\\').length - 1];
    let newPath = `${getRandomID()}.${backName}`;
    console.log(filePath);
    console.log(backName);
    console.log(oldPath);
    console.log(newPath);
    fs.rename(defaultPath + oldPath, defaultPath + newPath, (err) => {//fs.rename重命名
      if (!err) {
        newPath = `http://localhost:3000/${newPath}`
        res.json({ flag: true, path: newPath });
      } else {
        console.log(err);
        res.json({ flag: false, path: '' });
      }
    })
  })
});


// 上传用户背景
app.post('/backImage', (req, res, next) => {
  let defaultPath = './uploadBack/';
  let uploadDir = path.join(__dirname, defaultPath);
  let form = new formidable.IncomingForm();
  let getRandomID = () => Number(Math.random().toString().substr(4, 10) + Date.now()).toString(36)
  form.uploadDir = uploadDir;  //设置上传文件的缓存目录
  form.encoding = 'utf-8';        //设置编辑
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 10 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    if(err){
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    let filePath = files.file['path'];
    let backName = filePath.split('.')[1]
    let oldPath = filePath.split('\\')[filePath.split('\\').length - 1];
    let newPath = 'back-' + `${getRandomID()}.${backName}`;
    fs.rename(defaultPath + oldPath, defaultPath + newPath, (err) => {//fs.rename重命名
      if (!err) {
        newPath = `http://localhost:3000/${newPath}`
        res.json({ flag: true, path: newPath });
      } else {
        console.log(err);
        res.json({ flag: false, path: '' });
      }
    })
  })
});

app.post('/avatarImage', (req, res, next) => {
  let defaultPath = './uploadAvatar/';
  let uploadDir = path.join(__dirname, defaultPath);
  let form = new formidable.IncomingForm();
  let getRandomID = () => Number(Math.random().toString().substr(4, 10) + Date.now()).toString(36)
  form.uploadDir = uploadDir;  //设置上传文件的缓存目录
  form.encoding = 'utf-8';        //设置编辑
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 10 * 1024 * 1024;   //文件大小
  form.parse(req, function (err, fields, files) {
    if(err){
      res.locals.error = err;
      res.render('index', { title: TITLE });
      return;
    }
    let filePath = files.file['path'];
    let backName = filePath.split('.')[1]
    let oldPath = filePath.split('\\')[filePath.split('\\').length - 1];
    let newPath = 'avatar-' + `${getRandomID()}.${backName}`;
    fs.rename(defaultPath + oldPath, defaultPath + newPath, (err) => {//fs.rename重命名
      if (!err) {
        newPath = `http://localhost:3000/${newPath}`
        res.json({ flag: true, path: newPath });
      } else {
        console.log(err);
        res.json({ flag: false, path: '' });
      }
    })
  })
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
