// popup.js

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('injectButton').addEventListener('click', injectScript);
});

function injectScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];

    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: () => {
        console.log('Injected script!');
      },
    });
  });
}
