// popup.js

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('speak').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];

      chrome.scripting
        .executeScript({
          target: { tabId: activeTab.id, allFrames: true },
          files: ["content.js"],
        })
        .then(() => console.log("script injected in all frames"));
    });
  });

  document.getElementById('stopButton').addEventListener('click', function () {
    chrome.tts.stop();
  });

  document.getElementById('pauseButton').addEventListener('click', function () {
    chrome.tts.pause();
  });

  document.getElementById('resumeButton').addEventListener('click', function () {
    chrome.tts.resume();
  });
});

