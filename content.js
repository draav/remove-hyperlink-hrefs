'use strict';

// ===== VARIABLES =====

// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var observer = new MutationObserver(() => {
  remove_hrefs();
});
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit
var observerConfig = {
  attributes: true,
  childList: true,
  characterData: true
};


// ===== FUNCTIONS =====

// when extension is enabled, remove hrefs
// store the values in [removed-href] so it can be put back later
function remove_hrefs() {
  chrome.storage.sync.get('protocols', data => {
    let links = document.body.getElementsByTagName('a');
    let linksToRemove = [];
    for(let protocol of data.protocols) {
      for(let link of links) {
        if(link.href.startsWith(`${protocol}:`)) {
          linksToRemove.push(link);
        }
      }
    }
    for (let link of linksToRemove) {
      link.setAttribute('removed-href', link.getAttribute('href'));
      link.removeAttribute('href');
    }
  });
}

// when extension is disabled, put the hrefs back
function put_hrefs_back() {
  let links = document.querySelectorAll('a[removed-href]');
  for (let link of links) {
    link.setAttribute('href', link.getAttribute('removed-href'));
    link.removeAttribute('removed-href');
  }
}

// ===== CODE START =====

// if extension isEnabled remove hrefs in document, 
// then enable MutationObserver to remove any future hrefs added
chrome.storage.sync.get('isEnabled', data => {
  if (!data.isEnabled) {
    return;
  }

  // run once on startup
  remove_hrefs();
  // run every time dom is updated
  observer.observe(document.body, observerConfig);
});

//watch for updates in popup
chrome.runtime.onMessage.addListener( message => {
  if (message === 'isEnabled') {
    chrome.storage.sync.get('isEnabled', data => {
      if (data.isEnabled) {
        remove_hrefs();
        observer.observe(document.body, observerConfig);
      }
      else {
        observer.disconnect();
        put_hrefs_back();
      }
    });
  }

  if (message === 'protocols') {
    put_hrefs_back();
    remove_hrefs();
  }
});