/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// ----------ここから----------
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// ----------ここから----------
var request = require('request');

app.post('/api', function(req, res) {
  var options = {
    method: 'POST',
    uri: 'https://api.line.me/v2/bot/message/reply',
    body: {
      replyToken: req.body.events[0].replyToken,
      messages: [{
        type: "text",
        text: req.body.events[0].message.text
      }]
    },
    auth: {
      bearer: 'e4mHF9Qe3wQDGnexQjulQp3KHxJOJ2ZgJIkye7hz7OYaa8gQgJRqoyOKIi+xfJsOnqIby+effXmoUdTVrZE7Jy8/NtXpUB8xvb555aC6Tv/6hWwxe3X50gu+LFdYopMHfdZ4YazvfN44KZDP3obB0gdB04t89/1O/w1cDnyilFU=' // ここは自分のtokenに書き換える
    },
    json: true
  };
  request(options, function(err, res, body) {
    console.log(JSON.stringify(res));
  });
  res.send('OK');
});
// --------ここまで追加--------
// --------ここまで追加--------

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
