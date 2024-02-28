var pageContent = document.body.innerText;
// console.log(pageContent);

var languageTag = document.documentElement.lang;
console.log(languageTag);
chrome.runtime.sendMessage({ message: 'speak', text: pageContent, languageTag: languageTag });