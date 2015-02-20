chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url:'files.html'}, function(tab) {
       /* tab.tabId;*/
    })
});
