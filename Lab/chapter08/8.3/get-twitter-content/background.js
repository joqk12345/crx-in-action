
// const endpoint = "http://localhost:8000/api/process"
const endpoint = "https://content3ai.com/api/process"

// 在 background.js 中接收来自 content script 的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Received message from content script:', request);
  console.log(request['data']['text']);
  req = { request_id: "test_1" }
  data = {
    text: request['data']['text'],
    sample_rate: 24000,
    enable_detail_info: false,
    format: "mp3",
    voice: "zh-CN-XiaoyiNeural",
    gender: "Female",
    rate: "+0%",
    volume: "+0%",
    segments: "string",
    enable_vtt: false
  }
  req["data"] = data
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(req)
  }).then(response => {
    console.log(response);
    return response.json();
  }).then(data => {
    console.log(data);
    if (data.err_num == 0) {
      console.log(data.audio_url);
      const randomLetters = generateRandomLetters();
      filename = randomLetters + ".mp3";
      try {
        const downloadItem = chrome.downloads.download({
          url: data.audio_url,
          filename: filename,
          saveAs: false // 是否弹出文件另存为对话框（true为弹出，false为直接下载）
        });
        console.log('Download started with ID:', downloadItem);
        sendResponse({ received: true, message: 'Message received in background script' });
      } catch (error) {
        console.error('Download failed:', error);
      }
    } else {
      sendResponse({ received: false, message: 'Message received in background script' });
    }
  }).catch(error => {
    console.log(error);
  })
  // 这里只是一个简单的示例，你可以根据需要进行更多处理

  // 发送响应到 content script（如果需要）
  sendResponse({ received: true, message: 'Message received in background script' });
});


function generateRandomLetters() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters.charAt(randomIndex);
  }

  return result;
}