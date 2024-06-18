console.log(11)
console.log(12)
console.log(14)
console.log(16)

const result = document.getElementById("result")

const inputTodoName = document.getElementById("input-name")
const buttonAddTodo = document.getElementById("button-add-todo")


buttonAddTodo.onclick = function () {
    console.log(inputTodoName.value)
}