const fs = require('fs')

switch (process.argv[2]) {
    case 'add':
        add()
        break;
    case 'read':
        read()
        break;
    case 'remove':
        remove()
        break;
    case 'list':
        list()
        break;
    default:
        help();
}

function list(){
    let arr = JSON.parse(fs.readFileSync('todos.json').toString())    
    console.log(`Printing ${arr.length} note(s)\n`)

    arr.forEach(todo => {
        console.log(`Title: ${todo.Title}`)
        console.log(`Body: ${todo.Body} \n`)
    });
}

function remove(){
    let title = ''

    let titleIndex = process.argv.findIndex(el => el === '--title')
    if(titleIndex === -1 || process.argv[titleIndex + 1] === undefined){
        console.log('Options:\n')
        console.log('help Show Help')
        console.log('--title Title of note')
        console.log('\n Missing required arguments: title')
        return
    }else{
        title = process.argv[titleIndex + 1]
        let arr = JSON.parse(fs.readFileSync('todos.json').toString())
        let indexTodo = arr.findIndex(el => el.Title === title)
        if(indexTodo === -1){
            console.log('Note not found')
        }else {
            arr.splice(indexTodo, 1)
            fs.writeFileSync('todos.json', JSON.stringify(arr))
            console.log('Note was removed')
        }
    }
}


function read(){
    let title = ''

    let titleIndex = process.argv.findIndex(el => el === '--title')
    if(titleIndex === -1 || process.argv[titleIndex + 1] === undefined){
        console.log('Options:\n')
        console.log('help Show Help')
        console.log('--title Title of note')
        console.log('\n Missing required arguments: title')
        return
    }else{
        title = process.argv[titleIndex + 1]
        let arr = JSON.parse(fs.readFileSync('todos.json').toString())
        let todo = arr.filter(el => el.Title === title)

        if(todo.length === 0 ){
            console.log('Note not found!!')
        }else{
            console.log('--\n Title: ' + todo[0].Title)
            console.log('\n Body: ' + todo[0].Body)
        }
     
    }
}


function add(){
    let newTodo = {}

    let titleIndex = process.argv.findIndex(el => el === '--title')
    if(titleIndex === -1 || process.argv[titleIndex + 1] === undefined){
        console.log('Options:\n')
        console.log('help Show Help')
        console.log('--title Title of note')
        console.log('--body Body of note')
        return
    }else{
        newTodo.Title = process.argv[titleIndex + 1]
    }

    let bodyIndex = process.argv.findIndex(el => el === '--body')
    if(bodyIndex === -1 || process.argv[bodyIndex + 1] === undefined){
        console.log('Options:\n')
        console.log('help Show Help')
        console.log('--title Title of note')
        return
    }else{
        newTodo.Body = process.argv[bodyIndex + 1]
    }
    let arr = JSON.parse(fs.readFileSync('todos.json').toString())
    fs.writeFileSync('todos.json', JSON.stringify(arr.concat(newTodo)))
    console.log('\n Note Created \n')
    console.log('Title:' + newTodo.Title)
    console.log('Body:' + newTodo.Body)
}

function help(){
    console.log('add \t\t\t\t to add a note')
    console.log('remove \t\t\t\t to delete a note')
    console.log('read \t\t\t\t to read a note')
    console.log('list \t\t\t\t to list all notes')
}