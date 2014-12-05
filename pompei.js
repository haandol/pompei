var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

var FILE_PATH = ['./', 'number.txt'].reduce(function(prev, cur, index, array) {
  return path.join(prev, cur);
});

// Routes
app.get('/', function(req, res) {
  fs.readFile(FILE_PATH, function(err, data) {
    if (err)
      console.log(err);
    var size = (undefined === req.query.size) ? '2em' : req.query.size;
    return res.render('index', {size: size, count: data.toString()});
  });
});

app.get('/admin', function(req, res) {
  fs.readFile(FILE_PATH, function(err, data) {
    if (err)
      console.log(err);
    return res.render('admin', {count: data.toString()});
  });
});

app.post('/admin', function(req, res) {
  var data = req.body.count
  if (undefined === data)
    return res.send('숫자만 입력해주세요.');

  fs.writeFile(FILE_PATH, data, function(err, data) {
    if (err)
      console.log(err);
    return res.redirect('/admin');
  });
});

app.listen(8080);
