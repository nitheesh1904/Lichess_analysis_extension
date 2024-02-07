// background.js

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // Check if the URL includes "lichess.org/"
    if (tab.url && tab.url.includes("lichess.org/")) {
        // Execute the content script in the active tab
        chrome.tabs.executeScript(tabId, { file: 'content.js' });
    }
});

