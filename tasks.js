
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

var listArray=['hello','quit','help']



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
    console.log(`${i+1}-${listArray[i]}\n`);
  }
}

function add(text) {
    command =text.slice(4,text.length)
    if(command.trim().length!=0) {
      listArray.push(command)
      console.log(`added task ${command}`)
    }
    else console.log("no command")
}
// The following line starts the application
startApp("Ali Kansoh")
