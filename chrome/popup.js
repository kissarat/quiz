var answers = [];
var letters = { A:1, B:2, C:3, D:4, E:5 };

files.onchange = function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reads_number = 0;
        var reader = new FileReader();
        reader.onload = (function(e) {
            var div = document.createElement('div');
            var name_div = document.createElement('div');
            name_div.innerHTML = this.name;
            div.appendChild(name_div);
            var j;
            reads_number++;
            try {
                var content = JSON.parse(e.target.result);
                for (j = 0; j < content.length; j++) {
                    var quiz = content[j];
                    var answer = letters[quiz.length - 1];
                    answers.push([quiz[0], quiz[answer]]);
                }
            }
            catch (ex) {
                div.classList.add('error');
                div.title = ex.message;
            }
            var number_div = document.createElement('div');
            number_div.innerHTML = j;
            div.appendChild(number_div);
            list.appendChild(div);
            if (files.length == reads_number) {
                chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, answers);
                });
                var summary = document.createElement('div');
                summary.classList.add('summary');
                summary.innerHTML = answers.length;
                list.appendChild(summary);
            }
        }).bind(file);
        reader.readAsBinaryString(file);
    }
};

