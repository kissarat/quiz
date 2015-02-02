if (/(attempt|review)\.php/.exec(location.pathname) && document.querySelector("script[src*=\'module.js\']")) {
    addEventListener('load', function() {
        document.oncontextmenu = function(e) {window.alert = function() {throw new Error()}}
    })
}
console.log('two');