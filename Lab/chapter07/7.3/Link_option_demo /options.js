// options.j
function saveOptions() {
  var username = document.getElementById('username').value;

  chrome.storage.sync.set({ 'username': username }, function () {
    console.log('Options saved');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveOptions);

  chrome.storage.sync.get('username', function (data) {
    if (data.username) {
      document.getElementById('username').value = data.username;
    }
  });
});
