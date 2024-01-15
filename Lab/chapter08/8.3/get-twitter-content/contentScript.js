
// contentScript.js
function extractTweets() {
  // 选择适当的推文元素
  const tweets = document.querySelectorAll('article:not(.processed-tweet)');

  for (let tweet of tweets) {
    // 假设推文的文本内容在 'div[data-testid="tweetText"]' 中
    const tweetText = tweet.querySelector('div[data-testid="tweetText"]');
    if (tweetText) {

      let clean_text = tweetText.textContent.replace(/(\r\n|\n|\r)/gm, " ");
      // console.log(clean_text);
      chrome.runtime.sendMessage({
        message: 'tts-content',
        data: {
          text: clean_text
        }
      }, function (response) {
        console.log('Received response from background script:', response);
      });


    }
    // 标记这个推文为已处理
    tweet.classList.add('processed-tweet');
  }
}

// 由于 Twitter 使用无限滚动，你可能需要设置一个观察者来监听新推文的加载
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      extractTweets();
    }
  }
});

// 监听页面的变化
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初始提取
extractTweets();
