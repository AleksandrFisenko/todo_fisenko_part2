(() => {
const ENTER = "Enter"
const ESCAPE = "Escape"
const TASK_PER_PAGE = 5
const DOUBLE_CLICK = 2

const inputTaskName = document.querySelector("#input-name")
const buttonAdd = document.querySelector("#button-add-todo")
const selectAll = document.querySelector("#select-all")
const taskList = document.querySelector("#task-list")
const buttonDeleteAll = document.querySelector("#button-delete")
const filterContainer = document.querySelector("#filter-container")
const paginationContainer = document.querySelector("#pagination-container")

let taskArray = []
let filterType = "all"
let currentPage = 1

const isTextValid = (inputText) => {
  return (inputText.trim() !== "")
}

const replaceSymbols = (inputString) => {
  return inputString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const addTask = () => {
  if (isTextValid(inputTaskName.value)) {
    const task = {
      id: Date.now(),
      name: replaceSymbols(inputTaskName.value.replace(/ +/g, ' ').trim()),
      isChecked: false,
    }
    taskArray.push(task)

    inputTaskName.value = ""

    filterType = "all"

    Array.from(filterContainer.children).forEach(element => {
      element.className = "bottom-menu-unselected"
    })
    filterContainer.children[0].className = "bottom-menu-selected"
    currentPage = Math.ceil(taskArray.length / TASK_PER_PAGE)

    render();
  }
}

const addTaskOnKeydown = (event) => {
  if (event.key == ENTER) addTask();
}

const handleClick = (event) => {
  const clickedItemName = event.target.classList.value
  const taskId = event.target.parentElement.id
  if (clickedItemName === "todo-delete") {
    taskArray = taskArray.filter(task => task.id != taskId)
    render()
  }
  if (clickedItemName === "todo-checkbox") {
    taskArray.forEach(task => {
      if (taskId == task.id) {
        task.isChecked = event.target.checked
      }
    })
    render()
  }
  if ((event.detail === DOUBLE_CLICK) && (clickedItemName === "todo-text")) {
    event.target.hidden = true
    event.target.previousElementSibling.hidden = false
    event.target.previousElementSibling.focus()
  }
}

const saveTask = (event) => {
  if (isTextValid(event.target.value)) {
    const taskId = event.target.parentElement.id
    event.target.value = replaceSymbols(event.target.value.replace(/ +/g, ' ').trim())
    taskArray.forEach(task => {
      if (task.id == taskId) task.name = event.target.value;
    })
    render()
  } else render();
}

const editTask = (event) => {
  if(event.target.className === "todo-input"){
    if ((event.key === ENTER)) saveTask(event);
    if (event.key === ESCAPE) render();
  }
}

const onEditingTaskBlure = (event) => {
  if (event.target.className === "todo-input" && event.sourceCapabilities) saveTask(event);
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
  if (event.target.className === "bottom-menu-unselected") {
    currentPage = 1
    Array.from(event.target.parentElement.children).forEach(element => {
      element.className = "bottom-menu-unselected"
    })
    event.target.className = "bottom-menu-selected"
    filterType = event.target.id
  }
  render()
}

const getFilteredArray = () => {
  if (filterType === "complited") {
    return taskArray.filter(task => task.isChecked)
  } else if (filterType === "active") {
    return taskArray.filter(task => !task.isChecked)
  } else {
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
  const filteredArray = getFilteredArray()
  const currentMinLength = (currentPage - 1) * TASK_PER_PAGE
  if (currentMinLength >= filteredArray.length && filteredArray.length) currentPage--;
  const endIndex = currentPage * TASK_PER_PAGE
  const startIndex = endIndex - TASK_PER_PAGE
  return filteredArray.slice(startIndex, endIndex)
}

const switchPage = (event) => {
  if (event.target.className === "page-number-unselected") {
    currentPage = parseInt(event.target.id)
    render()
  }
}

const renderPagination = () => {
  let paginationElements = ''
  for (let i = 0; i < Math.ceil(getFilteredArray().length / TASK_PER_PAGE); i++) {
    paginationElements += `
    <button 
    class="${(currentPage == i + 1) ? "page-number-selected" : "page-number-unselected"}"
    id="${i + 1}">
    ${i + 1}
    </button>`
  }
  paginationContainer.innerHTML = paginationElements
}

const render = () => {
  let taskElement = ''
  const renderArray = getCurrentPage()
  updateCheckAll()
  updateFilterContainer()
  renderPagination()
  renderArray.forEach(task => {

    taskElement += `
      <li class="todo-item" id="${task.id}">
          <input type="checkbox" class="todo-checkbox" ${task.isChecked ? 'checked' : ''}>
          <input class="todo-input" maxlength="256" hidden value="${task.name}"/>
          <div class="todo-text">${task.name}</div>
          <button class="todo-delete">X</button>
      </li>
      `
  })
  taskList.innerHTML = taskElement
}

buttonAdd.addEventListener("click", addTask)
inputTaskName.addEventListener("keydown", addTaskOnKeydown)
taskList.addEventListener("click", handleClick)
taskList.addEventListener("keydown", editTask)
taskList.addEventListener("blur", onEditingTaskBlure, true)
selectAll.addEventListener("change", changeCheckAll)
buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks)
filterContainer.addEventListener("click", filterTasks)
paginationContainer.addEventListener("click", switchPage)

})()