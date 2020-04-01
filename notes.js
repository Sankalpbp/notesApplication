const fs = require('fs');
const chalk = require('chalk');


const addNote = (title, body) => {
    const notes = loadNotes();

    // filter all the duplicacies that are there
    // but as the code is designed to avoid the duplicates in the first palce
    // there won't be more than one duplicate
    // so, filter will do unnecessary work
    // const duplicateNotes = notes.filter((note) => (note.title === title));

    // so, we use find function
    const duplicateNote = notes.find((note) => note.title === title);

    // if(duplicateNotes.length === 0) {

    if(duplicateNote === undefined) {
        // push the note(javascript object) to the notes.
        notes.push({
            title: title,
            body: body,
        });

        // save it onto the fileSystem
        saveNotes(notes);
        console.log("New Note added");
    } else {
        console.log("Note title taken!");
    }
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => (note.title !== title));
    
    if(notesToKeep.length === notes.length) {
        console.log(chalk.black.bgRed('No note found'));
   
    } else {
        console.log(chalk.black.bgGreen('Note Removed.'));
        saveNotes(notesToKeep);
    }
};

const saveNotes = (notes) => {
    // for storing stuffo on the file system. we gotta stringify it
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);    
    } catch(e) {
        // at the end of the day
        // we are essentially sending an array of different
        // properties and their values. So, we can send an empty array as the output
        // if there is no file like this
        return [];
    }
}

const listNotes = () => {
    console.log(chalk.yellowBright('Your notes: '));
    const notes = loadNotes();
    
    notes.forEach((note) => {
        console.log(note.title);
    });
};

const readNote = (title) => {

    const notes = loadNotes();

    const noteToRead = notes.find((note) => note.title === title);

    if(noteToRead === undefined) {
        console.log(chalk.red("No such node is there."));
    } else {
        console.log(chalk.bold.bgYellow(noteToRead.title));
        console.log(noteToRead.body);
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};
