document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions);
  restoreOptions();
});

function saveOptions() {
  var welcomeMessage = document.getElementById('welcomeMessage').value;
  chrome.storage.sync.set({
    welcomeMessage: welcomeMessage
  }, function () {
    alert('Options saved!');
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    welcomeMessage: 'Welcome to the extension!'
  }, function (items) {
    document.getElementById('welcomeMessage').value = items.welcomeMessage;
  });
}