const ENTER = "Enter"
const ESCAPE = "Escape"
const TASK_PER_PAGE = 5
const DOUBLE_CLICK = 2

const inputTaskName = document.querySelector("#input-name")
const buttonAdd = document.querySelector("#button-add-todo")
const selectAll = document.querySelector("#select-all")
const taskList = document.querySelector("#task-list")
const buttonDeleteAll = document.querySelector("#button-delete")
const filterContainer = document.querySelector("#filter-container") // tab container 

const paginationContainer = document.querySelector("#pagination-container")


let taskArray = []

for(let i = 0; i<17; i++){
  taskArray.push(
    {
        id: i,
        name: `test ${i}`,
        isChecked: true,
    }
  )
}


let filterType = "all"
let currentPage = 1

// const taskArray  = Array.from({length: 10000}, ()=>{return { id: Date.now(), name: "111", isChecked: false}}); 

const isTextValid = (inputText) => {
  return (inputText.trim() !== "")
}

// add validation
const addTask = () => {
  if(isTextValid(inputTaskName.value)){
    const task = {
      id: Date.now(),
      name: inputTaskName.value,
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
  if(event.key == ENTER) addTask();
}

const handleClick = (event) => {
  //console.log(event)
  const clickedItemName = event.target.classList.value
  const taskId = event.target.parentElement.id
  if (clickedItemName === "todo-delete") {
    taskArray = taskArray.filter(task => task.id != taskId)
    render()
  } 
  if(clickedItemName === "todo-checkbox"){
    // forEach -> map
    taskArray.forEach(task => {
      if(taskId == task.id){
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
  if(isTextValid(event.target.value)){
    const taskId = event.target.parentElement.id

    taskArray.forEach(task => {
      if(task.id == taskId) task.name = event.target.value;
    })
    render()
  }
}

const editTask = (event) => {
  // console.log(event.key)
  if((event.key === ENTER)) saveTask(event);
  if(event.key == ESCAPE) render();
}

const onEditingTaskBlure = (event) => {
  saveTask(event)
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
  //console.log(event.target.className)
  if(event.target.className === "bottom-menu-unselected"){
    //console.log(event)
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
  if(filterType === "complited"){
    return taskArray.filter(task => task.isChecked)
  }else if(filterType === "active"){
    return taskArray.filter(task => !task.isChecked)
  } else{
    return taskArray
  }
}

// const qqqq = {
//   "all": taskArray,
//   "completed": taskArray.filter(task => task.isChecked),
//   "active" : taskArray.filter(task => !task.isChecked)
// }

// qqqq.all

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
  if(currentMinLength >= filteredArray.length) currentPage--;

  const endIndex = currentPage * TASK_PER_PAGE;
  const startIndex = endIndex - TASK_PER_PAGE
  //console.log(startIndex, endIndex, filteredArray.length)
  //console.log(getFilteredArray().slice(startIndex, endIndex))
  return filteredArray.slice(startIndex, endIndex)
}

const switchPage = (event) => {
  if(event.target.className === "page-number-unselected"){
    //console.log(event.target.id)
    currentPage = parseInt(event.target.id)
    render()
  }
}

const renderPagination = () => {
  let paginationElements = ''
  for(let i=0; i < Math.ceil(getFilteredArray().length/TASK_PER_PAGE); i++){
    //console.log(i+1, currentPage)
    paginationElements += `
    <button 
    class="${(currentPage==i+1) ? "page-number-selected" : "page-number-unselected"}"
    id="${i+1}">
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
inputTaskName.addEventListener("keydown", addTaskOnKeydown)

taskList.addEventListener("click", handleClick)
taskList.addEventListener("keydown", editTask)
taskList.addEventListener("focusout", onEditingTaskBlure)


selectAll.addEventListener("change", changeCheckAll)
buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks)

filterContainer.addEventListener("click", filterTasks)
paginationContainer.addEventListener("click", switchPage)

