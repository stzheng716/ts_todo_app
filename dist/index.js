"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const todolist = document.querySelector("#todolist");
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
const todos = readTodos();
todos.forEach(createTodo);
function handleSubmit(evt) {
    evt.preventDefault();
    const todo = {
        text: input.value,
        completed: false,
    };
    createTodo(todo);
    todos.push(todo);
    saveTodos();
    input.value = "";
}
function createTodo(todo) {
    const newLI = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", function () {
        todo.completed = checkBox.checked;
        saveTodos();
    });
    newLI.append(todo.text);
    newLI.append(checkBox);
    todolist.append(newLI);
}
form.addEventListener("submit", handleSubmit);
