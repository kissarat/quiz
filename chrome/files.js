var $files = $$('[type=file]');
var sources = [];
$files.onchange = function() {
    var files = this.files;
    [].forEach.call(files, function(file, i) {
        var source = new Source(file);
        source.read(function() {
            for (var j = 0; j < sources.length; j++)
                if (source.hash == sources[j].hash)
                    return;
            source.parse();
            sources.push(source);

            if (i == files.length - 1)
                summary();
        })
    });
};

function summary() {
    var rows = [];
    var answers = 0;
    var size = 0;
    for (var i = 0; i < sources.length; i++) {
        var source = sources[i];
        size += source.size;
        if (source.answers)
            answers += source.answers.length;
        rows.push(source.row);
    }
    fill_rows($$('#list > tbody'), rows);
    var $summary = $all('#list > tfoot td');
    $summary[2].innerHTML = answers;
    $summary[3].innerHTML = metric(size);
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
            this.answers.length,
            metric(this.size),
            this.error
        ];
        r.class = this.class.join(' ');
        return r;
    },

    read: function(call) {
        var reader = new FileReader();
        var encoding = $id('encoding').value;
        reader.onload = function (e) {
            var content = e.target.result;
            this.encoding = encoding;
            this.hash = md5(content);
            this.content = content;
            call();
        };
        reader.readAsText(this.file, encoding);
    },

    parse: function() {
        var content = this.content;
        var answers = [];
        try {
            content = /\.json$/.test(file.name) ? JSON.parse(content) : parse(content);
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
