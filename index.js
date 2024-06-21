const ENTER = "Enter"
const ESCAPE = "Escape"
const TASK_PER_PAGE = 5

const inputTaskName = document.querySelector("#input-name")
const buttonAdd = document.querySelector("#button-add-todo")
const selectAll = document.querySelector("#select-all")
const taskList = document.querySelector("#task-list")
const buttonDeleteAll = document.querySelector("#button-delete")
const filterContainer = document.querySelector("#filter-container")

const paginationContainer = document.querySelector("#pagination-container")


let taskArray = []
taskArray.push(
    {
        id: Date.now(),
        name: "test1",
        isChecked: true,
    }
)
let filterType = "all"
let currentPage = 0

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

const editTask = (event) => {
  //console.log(event.key)
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

const filterTasks = (event) => {
  if(event.target.tagName === "BUTTON"){
    //console.log(event)
    Array.from(event.target.parentElement.children).forEach(element => {
      element.className = "bottom-menu-unselected"
    })
    event.target.className = "bottom-menu-selected"
    filterType = event.target.id
  }
  render()
}

const getFilteredArray = () => {
  if(filterType === "complited"){
    return taskArray.filter(task => task.isChecked)
  }else if(filterType === "active"){
    return taskArray.filter(task => !task.isChecked)
  } else{
    return taskArray
  }
}

const updateCheckAll = () => {
  selectAll.checked = taskArray.every(task => (task.isChecked)) && taskArray.length
}

const updateFilterContainer = () => {
  const selectedCount = taskArray.filter(task => task.isChecked).length;

  filterContainer.children[0].firstChild.data = `All (${taskArray.length})`
  filterContainer.children[1].firstChild.data = `Active (${taskArray.length - selectedCount})`
  filterContainer.children[2].firstChild.data = `Completed (${selectedCount})`
}

const getCurrentPage = () => {
  return getFilteredArray().slice(0, 5)
}

const renderPagination = () => {
  let paginationElements = ''
  for(let i=0; i < Math.ceil(getFilteredArray().length/TASK_PER_PAGE); i++){
    paginationElements += `
    <button 
    class="${(currentPage===i) ? "page-number-selected" : "page-number-unselected"}">
    ${i+1}
    </button>
    `
  }
  paginationContainer.innerHTML = paginationElements
}

const render = () => {
  let taskElement = ''
  updateCheckAll()
  updateFilterContainer()
  renderPagination()
  
  const renderArray = getCurrentPage()

  renderArray.forEach(task => {

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
}

render()

buttonAdd.addEventListener("click", addTask)

taskList.addEventListener("click", handleClick)
taskList.addEventListener("keydown", editTask)
taskList.addEventListener("focusout", onEditingTaskBlure)


selectAll.addEventListener("change", changeCheckAll)
buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks)

filterContainer.addEventListener("click", filterTasks)
//paginationContainer.addEventListener("click", switchPage)


// slice 