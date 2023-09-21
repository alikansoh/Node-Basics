
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
const fs = require('fs');
let listArray=[]
fs.readFile("./database.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading file from disk:", err);
    return;
  }
  try {
    listArray = JSON.parse(jsonString);

  } catch (err) {
    console.log("Error parsing JSON string:", err);
  }
});

function onDataReceived(text) {


  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if((text.slice(0,5))==='hello'){
    hello(text);
  }

  else if((text.slice(0,4))==='list'){
    list();
  }
  else if((text.slice(0,3))==='add'){
    add(text);
  }

  else if((text.slice(0,6))==='remove'){
    remove(text);
  }

  else if((text.slice(0,4))==='edit'){
    edit(text);
  }

  else if((text.slice(0,5))==='check'){
    check(text);
  }

  else if((text.slice(0,7))==='uncheck'){
    uncheck(text);
  }
  else if(text === 'help\n') {
    help();
  }

  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello or hello with name  *
 * @returns {void}
 */
function hello(name){
  newname=name.trim()+"!"
console.log(newname)

}


/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  const jsonArray = JSON.stringify(listArray);

  fs.writeFileSync('database.json', jsonArray, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('JSON data has been saved to myArray.json');
    }
  });


  process.exit();
}

/**
 * help the user to add new command
 *
 * @returns {void}
 */
  function help() {
    console.log(`we have ${listArray.length} commands 
 hello to greeting you  
  quit or exit to exit the application list to list all commands delete to delete command edit to edit command check to make it done and uncheck to undone`)
  }

function list() {
  console.log("list of commands")
  for(let  i=0; i<listArray.length; i++) {
    console.log(`${i+1}-${listArray[i].task_name}\n`);
  }
}
//add command to list array
function add(text) {
   let command =text.slice(4,text.length)

    if(command.trim().length!==0) { // if command is empty
      listArray.push({task_name:command,done: true}) // push to array
      console.log(`added task ${command}`)
    }
    else console.log("no command")
}

// remove command from list
function remove(text) {
   let index =parseInt(text.slice(7,text.length).trim()) //get index from string
  if(index<=0 || index>=listArray.length+1){
    console.error("you entered invalid index") // error if index is not exist
  }else {
  listArray.splice(index - 1, 1); //delete the task using the index
  list() // showing the list again
  }
}
//edit command  from list
function edit(text) {
  const dividing = text.trim().split(" ");

  // Check if the first word is "edit"
  if (dividing[0].toLowerCase() === "edit") {
    if (dividing.length === 1) {
      console.log("Error: Please provide an index and new text.");
    } else if (dividing.length === 2) {
      // If there are two dividing, change the last task
      listArray[listArray.length - 1].task_name = dividing[1];
      console.log(`Edited the last task: \n ` + listArray[listArray.length - 1].task_name)
    } else if (dividing.length >= 3) {
      // If there are three or more dividing, parse the index and change the task
      const index = parseInt(dividing[1]);

      if (!isNaN(index) && index >= 1 && index <= listArray.length) {
        listArray[index - 1].task_name = dividing.slice(2).join(" ");
        console.log(`Edited task at index ${index} \n ` + listArray[listArray.length - 1].task_name);
      } else {
        console.log("Invalid index. Task not edited.");
      }
    } else {
      console.log("Error: Invalid input.");
    }
  } else {
    console.log("Invalid command.");
  }
}
function check(text) {
  let index = parseInt(text.slice(6, text.length).trim())
  if (text.length <= 6)
    console.error("you entered invalid index") // error if index is not exist

  else {
    listArray[index].done = true
    console.log(listArray[index].done)
  }
}
  function uncheck(text) {
    let index = parseInt(text.slice(8, text.length).trim())
    if (text.length <= 8)
      console.error("you entered invalid index") // error if index is not exist

    else {
      listArray[index].done = false
      console.log(listArray[index].done)    }
  }
// The following line starts the application
startApp("Ali Kansoh")
