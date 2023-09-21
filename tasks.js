
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

const listArray = [
    {
      task_name: 'add',
    task_status: false
  },
  {
    task_name: 'delete',
    task_status: false
  },
  {
  task_name: 'edit',
  task_status: false
}



];



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
  process.exit();
}

/**
 * help the user to add new command
 *
 * @returns {void}
 */
  function help() {
    console.log('we have 2 commands \n hello to greeting you  \n  quit or exit to exit the application')
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
      listArray.push({task_name:command,task_status: true}) // push to array
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
      console.log(`Edited the last task: \n `+listArray[listArray.length - 1].task_name)
    } else if (dividing.length >= 3) {
      // If there are three or more dividing, parse the index and change the task
      const index = parseInt(dividing[1]);

      if (!isNaN(index) && index >= 1 && index <= listArray.length) {
        listArray[index - 1].task_name = dividing.slice(2).join(" ");
        console.log(`Edited task at index ${index} \n `+listArray[listArray.length - 1].task_name);
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
// The following line starts the application
startApp("Ali Kansoh")
