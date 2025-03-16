// Ad blocking rules
const rules = {
  socialAds: {
    selectors: [
      '[data-ad-type="social"]',
      '[class*="sponsored"]',
      '[class*="social-ad"]',
      '[aria-label*="sponsored"]',
      '[data-testid*="sponsored"]',
      'div[role="complementary"]',
      '.fb-ad',
      '.twitter-timeline',
      '.instagram-media'
    ]
  },
  marketingAds: {
    selectors: [
      '[class*="ad-"]',
      '[class*="advertisement"]',
      '[id*="google_ads"]',
      '[id*="banner"]',
      'ins.adsbygoogle',
      '.ad-container',
      '.ad-wrapper',
      '[data-ad]',
      'iframe[src*="doubleclick"]',
      'iframe[src*="ads"]'
    ]
  },
  popups: {
    selectors: [
      '[class*="popup"]',
      '[class*="modal"]',
      '[class*="overlay"]',
      '[role="dialog"]',
      '.newsletter-signup',
      '#subscribe-popup',
      '[class*="lightbox"]'
    ]
  }
};

// Store the current settings
let currentSettings = {
  socialAds: true,
  marketingAds: true,
  popups: true
};

// Function to remove elements based on selectors
function removeElements(selectors) {
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.style.display = 'none';
    });
  });
}

// Main function to block ads
function blockAds() {
  if (currentSettings.socialAds) {
    removeElements(rules.socialAds.selectors);
  }
  if (currentSettings.marketingAds) {
    removeElements(rules.marketingAds.selectors);
  }
  if (currentSettings.popups) {
    removeElements(rules.popups.selectors);
  }
}

// Create a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  blockAds();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'settingsUpdated') {
    currentSettings = message.settings;
    blockAds();
  }
});

// Load settings and initialize
chrome.storage.sync.get(
  {
    socialAds: true,
    marketingAds: true,
    popups: true
  },
  (items) => {
    currentSettings = items;
    blockAds();
  }
); 