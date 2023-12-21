// 使用 IndexedDB
const dbName = 'myDB';
const dbVersion = 1;
let db;

function openDB() {
  const request = indexedDB.open(dbName, dbVersion);
  request.onupgradeneeded = function (event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('content', 'content', { unique: false });
  };
  request.onsuccess = function (event) {
    db = event.target.result;
  };
}

openDB();

// 处理消息传递
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'save_note') {
    const transaction = db.transaction(['notes'], 'readwrite');
    const objectStore = transaction.objectStore('notes');
    const request = objectStore.add({ content: message.data });
    request.onsuccess = function (event) {
      console.log('Note saved');
    };
  } else if (message.type === 'get_notes') {
    const transaction = db.transaction(['notes'], 'readonly');
    const objectStore = transaction.objectStore('notes');
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = function (event) {
      sendResponse({ notes: event.target.result });
    };
    return true; // 保持消息通道打开，以便在异步操作完成后发送响应
  }
});
