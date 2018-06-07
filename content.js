'use strict';

chrome.storage.sync.get('isEnabled', function (data) {
    if(!data.isEnabled) {
        return;
    }

    for (let link of document.links) {
        link.removeAttribute('href');
        console.log(link);
    }
});