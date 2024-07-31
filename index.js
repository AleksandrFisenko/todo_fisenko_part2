(() => {
  const ENTER = "Enter";
  const ESCAPE = "Escape";
  const TASK_PER_PAGE = 5;
  const DOUBLE_CLICK = 2;
  // const BASE_URL = "http://localhost:8080/";
  const BASE_URL = "https://api.t4.academy.dunice-testing.com/"
  const PATH = "todos";

  const inputTaskName = document.querySelector("#input-name");
  const buttonAdd = document.querySelector("#button-add-todo");
  const selectAll = document.querySelector("#select-all");
  const taskList = document.querySelector("#task-list");
  const buttonDeleteAll = document.querySelector("#button-delete");
  const filterContainer = document.querySelector("#filter-container");
  const paginationContainer = document.querySelector("#pagination-container");

  let taskArray = [];
  let filterType = "all";
  let currentPage = 1;

  async function getAllTasks() {
    await fetch(BASE_URL + PATH, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        taskArray = json;
        currentPage = Math.ceil(taskArray.length / TASK_PER_PAGE);
        render();
      });
  }

  async function postTask(task) {
    await fetch(BASE_URL + PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: task }),
    })
      .then((response) => response.json())
      .then((json) => {
        taskArray.push(json);
        currentPage = Math.ceil(taskArray.length / TASK_PER_PAGE);
        render();
      });
  }

  async function deleteTask(id) {
    try {
      const response = await fetch(`${BASE_URL}${PATH}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const json = await response.json();

      taskArray = taskArray.filter((task) => task.id != id);
      render();
    } catch (error) {
      getAllTasks();
      renderError(error.message);
    }
  }
  
  async function deleteAllChecked() {
    try {
      const response = await fetch(`${BASE_URL}${PATH}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const json = await response.json();

      taskArray = taskArray.filter((task) => !task.isChecked);
      render();
    } catch (error) {
      getAllTasks();
      renderError(error.message);
    }
  }

  async function checkAllTasks(status) {
    try {
      const response = await fetch(`${BASE_URL}${PATH}`, {
        method: "PUT",
        body: JSON.stringify({ status: status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const json = await response.json();

      taskArray.forEach((task) => {
        task.isChecked = status;
      });
      render();
    } catch (error) {
      getAllTasks();
      renderError(error.message);
    }
  }

  async function editTaskById(id, objUpdateTodo) {
    try {
      const response = await fetch(`${BASE_URL}${PATH}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objUpdateTodo),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message);
      }

      const json = await response.json();

      taskArray.forEach((task) => {
        if (task.id == json.id) {
          task.text = json.text;
          task.isChecked = json.isChecked;
        }
      });
      render();
    } catch (error) {
      getAllTasks();
      renderError(error.message);
    }
  }

  const renderError = (error) => {
    let errorElement = document.querySelector(".error");
    if (errorElement !== null) {
      errorElement.remove();
    }
    errorElement = document.createElement("div");
    errorElement.className = "error";
    errorElement.innerHTML = error;
    inputTaskName.after(errorElement);
    setTimeout(() => {
      errorElement.remove();
    }, 2000);
  };

  const isTextValid = (inputText) => {
    return inputText.trim() !== "";
  };

  const addTask = () => {
    if (isTextValid(inputTaskName.value)) {
      postTask(inputTaskName.value.replace(/ +/g, " ").trim());

      inputTaskName.value = "";

      filterType = "all";

      Array.from(filterContainer.children).forEach((element) => {
        element.className = "bottom-menu-unselected";
      });
      filterContainer.children[0].className = "bottom-menu-selected";

      render();
    }
  };

  const addTaskOnKeydown = (event) => {
    if (event.key == ENTER) addTask();
  };

  const handleClick = (event) => {
    const clickedItemName = event.target.classList.value;
    const taskId = event.target.parentElement.id;
    if (clickedItemName === "todo-delete") {
      deleteTask(event.target.parentElement.id);
      render();
    }
    if (clickedItemName === "todo-checkbox") {
      editTaskById(
        taskId,
        {isChecked: event.target.checked}
      );
      render();
    }
    if (event.detail === DOUBLE_CLICK && clickedItemName === "todo-text") {
      event.target.hidden = true;
      event.target.previousElementSibling.hidden = false;
      event.target.previousElementSibling.focus();
    }
  };

  const saveTask = (event) => {
    if (isTextValid(event.target.value)) {
      const taskId = event.target.parentElement.id;
      const replacedValue = event.target.value.replace(/ +/g, " ").trim();
      if (event.target.nextElementSibling.textContent !== event.target.value.trim()) {
        editTaskById(
          taskId,
          {text: replacedValue},
        );
        render();
      }
      render();
    } else render();
  };

  const editTask = (event) => {
    if (event.target.className === "todo-input") {
      if (event.key === ENTER) saveTask(event);
      if (event.key === ESCAPE) render();
    }
  };

  const onEditingTaskBlure = (event) => {
    if (event.target.className === "todo-input" && event.sourceCapabilities)
      saveTask(event);
  };

  const changeCheckAll = (event) => {
    if (taskArray.length) checkAllTasks(event.target.checked);
    render();
  };

  const deleteAllCheckedTasks = () => {
    if(taskArray.length && taskArray.some(task => task.isChecked)) deleteAllChecked();
    render();
  };

  const filterTasks = (event) => {
    if (event.target.className === "bottom-menu-unselected") {
      currentPage = 1;
      Array.from(event.target.parentElement.children).forEach((element) => {
        element.className = "bottom-menu-unselected";
      });
      event.target.className = "bottom-menu-selected";
      filterType = event.target.id;
    }
    render();
  };

  const getFilteredArray = () => {
    if (filterType === "complited") {
      return taskArray.filter((task) => task.isChecked);
    } else if (filterType === "active") {
      return taskArray.filter((task) => !task.isChecked);
    } else {
      return taskArray;
    }
  };

  const updateCheckAll = () => {
    selectAll.checked =
      taskArray.every((task) => task.isChecked) && taskArray.length;
  };

  const updateFilterContainer = () => {
    const selectedCount = taskArray.filter((task) => task.isChecked).length;
    filterContainer.children[0].firstChild.data = `All (${taskArray.length})`;
    filterContainer.children[1].firstChild.data = `Active (${
      taskArray.length - selectedCount
    })`;
    filterContainer.children[2].firstChild.data = `Completed (${selectedCount})`;
  };

  const getCurrentPage = () => {
    const filteredArray = getFilteredArray();
    const currentMinLength = (currentPage - 1) * TASK_PER_PAGE;
    if (currentMinLength >= filteredArray.length && filteredArray.length)
      currentPage--;
    const endIndex = currentPage * TASK_PER_PAGE;
    const startIndex = endIndex - TASK_PER_PAGE;
    return filteredArray.slice(startIndex, endIndex);
  };

  const switchPage = (event) => {
    if (event.target.className === "page-number-unselected") {
      currentPage = parseInt(event.target.id);
      render();
    }
  };

  const renderPagination = () => {
    let paginationElements = "";
    for (
      let i = 0;
      i < Math.ceil(getFilteredArray().length / TASK_PER_PAGE);
      i++
    ) {
      paginationElements += `
    <button 
    class="${
      currentPage == i + 1 ? "page-number-selected" : "page-number-unselected"
    }"
    id="${i + 1}">
    ${i + 1}
    </button>`;
    }
    paginationContainer.innerHTML = paginationElements;
  };

  const render = () => {
    taskList.innerHTML = "";
    const renderArray = getCurrentPage();
    updateCheckAll();
    updateFilterContainer();
    renderPagination();

    renderArray.forEach((task) => {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.id = task.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = task.isChecked;
      li.appendChild(checkbox);

      const input = document.createElement("input");
      input.className = "todo-input";
      input.maxLength = 255;
      input.hidden = true;
      input.value = task.text;
      li.appendChild(input);

      const div = document.createElement("div");
      div.className = "todo-text";
      div.textContent = task.text;
      li.appendChild(div);

      const button = document.createElement("button");
      button.className = "todo-delete";
      button.textContent = "X";
      li.appendChild(button);

      taskList.appendChild(li);
    });
  };

  getAllTasks();

  buttonAdd.addEventListener("click", addTask);
  inputTaskName.addEventListener("keydown", addTaskOnKeydown);
  taskList.addEventListener("click", handleClick);
  taskList.addEventListener("keydown", editTask);
  taskList.addEventListener("blur", onEditingTaskBlure, true);
  selectAll.addEventListener("change", changeCheckAll);
  buttonDeleteAll.addEventListener("click", deleteAllCheckedTasks);
  filterContainer.addEventListener("click", filterTasks);
  paginationContainer.addEventListener("click", switchPage);
})();
