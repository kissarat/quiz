var fs = require('fs');
var parse = require('./chrome/parse').parse;
var exec = require('child_process').exec;

var dir = fs.readdirSync('input');
fs.unlinkSync('count');
for(var i in dir) {
    var file = fs.readFileSync('input/' + dir[i]);
    file = file.toString();
    var content = file.split('\n');
    var result = parse(content);
    file = JSON.stringify(result, null, '\t');
    var json = 'json/' + dir[i];
    json += '.json';
    fs.writeFileSync(json, file);
    var args = 'python quiz.py "' + json + '" "html/' + dir[i] + '.html"';
    console.log(args);
//    exec(args, (function(json, error) {
////        console.log(arguments);
//    }).bind(this, json));
}
