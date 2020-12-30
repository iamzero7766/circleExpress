var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/getCity", function (req, res, next) {
    console.log(req);
    var params = req.body;
    if(params.id === 1) {
        res.send(JSON.stringify({status: 1, data: "dede"}));
    } else {
        res.send(JSON.stringify({status: 1, data: "12122"}));
    }
})

module.exports = router;
