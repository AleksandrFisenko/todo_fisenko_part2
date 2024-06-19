const inputTaskName = document.querySelector("#input-name")
const buttonAdd = document.querySelector("#button-add-todo")
const selectAll = document.querySelector("#select-all")
const taskList = document.querySelector("#task-list")
const buttonDeleteAll = document.querySelector("#button-delete")


const ButtonSortAll = document.querySelector("#button-sort-all")
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
    //console.log(inputTaskName.value)
    const task = {
        id: Date.now(),
        name: inputTaskName.value,
        isChecked: false,
    }
    taskArray.push(task)
    //console.log(task.id)
    render()
}

const handleClick = (event) => {
    console.log(event)
    const clickedItamName = event.target.classList.value
    const taskId = event.target.parentElement.id
    if (clickedItamName == "todo-delete") {
        taskArray = taskArray.filter(task => task.id != taskId)
    } 
    if(clickedItamName == "todo-checkbox"){
      taskArray.forEach(task => {
        if(taskId == task.id){
          task.isChecked = event.target.checked
        }
      })
    }
    

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

    taskArray.forEach(task => {
        //console.log(task.name)

        taskElement += `
        <li class="todo-item" id="${task.id}">
            <input type="checkbox" class="todo-checkbox" ${task.isChecked ? 'checked' : ''} class="todo-checkbox">
            <div class="todo-text">${task.name}</div>
            <button class="todo-delete">X</button>
        </li>
        `
        
    })
    taskList.innerHTML = taskElement
}

buttonAdd.addEventListener("click", addTask)
taskList.addEventListener("click", handleClick)

selectAll.addEventListener("change", changeCheckAll)
buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks)


//sortButtonAll.addEventListener("click",)
//sortButtonActive.addEventListener("click",)
//sortButtonComplited.addEventListener("click",)