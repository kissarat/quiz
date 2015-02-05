chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log(details.url);
   // if (details.url.indexOf('moodle.tdmu.edu.ua') < 0)
   //     return;
   //chrome.tabs.executeScript(details.tabId, {
   //    file: 'embed.js'
   //});
});

chrome.webRequest.onCompleted.addListener(function(details) {
   chrome.tabs.executeScript(details.tabId, {
       file: 'navigate.js'
   });
}, {urls:['<all_urls>']}, ['blocking']);

chrome.contextMenus.create({
    title: 'Fuck',
    onclick: function() {
        chrome.tabs.executeScript({
            file: 'embed.js'
        });
    }
});