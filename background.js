'use strict';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isEnabled: false });
  chrome.storage.sync.set({ protocols: ['mailto']});
});