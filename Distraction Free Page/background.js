// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  // Initialize default settings
  chrome.storage.sync.set({
    socialAds: true,
    marketingAds: true,
    popups: true
  });
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Notify content script to recheck the page
    chrome.tabs.sendMessage(tabId, {
      type: 'pageReload'
    });
  }
}); 