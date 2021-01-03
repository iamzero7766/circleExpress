var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const listenNumber = 3000;




// 上传图片
router.post('/image', (req, res, next) => {
  let defaultPath = '../uploadImage/';
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
        newPath = `http://localhost:${listenNumber}/${newPath}`
        res.json({ flag: true, path: newPath });
      } else {
        console.log(err);
        res.json({ flag: false, path: '' });
      }
    })
  })
});

module.exports = router;




