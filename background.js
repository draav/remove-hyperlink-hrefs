chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ kButtonColors: ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', 'transparent'] }, function () {
    console.log("kButtonColors set");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});