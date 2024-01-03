chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.request === 'requestOptionalPermissions') {
    chrome.permissions.request({
      permissions: ['tabs', 'storage']
    }, (granted) => {
      if (granted) {
        console.log('Optional permissions granted.');
      } else {
        console.log('Optional permissions denied.');
      }
    });
  }
});
