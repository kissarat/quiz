var answers = [];
var letters = { A:1, B:2, C:3, D:4, E:5 };

var $files = $$('[type=file]');
$files.onchange = function() {
    var files_read = 0;
    var size_sum = 0;
    var files = this.files;
    var rows = [];
    [].forEach.call(files, function(file) {
        var row = [];
        var file_answers = [];
        var reader = new FileReader();
        reader.onload = function (e) {
            var j;
            files_read++;
            size_sum += file.size;
            var content = e.target.result;
            try {
                content = /\.json$/.test(file.name) ? JSON.parse(content) : parse(content);
                for (j = 0; j < content.length; j++) {
                    var quiz = content[j];
                    file_answers.push([quiz[0], quiz[quiz.length - 1]]);
                }
            }
            catch (ex) {
                row.class = 'error';
                row.title = ex.message;
            }
            answers.push(file_answers);
            row[0] = 'error' != row.class;
            row[1] = file.name;
            row[2] = file_answers.length;
            row[3] = metric(file.size);
            rows.push(row);
            if (files.length == files_read) {
                fill_rows($$('#list > tbody'), rows);
                answers = [].concat.apply([], answers);
                var summary = $all('#list > tfoot td');
                summary[2].innerHTML = answers.length;
                summary[3].innerHTML = metric(size_sum);
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, files_read);
                });
            }
        };
        reader.readAsText(file, $id('encoding').value);
    });
};
