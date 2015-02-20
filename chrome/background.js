var answers = [];
var letters = { A:1, B:2, C:3, D:4, E:5 };

var $files = $$('[type=file]');
$files.onchange = function() {
    var files_read = 0;
    var size_sum = 0;
    this.files.forEach(function(file) {
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
                    var answer = letters[quiz.length - 1];
                    file_answers.push([quiz[0], quiz[answer]]);
                }
            }
            catch (ex) {
                row.class = 'error';
                row.title = ex.message;
            }
            answers.push(file_answers);
            if ($files.length == files_read) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, files_read);
                });
            }
        };
        reader.readAsBinaryString(file);
    });
    answers = [].concat.call([], answers);
    var summary = $all('#list > tfoot td');
    summary[1].innerHTML = answers.length;
    summary[2].innerHTML = size_sum;
};
