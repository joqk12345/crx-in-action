const onUpdate = (tabId, info, tab) => /^https?:/.test(info.url) && findTab([tab]);
findTab();
chrome.runtime.onConnect.addListener(port => {
  if (port.name === 'keepAlive') {
    setTimeout(() => port.disconnect(), 250e3);
    port.onDisconnect.addListener(() => findTab());
  }
});
async function findTab(tabs) {
  if (chrome.runtime.lastError) { /* tab was closed before setTimeout ran */ }
  for (const { id: tabId } of tabs || await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({ target: { tabId }, func: connect });
      chrome.tabs.onUpdated.removeListener(onUpdate);
      return;
    } catch (e) { }
  }
  chrome.tabs.onUpdated.addListener(onUpdate);
}
function connect() {
  chrome.runtime.connect({ name: 'keepAlive' })
    .onDisconnect.addListener(connect);
}

let age = 0;
setInterval(() => console.log(`Age: ${++age}s`), 1000);