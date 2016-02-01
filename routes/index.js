var express = require('express');
var fs = require('fs');
var LineByLineReader = require('line-by-line');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', function(req, res, next) {
    var val = req.body.key;
    //var val = req.query.key;

    fs.appendFile('public/verdier.txt', val+"\n", function(err){
        res.setHeader('Content-Type', 'application/json');
        if(err){
            res.end(JSON.stringify({"error": true}));
        }
        else{
            res.end(JSON.stringify({"error": false}))
        }
    });
});

router.get('/read', function(req, res, next){
    lr = new LineByLineReader('public/verdier.txt');

    lr.on('end', function(){
        res.end();
    })

    lr.on('line', function(line){
        res.write(line+"\n");
    })
});



module.exports = router;
