var $files = $$('[type=file]');
var $tbody = $$('tbody');
var sources = [];
$files.onchange = function() {
    var files = array(this.files);
    busy(true);
    function read() {
        var file = this;
        var source = new Source(file);
        source.read(function() {
            var exists = false;
            for (var j = 0; j < sources.length; j++)
                if (source.hash == sources[j].hash) {
                    exists = true;
                    break;
                }

            if (!exists) {
                source.parse();
                sources.push(source);
                add_rows($tbody, [source.row]);
            }

            if (files.length > 0)
                setTimeout(read.bind(files.shift()), 50);
            else
                busy(false);
            summary();
        })
    }
    read.call(files.shift());
};


function summary() {
    var rows = [];
    var answers = 0;
    var size = 0;
    var errors = 0;
    for (var i = 0; i < sources.length; i++) {
        var source = sources[i];
        size += source.file.size;
        if (source.class.indexOf('error') >= 0)
            errors++;
        if (source.answers)
            answers += source.answers.length;
    }
    add_rows($$('#list > tbody'), rows);
    var $summary = $all('#list > tfoot td');
    $summary[2].innerHTML = answers;
    $summary[3].innerHTML = metric(size);
    $summary[5].innerHTML = errors;
    /*chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, files_read);
    });*/
}

function Source(file) {
    this.file = file;
    this.class = [];
}

Source.prototype = {
    get row() {
        var r = [
            this.class.indexOf('error') < 0,
            this.file.name,
            this.answers ? this.answers.length : 0,
            metric(this.file.size),
            this.encoding,
            this.error || ''
        ];
        r.class = this.class.join(' ');
        return r;
    },

    read: function(call) {
        var reader = new FileReader();
        var encoding = $id('encoding').value;
        var source = this;
        reader.onload = function (e) {
            var content = e.target.result;
            source.encoding = encoding;
            source.hash = md5(content);
            source.content = content;
            call();
        };
        reader.readAsText(this.file, encoding);
    },

    parse: function() {
        var content = this.content;
        var answers = [];
        try {
            content = /\.json$/.test(this.file.name) ? JSON.parse(content) : parse(content);
            for (var i = 0; i < content.length; i++) {
                var quiz = content[i];
                answers.push([quiz[0], quiz[quiz.length - 1]]);
            }
            this.answers = answers;
        }
        catch (ex) {
            this.class.push('error');
            this.error = ex.message;
        }
        delete this.content;
    }
};
