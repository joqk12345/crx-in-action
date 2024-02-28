document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('convertButton').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab) {
        chrome.runtime.sendMessage({ tabId: tab.id });
      } else {
        console.error('Unable to get current tab information.');
      }
    });
  });
});
