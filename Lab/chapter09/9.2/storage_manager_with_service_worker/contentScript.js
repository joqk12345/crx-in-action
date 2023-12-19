chrome.runtime.sendMessage({ type: 'get_notes' }, function (response) {
  console.log('Content Script received notes:', response.notes);
});