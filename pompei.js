var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

var FILE_PATH = 'waiting.txt';

// Routes
app.get('/', function(req, res) {
  fs.readFile(FILE_PATH, function(err, data) {
    if (err)
      console.log(err);
    return res.send(data.toString());
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
  if (data && !isNaN(parseInt(data))) {
    fs.writeFile(FILE_PATH, data, function(err, data) {
      if (err)
        console.log(err);
      return res.redirect('/admin');
    });
  } else
    return res.send('숫자만 입력해주세요.');
});

app.listen(8000);
