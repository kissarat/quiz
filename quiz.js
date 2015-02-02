var fs = require('fs');
var exec = require('child_process').exec;

var dir = fs.readdirSync('input');
for(var i in dir) {
    var file = fs.readFileSync('input/' + dir[i]);
    file = file.toString();
    var result = [];
    var current;
    var answer;
    function save() {
        if (answer)
            current.push(answer);
        if (current)
            result.push(current);
        answer = null;
        current = [];
    }
    var content = file.split('\n');
    var removed = [];
    for(var j=0; j<content.length; j++) {
        var line = content[j];
        line = line.replace(/\s+[\.,]/, function(s) {
            return s[s.length - 1];
        });
        var added = false;

        var q = /^\s*(\d+)\.(.*)/.exec(line);
        if (q) {
            save();
            current.push(q.slice(1));
            added = true;
        }
        var v = /^([A-EА-Я])\.(.*)/.exec(line);
        if (v) {
            v = v.slice(1);
            if (2 == v.length) {
                v[0] = v[0].trim();
                v[1] = v[1].trim();
                if (v[1].indexOf('*') >= 0) {
                    v[1] = v[1].replace('*', '');
                    answer = v[0];
                }
                current.push(v);
                added = true;
            }
        }
        if (!added && line.trim())
           removed.push(j + 1 + '\t' + line);
    }
    save();
    if (0 == result[0])
        result.shift();
    file = JSON.stringify(result, null, '\t');
    var json = 'json/' + dir[i];
    json += '.json';
    fs.writeFileSync(json, file);
    removed = '\n' + json + ' ' + result.length + '\n' +
        removed.join('\n');
    fs.appendFileSync('count', removed);
    var args = 'python quiz.py "' + json + '" "html/' + dir[i] + '.html"';
    console.log(args);
    exec(args, (function(json, error) {
//        console.log(arguments);
    }).bind(this, json));
}
