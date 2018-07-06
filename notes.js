const fs = require('fs');

var fetchNotes = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json'); //to store multiple notes
    return JSON.parse(noteString);

  }catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNotes = (title,body) => {
var notes = fetchNotes(); //to store
var note = {
  title : title,
  body
};



var duplicateNotes = notes.filter((note) =>  note.title === title); //to check duplicate notes
if (duplicateNotes.length === 0){
notes.push(note);
saveNotes(notes);
return note;
}
};

var getAll = () => {
  return fetchNotes();
};

var readNote = (title) =>{
 var notes = fetchNotes();
 var filteredNotes = notes.filter((note) => note.title === title);
 return filteredNotes[0];
};

var removeNote = (title) =>{
 var notes = fetchNotes();
 var filteredNotes = notes.filter((note) => note.title !== title);//save the array of remaining notes
 saveNotes(filteredNotes);

 return notes.length !== filteredNotes.length;
};

var logNote = (note) =>{
  console.log('-----------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNotes,
  getAll,
  readNote,
  removeNote,
  logNote
};
