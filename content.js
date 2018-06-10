'use strict';

// ===== VARIABLES =====

// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var observer = new MutationObserver(mutations => {
  for (let mutation of mutations) {
    remove_hrefs();
  }
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
  let links = document.body.querySelectorAll('a[href]');
  for (let link of links) {
    link.setAttribute('removed-href', link.getAttribute('href'));
    link.removeAttribute('href');
  }
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
// NOTE: may want to only trigger on whole doc once, then on just the new nodes later
//       right now it run on the entire doc after every update
//       check performance then optomize if it's a problem

chrome.runtime.onMessage.addListener(msgObj => {
  chrome.storage.sync.get('isEnabled', data => {
    if (data.isEnabled) {
      remove_hrefs();
    }
    else {
      put_hrefs_back();
    }
  });
});