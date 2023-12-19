
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveButton').addEventListener('click', saveNote);
  document.getElementById('loadButton').addEventListener('click', loadNotes);
});


function saveNote() {
  const note = document.getElementById('noteInput').value;
  chrome.storage.sync.get(['notes'], function (result) {
    const notes = result.notes || [];
    notes.push(note);
    chrome.storage.sync.set({ 'notes': notes }, function () {
      console.log('Note saved');
    });
  });
}

function loadNotes() {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';
  chrome.storage.sync.get(['notes'], function (result) {
    const notes = result.notes || [];
    notes.forEach(function (note, index) {
      const li = document.createElement('li');
      li.textContent = note;
      notesList.appendChild(li);
    });
  });
}
