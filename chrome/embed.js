var questions = document.querySelectorAll('.qtext');
for(var i=0; i<questions.length; i++) {
    var q = questions.item(i);
    console.log(q.textContent);
    var variants = q.nextSibling.querySelectorAll('label');
    for(var j=0; j<variants.length; j++) {
        console.log(variants[j].textContent);
    }
}
