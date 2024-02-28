chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.tabId) {
    chrome.scripting.executeScript({
      target: { tabId: message.tabId },
      function: convertToMP3
    }).then(() => {
      console.log('Script executed successfully.');
    }).catch(error => {
      console.error('Script execution failed:', error);
    });
  } else {
    console.error('Invalid tabId received.');
  }
});


function convertToMP3() {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance('你好，这是要转换成语音的文本。');
  const voices = synth.getVoices().filter(voice => voice.lang.startsWith('zh'));
  utterance.voice = voices[0];
  synth.speak(utterance);

  utterance.onend = function () {
    const audioContext = new AudioContext();
    const dest = audioContext.createMediaStreamDestination();
    utterance.connect(dest);

    const recorder = new MediaRecorder(dest.stream);
    let chunks = [];
    recorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_audio.mp3';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    recorder.start();
    setTimeout(() => {
      recorder.stop();
    }, 5000);
  };
}
