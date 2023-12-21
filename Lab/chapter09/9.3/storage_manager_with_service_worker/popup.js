
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('saveButton').addEventListener('click', saveNote);
  document.getElementById('loadButton').addEventListener('click', loadNotes);
});


function saveNote() {
  const note = document.getElementById('noteInput').value;
  chrome.runtime.sendMessage({ type: 'save_note', data: note });
}

function loadNotes() {
  chrome.runtime.sendMessage({ type: 'get_notes' }, function (response) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    response.notes.forEach(function (note) {
      const li = document.createElement('li');
      li.textContent = note.content;
      notesList.appendChild(li);
    });
  });
}
