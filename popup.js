'use strict';

// Saves options to chrome.storage whenever changed
function toggle_enable() {
  var isEnabledNew = document.getElementById('enabledCheckBox').checked;
  chrome.storage.sync.set({ isEnabled: isEnabledNew }, () => {
    //display message showing it worked
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);

    // send message to all tabs that extension have been toggled
    chrome.tabs.query({}, function(tabs) {
      for(let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, isEnabledNew);
      }
    });
  });
}

// sets popup options to wahtever is in chrome storage
function restore_options() {
  chrome.storage.sync.get('isEnabled', data => {
    document.getElementById('enabledCheckBox').checked = data.isEnabled;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enabledCheckBox').addEventListener('click', toggle_enable);