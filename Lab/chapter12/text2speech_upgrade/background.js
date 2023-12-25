// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'speak') {
    var languageTag = request.languageTag;
    console.log("get languageTag: " + languageTag);
    chrome.tts.getVoices(function (voices) {
      var suitableVoice;
      for (var i = 0; i < voices.length; i++) {
        // console.log(voices[i].lang)
        if (voices[i].lang.toLowerCase() === languageTag.toLowerCase()) {
          suitableVoice = voices[i];
          break;
        }

      }

      // Now suitableVoice contains the suitable voice for the webpage
      // You can now use suitableVoice to control TTS
      console.log(suitableVoice)

      if (suitableVoice == null) {
        chrome.tts.speak(request.text, { 'lang': 'zh-CN', 'rate': 1.0 });
      }
      chrome.tts.speak(request.text, { 'lang': suitableVoice.lang, 'rate': 1.0 });
    });


  }
});
