let form = document.querySelector("#todo-form");
let todoInput = document.querySelector("#todo");
let todoList = document.querySelector(".list-group");
let filter = document.querySelector("#filter");
let clearButton = document.querySelector("#clear-todos");
let firstBody = document.querySelectorAll(".card-body")[0];
let secondBody = document.querySelectorAll(".card-body")[1];

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadTodosToUI);
    secondBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", deleteAllTodos);
}

function deleteAllTodos(e){
    if(confirm("Are you sure?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style", "display: none !important");
        }
        else{
            listItem.setAttribute("style", "display: block");
        }
    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Deleted successfully...");
    }
}

function deleteTodoFromStorage(deletedTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index){
        if(todo === deletedTodo){
            todos.splice(index,1);
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    let newTodo = todoInput.value.trim();
    if(newTodo == ""){
        showAlert("danger", "Please enter a todo");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Process completed");
    }

    e.preventDefault();
}


function showAlert(type, text){
    let message = document.createElement("div");

    message.className = "alert alert-" + type;
    message.appendChild(document.createTextNode(text));
    form.appendChild(message);

    setTimeout(function (){
        message.remove();
    }, 1000);
}

function addTodoToUI(newTodo){
    let listItem = document.createElement("li");
    let link = document.createElement("a");

    listItem.className = "list-group-item d-flex justify-content-between";
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);

    todoInput.value = "";
}

function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}