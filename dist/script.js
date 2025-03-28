"use strict";
console.log('hi');
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
let todos = [];
todos = [
    { id: 1, text: "Learn TypeScript", completed: false },
    { id: 2, text: "Build a To-Do list", completed: true },
    { id: 3, text: "Drink Coffee", completed: false },
];
let nextId = todos.length;
const renderTodos = () => {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        const listItemCompleted = todo.completed ? "Completed" : "Incomplete";
        listItem.textContent = `${listItemCompleted} - ${todo.text}`;
        const editItemButton = document.createElement('button');
        editItemButton.classList.add('button');
        editItemButton.innerHTML = "Edit";
        editItemButton.addEventListener("click", () => {
            editTodo(listItem, todo);
        });
        const deleteItemButton = document.createElement('button');
        deleteItemButton.classList.add('button');
        deleteItemButton.innerHTML = "Delete";
        deleteItemButton.addEventListener('click', () => {
            deleteTodo(index, todos);
        });
        listItem.appendChild(editItemButton);
        listItem.appendChild(deleteItemButton);
        todoList.appendChild(listItem);
    });
};
const addTodo = (todoText) => {
    const newTodoItem = {
        id: nextId++,
        text: todoText,
        completed: false,
    };
    todos.push(newTodoItem);
    renderTodos();
};
const deleteTodo = (index, todos) => {
    todos.splice(index, 1);
    renderTodos();
};
const editTodo = (listItem, todo) => {
    listItem.innerHTML = "";
    const editItemInput = document.createElement('input');
    const toggleCompleteItem = document.createElement('button');
    const saveEditItem = document.createElement('button');
    const cancelEditItem = document.createElement('button');
    editItemInput.type = "text";
    editItemInput.value = todo.text;
    toggleCompleteItem.innerHTML = todo.completed ? "Completed" : "Incomplete";
    toggleCompleteItem.classList.add('button');
    toggleCompleteItem.addEventListener("click", () => {
        todo.completed = !todo.completed;
        toggleCompleteItem.innerHTML = todo.completed ? "Completed" : "Incomplete";
    });
    saveEditItem.innerHTML = "Save";
    saveEditItem.classList.add('button');
    saveEditItem.addEventListener('click', () => {
        if (editItemInput.value) {
            todo.text = editItemInput.value;
        }
        renderTodos();
    });
    cancelEditItem.innerHTML = "Cancel";
    cancelEditItem.classList.add('button');
    cancelEditItem.addEventListener('click', () => {
        renderTodos();
    });
    listItem.appendChild(editItemInput);
    listItem.appendChild(toggleCompleteItem);
    listItem.appendChild(saveEditItem);
    listItem.appendChild(cancelEditItem);
};
// const doSomething = () => {...}
addButton.addEventListener('click', () => {
    const newText = todoInput.value.trim();
    if (newText) {
        addTodo(newText);
        todoInput.value = "";
    }
});
renderTodos();
