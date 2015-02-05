document.addEventListener('DOMContentLoaded', function() {
//    var module = document.querySelector('script[src*="module.js"]');
    var s = document.querySelectorAll('script');
    var i;
    for(i=0; i<s.length; i++)
        s[i].remove();

    var list = [];
    var questions = document.querySelectorAll('.qtext');
    for(i=0; i<questions.length; i++) {
        var q = questions.item(i);
        var current = [];
        var answer = null;
        current.push(q.textContent);
        var variants = q.nextSibling.querySelectorAll('label');
        for(var j=0; j<variants.length; j++) {
            var variant = variants[j];
            var text = /(\w)\.(.*)/.exec(variant.textContent);
            if (!text) {
                console.log(variant.textContent);
                continue;
            }
            if (variant.parentNode.classList.contains('correct'))
                answer = text[1].toUpperCase();
            variant.previousSibling.disabled = false;
            current.push(text[2].trim());
        }
        current.push(answer);
        list.push(current);
    }

});


chrome.runtime.onMessage.addListener(function(answers) {
    var questions = document.getElementsByClassName('qtext');
    for (var i = 0; i < questions.length; i++) {
        var q = questions.item(i);
        var text = q.textContent;
        for (var j = 0; j < answers.length; j++) {
            var answer = answers[j];
            if (text.indexOf(answer[0]) >= 0) {
                var variants = q.nextSibling.document.body.getElementsByTagName('label');
                for (var k = 0; k < variants.length; k++) {
                    var variant = variants[k];
                    if (variant.textContent.indexOf(answer[1]) >= 0)
                        variant.previousSibling.checked = true;
                }
            }
        }
    }
});