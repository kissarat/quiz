chrome.webNavigation.onCompleted.addListener(function(details) {
   chrome.tabs.executeScript(details.tabId, {
       file: 'navigate.js'
   });
});

chrome.contextMenus.create({
    title: 'Fuck',
    onclick: function() {
        chrome.tabs.executeScript({
            file: 'embed.js'
        });
    }
});