document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({
    welcomeMessage: 'Default welcome message'
  }, function (items) {
    document.getElementById('welcomeText').textContent = items.welcomeMessage;
  });
});