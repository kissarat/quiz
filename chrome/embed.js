window.alert = function() {throw new Error()};
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

    function button(text, call) {
        var div = document.createElement('div');
        div.innerHTML = text;
        div.onclick = call;
        div.classList.add('fuck-button');
        return div;
    }

    var save = button('Зберегти ' + list.length + ' питання', function() {
        console.log(list);
    });

    var sesskey = document.getElementsByName('sesskey')[0];
    sesskey.parentNode.insertBefore(save, sesskey);
});
