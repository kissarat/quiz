var fs = require('fs');
var exec = require('child_process').exec;

var dir = fs.readdirSync('input');
for(var i in dir) {
    var file = fs.readFileSync('input/' + dir[i]);
    file = file.toString();
    var result = [];
    var content = file.split('\n');
    for(var j=0; j<content.length; j++) {
        var line = content[j];
//        line = line.replace('’', "'");
        line = line.replace(/\s+[\.,]/, function(s) {
            return s[s.length - 1];
        });

        var q = /^\s*(\d+)\.(.*)/.exec(line);
        if (q) {
            var current = [];
            current.push(q.slice(1));
        }
        var v = /^([A-EА-Я])\.(.*)/.exec(line);
        if (v)
            current.push(v.slice(1));
//        fs.writeFileSync('count', k);
        var a = /ANSWER:\s*([A-E])/.exec(line);

        if (a) {
            current.push(a.slice(1)[0]);
            result.push(current);
        }

    }
    file = JSON.stringify(result, null, '\t');
    var json = 'json/' + dir[i];
    fs.writeFileSync(json + '.json', file);
    fs.appendFileSync('count', json + ' ' + result.length + '\n');
    exec('python quiz.py ' + json + ' html/' + dir[i]);
}
