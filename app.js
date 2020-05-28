//const validator=require('validator')
//console.log(validator.isEmail('tanyaexample.com'))
const chalk=require('chalk')
//console.log(chalk.green.bgRed.bold('Success!'))
const notes=require('./notes.js')
const yargs=require('yargs')

// Create add command

yargs.command({
    command:'add',
    description:'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        },

    },
    handler(argv){                               //1
        //console.log('Title : ',argv.title)
        //console.log('Body : ',argv.body)
        notes.addNote(argv.title,argv.body);
    }
})

// Create remove command

yargs.command({
    command:'remove',
    description:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv) =>{                         //2 -- shorthand
        //console.log('Removing note')
        notes.removeNote(argv.title)
    }
})

// List and read commands

yargs.command({
    command:'list',
    description:'List of all notes.',
    handler(){
        console.log(chalk.bold.cyanBright('LIST OF NOTES -'))
        notes.listNotes()
    }
})

yargs.command({
    command:'read',
    description:'Reading a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        console.log(chalk.inverse('Reading body of : '+ argv.title))
        notes.readNotes(argv.title)
    }
})

//console.log(process.argv)
//console.log(yargs.argv)
yargs.parse()

