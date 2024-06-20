const ENTER = "Enter"
const ESCAPE = "Escape"

const inputTaskName = document.querySelector("#input-name")
const buttonAdd = document.querySelector("#button-add-todo")
const selectAll = document.querySelector("#select-all")
const taskList = document.querySelector("#task-list")
const buttonDeleteAll = document.querySelector("#button-delete")

const buttonSortAll = document.querySelector("#button-sort-all")
const sortButtonActive = document.querySelector("#button-sort-active")
const sortButtonComplited = document.querySelector("#button-sort-complited")

let taskArray = []
taskArray.push(
    {
        id: Date.now(),
        name: "test1",
        isChecked: true,
    }
)

const addTask = () => {
  if(inputTaskName.value.trim() !== ""){
    const task = {
      id: Date.now(),
      name: inputTaskName.value,
      isChecked: false,
  }
  taskArray.push(task)
  inputTaskName.value = ""
  render()
  }
}

const handleClick = (event) => {
    const clickedItemName = event.target.classList.value
    const taskId = event.target.parentElement.id
    if (clickedItemName == "todo-delete") {
        taskArray = taskArray.filter(task => task.id != taskId)
        render()
    } 
    if(clickedItemName == "todo-checkbox"){
        taskArray.forEach(task => {
            if(taskId == task.id){
                task.isChecked = event.target.checked
            }
        })
        render()
    }
    if ((event.detail == 2) && (clickedItemName == "todo-text")) {

      event.target.hidden = true
      event.target.previousElementSibling.hidden = false
      event.target.previousElementSibling.focus()

    }
}

const editingTask = (event) => {
  console.log(event.key)
  if((event.key == ENTER) && (event.target.value.trim() !== "")){
    const taskId = event.target.parentElement.id
    
    taskArray.forEach(task => {
      if(task.id == taskId){
        task.name = event.target.value
      }
    })
    render()
  }
  if(event.key == ESCAPE){
    render()
  }
}

const onEditingTaskBlure = () => {
  render()
}

const changeCheckAll = (event) => {
    taskArray.forEach(task => {
        task.isChecked = event.target.checked
    })
    render()
}

const deleteAllCheckedTasks = () => {
    taskArray = taskArray.filter(task => task.isChecked != true)
    render()
}


const render = () => {
    let taskElement = ''
    let isAllSelected = (taskArray.length > 0)
    let checkedCount = 0

    taskArray.forEach(task => {
        if(!task.isChecked){
            isAllSelected = false
        }

        
        if(task.isChecked){
          checkedCount++
        }

        taskElement += `
        <li class="todo-item" id="${task.id}">
            <input type="checkbox" class="todo-checkbox" ${task.isChecked ? 'checked' : ''}>
            <input type="text" class="todo-input" hidden value="${task.name}"/>
            <div class="todo-text">${task.name}</div>
            <button class="todo-delete">X</button>
        </li>
        `
    })
    taskList.innerHTML = taskElement

    selectAll.checked = isAllSelected

    buttonSortAll.firstChild.data = `All (${taskArray.length})`
    sortButtonComplited.firstChild.data = `Completed (${checkedCount})`
    sortButtonActive.firstChild.data = `Active (${taskArray.length - checkedCount})`
    
}

render()

buttonAdd.addEventListener("click", addTask)

taskList.addEventListener("click", handleClick)
taskList.addEventListener("keydown", editingTask)
taskList.addEventListener("focusout", onEditingTaskBlure)


selectAll.addEventListener("change", changeCheckAll)
buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks)