document.addEventListener('DOMContentLoaded', () => {
  // Get all checkboxes
  const socialAdsCheckbox = document.getElementById('socialAds');
  const marketingAdsCheckbox = document.getElementById('marketingAds');
  const popupsCheckbox = document.getElementById('popups');

  // Load saved settings
  chrome.storage.sync.get(
    {
      socialAds: true,
      marketingAds: true,
      popups: true
    },
    (items) => {
      socialAdsCheckbox.checked = items.socialAds;
      marketingAdsCheckbox.checked = items.marketingAds;
      popupsCheckbox.checked = items.popups;
    }
  );

  // Save settings when changed
  function saveSettings() {
    chrome.storage.sync.set({
      socialAds: socialAdsCheckbox.checked,
      marketingAds: marketingAdsCheckbox.checked,
      popups: popupsCheckbox.checked
    }, () => {
      // Notify content script about the changes
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'settingsUpdated',
          settings: {
            socialAds: socialAdsCheckbox.checked,
            marketingAds: marketingAdsCheckbox.checked,
            popups: popupsCheckbox.checked
          }
        });
      });
    });
  }

  // Add event listeners
  socialAdsCheckbox.addEventListener('change', saveSettings);
  marketingAdsCheckbox.addEventListener('change', saveSettings);
  popupsCheckbox.addEventListener('change', saveSettings);
}); 