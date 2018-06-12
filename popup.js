'use strict';

// Saves options to chrome.storage whenever changed
function toggleEnable() {
  var isEnabledNew = document.getElementById('enabledCheckBox').checked;
  chrome.storage.sync.set({ isEnabled: isEnabledNew }, () => {
    //display message showing it worked
    var status = document.getElementById('status');
    status.textContent = `Options saved: ${isEnabledNew}`;
    setTimeout(() => {
      status.textContent = '';
    }, 750);

    // send message to all tabs that extension have been toggled
    chrome.tabs.query({}, function(tabs) {
      for(let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, 'isEnabled');
      }
    });
  });
}

function updateProtocols() {
  let protocolsNew = document.getElementById('protocolList').value.split(',');
  chrome.storage.sync.set({ protocols: protocolsNew }, () => {
    //display message showing it worked
    var status = document.getElementById('status');
    status.textContent = `Options saved: ${protocolsNew}`;
    setTimeout(() => {
      status.textContent = '';
    }, 750);

    // send message to all tabs that protocols have been updated
    chrome.tabs.query({}, function(tabs) {
      for(let tab of tabs) {
        chrome.tabs.sendMessage(tab.id, 'protocols');
      }
    });
  });
}

// sets popup options to whatever is in chrome storage
function restore_options() {
  chrome.storage.sync.get('isEnabled', data => {
    document.getElementById('enabledCheckBox').checked = data.isEnabled;
  });
  chrome.storage.sync.get('protocols', data => {
    document.getElementById('protocolList').value = data.protocols;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enabledCheckBox').addEventListener('click', toggleEnable);
document.getElementById('protocolList').addEventListener('blur', updateProtocols);