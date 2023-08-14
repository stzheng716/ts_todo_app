const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const todolist = document.querySelector("#todolist")!;


interface Todo {
    text: string,
    completed: boolean,
}

function readTodos(): Todo[] {
    const todosJSON = localStorage.getItem("todos")
    if (todosJSON === null) return [];
    return JSON.parse(todosJSON);

}

function saveTodos(): void {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const todos: Todo[] = readTodos();

todos.forEach(createTodo)

function handleSubmit(evt: SubmitEvent) {
    evt.preventDefault();

    const todo: Todo = {
        text: input.value,
        completed: false,
    }

    createTodo(todo)
    todos.push(todo)

    saveTodos()
    input.value = "";

}

function createTodo(todo: Todo): void {

    const newLI = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", function () {
        todo.completed = checkBox.checked;
        saveTodos();
    })

    newLI.append(todo.text);
    newLI.append(checkBox)

    todolist.append(newLI)
}

form.addEventListener("submit", handleSubmit)
