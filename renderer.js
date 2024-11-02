const fs = require('fs');
const path = require('path');
const notesPath = path.join(__dirname, 'notes.json');

let notes = [];
let selectedNoteIndex = null; 

// Load notes 

function loadNotes() {
  if (fs.existsSync(notesPath)) {
    const data = fs.readFileSync(notesPath, 'utf-8');
    notes = JSON.parse(data);
  }
  renderNotesList();
}

// Save notes

function saveNotes() {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

// Render the list of notes

function renderNotesList() {
  const noteList = document.getElementById('note-list');
  noteList.innerHTML = '';

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note.content.slice(0, 20) + (note.content.length > 20 ? '...' : ''); // Show preview of note
    li.addEventListener('click', () => selectNote(index));
    noteList.appendChild(li);
  });
}

// Select a note to view or edit

function selectNote(index) {
  selectedNoteIndex = index;
  const note = notes[index];
  const noteContent = document.getElementById('note-content');
  noteContent.value = note.content;
}

// Save or update a note 

function saveNote() {
  const noteContent = document.getElementById('note-content').value.trim();

  if (noteContent === '') return; 

  if (selectedNoteIndex !== null) {
    
    // Update 
    
    notes[selectedNoteIndex].content = noteContent;
  } else {
    
    // New note
    
    const newNote = { content: noteContent };
    notes.push(newNote);
    selectedNoteIndex = notes.length - 1;
  }

  saveNotes();
  renderNotesList();
}

// Clear the selected note to create a new note

function createNewNote() {
  selectedNoteIndex = null;
  document.getElementById('note-content').value = '';
}

// Initialize the app

document.getElementById('save-button').addEventListener('click', saveNote);
loadNotes();
