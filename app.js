//App always starts in app.js

const fs = require('fs');  //fetch contents of the fs module and store in
//const os = require('os');
const lodash = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe:'Title of the note',
  demand:true,
  alias:'t'
};

const bodyOptions = {
  describe:'Body of note',
  demand:true,
  alias: 'b'
};

const argv = yargs
.command('add', 'add notes',{
title: titleOptions,
body:bodyOptions
})
.command('list','List notes')
.command('read','Read a note',{
  title: titleOptions
})
.command('remove','Remove Notes',{
  title:titleOptions
})
.help()
.argv;
var command = argv._[0];
//Adding notes
if (command === 'add'){
  console.log('Adding new note');
  var note = notes.addNotes(argv.title,argv.body);
  if (note){
    console.log('Note created');
    notes.logNote(note);
  }else{
    console.log('Note already exists!');
  }
} else if(command === 'list'){

  var allNotes =  notes.getAll();
  console.log(`Printing ${allNotes.length} note(s )`);
  allNotes.forEach((note)=> notes.logNote(note));
} else if(command === 'read'){
  var note = notes.readNote(argv.title);
  if(note){
    notes.logNote(note);
}else{
    console.log("Note not found");
  }
} else if(command === 'remove'){
  console.log('Removing the note');
  var removeNote = notes.removeNote(argv.title);
  if (removeNote){
    console.log("Note was removed");
  }else{
    console.log("Note was not removed");
  }
} else{
  console.log("Command not recognised");
}
