chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ isEnabled: false });
});