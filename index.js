const textarea = document.querySelector('textarea');
const addButton = document.getElementById('addButton');
const todoContainer = document.querySelector('.todoContainer');

let todoList = [];

function init() {
    if (!localStorage.getItem('todos')) {return;}
    todoList = JSON.parse(localStorage.getItem('todos')).todoList;
    updateUI();
}

init();

function addTodo() { 
    const todo = textarea.value;
    if (!todo) {return;}
    console.log('Added todo: ', todo);
    todoList.push(todo);
    textarea.value = '';
    updateUI();
}

function editTodo(index) {
    textarea.value = todoList[index];
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false;}
        return true;
    });

    updateUI();
}

function deleteTodo(index) {
    todoList = todoList.filter((element, elementIndex) => {
        if (index === elementIndex) {return false;}
        return true;
    });

    updateUI();
}

function updateUI() {
    let newInnerHTML = '';

    todoList.forEach((element, elementIndex) => {
        newInnerHTML += `
        <div class="todo">
            <p>${element}</p>
            <div class="buttonContainer">
                <button class="iconBtn" onclick="editTodo(${elementIndex})">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="iconBtn" onclick="deleteTodo(${elementIndex})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        `;
    });

    todoContainer.innerHTML = newInnerHTML;

    localStorage.setItem('todos', JSON.stringify({todoList}))
}

addButton.addEventListener('click', addTodo)