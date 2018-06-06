'use strict';
// Saves options to chrome.storage
function toggle_enable() {
    var isEnabledNew = document.getElementById('enabledCheckBox').checked;
    chrome.storage.sync.set({ isEnabled: isEnabledNew },
        function () {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function () {
                status.textContent = '';
            }, 750);
        });
}

function restore_options() {
    chrome.storage.sync.get('isEnabled', function (data) {
        document.getElementById('enabledCheckBox').checked = data.isEnabled;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enabledCheckBox').addEventListener('click', toggle_enable);