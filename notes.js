const fs=require('fs')
const chalk=require('chalk')


//add
const addNote=(title,body) =>
{
    const notes=loadNotes();
    // check weather title is present or not
    //const duplicateNotes=notes.filter((note) => note.title === title)
     // filter function goes through each object 
     //brek once fuplicate is found
     const duplicateNote=notes.find((note) => note.title === title)

    // debugger - run node --inspect-break app.js __  , then inspect on chrome://inspect

    if(!duplicateNote) //duplicateNote===undefined
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    }
    else{
        console.log(chalk.red('Note title present!'))
    }
}

//remove
const removeNote=(title)=>
{
    const notes=loadNotes()
    const notesToKeep=notes.filter((note) => note.title !== title)// filter function goes through each object //array notes to keep
       
    if(notes.length>notesToKeep.length)
        console.log(chalk.green('Note Removed!'))
    else
        console.log(chalk.red.inverse('No such title present!'))
    saveNotes(notesToKeep)
}

//list
const listNotes=() => {
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}

//read
const readNotes = (title) => {
    const notes=loadNotes()
    const note=notes.find((note) => note.title === title)
    if(note){
        console.log(note.body)
    }
    else{
        console.log("No such title found to read")
    }
}

// save 
const saveNotes=(notes) => {
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

//load
const loadNotes=() => {

    try{
    const dataBuffer=fs.readFileSync('notes.json')
    const dataJSON=dataBuffer.toString();
    return JSON.parse(dataJSON)
    }
    catch(e)
    {
        return []
    }
}

module.exports = {
    
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNotes:readNotes

}