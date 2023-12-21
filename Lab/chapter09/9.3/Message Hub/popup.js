function sendMessage() {
  const message = document.getElementById('messageInput').value;
  chrome.runtime.sendMessage({ type: 'send_message', data: message });
}
