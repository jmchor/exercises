let todos = document.getElementById("todos")
let todosHTML = ''
// piece of code to get todos from an API !

fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {


        // Here goes the array logic!
        // This should be repeated for each element of the array.
        todosHTML += `<div class="flex"> <div> <input type="checkbox"><strong> Title: </strong> <button onclick='printTitle("${element.title}")'> Click me </button>  </div> </div>`


        });
    })



function populateHTML(){
    todos.innerHTML = `${todosHTML}`
}

function printTitle(title)
{
    alert(title)
}