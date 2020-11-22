const readline = require('readline');
const fs = require('fs');

let todos = [];

const PATH_TO_TODOS_FILE = __dirname + '/../back-end/todos.json';
const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const displayMenu = function () {
  const menu = `
Your options are:

1. Add a todo.
2. Remove a todo.
3. Remove all completed todos.
4. Toggle a todo's completion status.
5. Toggle a todo's priority.
6. Quit.

`
  interface.question(menu, handleMenu);
}

const displayTodos = function () {
  console.log('\nHere are your current todos:\n')
  for (let i = 0; i < todos.length; i++) {
    console.log((`${i + 1}. ${todos[i].text} - Priority: ${todos[i].priority} ${todos[i].isComplete === true ? '✅' : `✖`}`))

  }
}

const add = function (answer) {
  const todo = {
    text: answer,
    priority: 2,
    isComplete: false,
  }

  todos.unshift(todo);
  saveTodos();
  console.clear()
  displayTodos();
  displayMenu();
}

const remove = function (num) {
  todos.splice(num - 1, 1);
  saveTodos();
  console.clear();
  displayTodos();
  displayMenu();
}

const toggleComplete = function (num) {
  const todo = todos[num - 1];
  if (todo.isComplete) {
    todo.isComplete = false;
  } else {
    todo.isComplete = true;
  }
  saveTodos();
  console.clear();
  displayTodos();
  displayMenu();
}

const togglePriority = function (num) {
  const i = num - 1;
  const todo = todos[i];
  todo.priority = todo.priority === 1 ? 2 : 1
  saveTodos();
  console.clear();
  displayTodos();
  displayMenu();
}

const removeCompletedTodos = function () {
  todos = todos.filter((todo) => todo.isComplete === false);

  saveTodos();
  console.clear();
  displayTodos();
  displayMenu();
}

const handleMenu = function (cmd) {
  if (cmd === '1') {
    console.clear();
    interface.question('\nWhat should go on your list? ', add)
  } else if (cmd === '2') {
    console.clear();
    displayTodos();
    interface.question('\nPlease pick a todo to remove: ', remove)
  } else if (cmd === '3') {
    removeCompletedTodos();
  } else if (cmd === '4') {
    console.clear()
    displayTodos();
    interface.question('\nPlease pick a todo to check complete or incomplete: ', toggleComplete)
  } else if (cmd === '5') {
    console.clear();
    displayTodos();
    interface.question('\nPlease pick a todo to toggle its priority: ', togglePriority)
  } else {
    console.log('Quitting!');
    interface.close();
  }
}


fs.readFile(PATH_TO_TODOS_FILE, (err, data) => {
  if (err) {
    console.log(err);
  }
  let obj = JSON.parse(data);
  todos = obj.todos
  displayTodos();
  displayMenu()
})


const saveTodos = () => {
  const obj = { todos: todos };
  const data = JSON.stringify(obj, null, 2);
  fs.writeFile(PATH_TO_TODOS_FILE, data, 'utf8', (err) => {
    if (err) {
      console.log(error);
      return;
    }
  })
}