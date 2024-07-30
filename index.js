(() => {
  const ENTER = "Enter";
  const ESCAPE = "Escape";
  const TASK_PER_PAGE = 5;
  const DOUBLE_CLICK = 2;
  const BASE_URL = "http://localhost:8080/";
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
    await fetch(BASE_URL + PATH + `/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.status);
      })
      .then((json) => {
        if (json.result === "ok") {
          taskArray = taskArray.filter((task) => task.id != id);
          render();
        }
      })
      .catch((error) => {
        renderError(error);
      });
  }

  async function deleteAllChecked() {
    await fetch(BASE_URL + PATH, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.status);
      })
      .then((json) => {
        if (json.result === "ok") {
          taskArray = taskArray.filter((task) => !task.isChecked);
          render();
        }
      })
      .catch((error) => {
        renderError(error);
      });
  }

  async function checkAllTasks(status) {
    await fetch(BASE_URL + PATH + `?isChecked=${status}`, {
      method: "PUT",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((json) => {
        if (json.result === "ok") {
          taskArray.forEach((task) => {
            task.isChecked = status;
          });
          render();
        }
      })
      .catch((error) => {
        renderError(error);
      });
  }

  async function editTaskById(id, text, status) {
    await fetch(BASE_URL + PATH + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, isChecked: status }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((json) => {
        if (json.result === "ok") {
          taskArray.forEach((task) => {
            if (task.id == id) {
              task.text = text;
              task.isChecked = status;
            }
          });
          render();
        }
      })
      .catch((error) => {
        renderError(error);
      });
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

  const replaceSymbols = (inputString) => {
    return inputString
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const addTask = () => {
    if (isTextValid(inputTaskName.value)) {
      postTask(replaceSymbols(inputTaskName.value.replace(/ +/g, " ").trim()));

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
        event.target.nextElementSibling.value,
        event.target.checked
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
      const replacedValue = replaceSymbols(
        event.target.value.replace(/ +/g, " ").trim()
      );
      console.log(
        event.target.nextElementSibling.textContent,
        event.target.value
      );
      if (event.target.nextElementSibling.textContent !== event.target.value)
        editTaskById(
          taskId,
          replacedValue,
          event.target.previousElementSibling.checked
        );
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
    checkAllTasks(event.target.checked);
    render();
  };

  const deleteAllCheckedTasks = () => {
    deleteAllChecked();
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
    let taskElement = "";
    const renderArray = getCurrentPage();
    updateCheckAll();
    updateFilterContainer();
    renderPagination();
    renderArray.forEach((task) => {
      taskElement += `
      <li class="todo-item" id="${task.id}">
          <input type="checkbox" class="todo-checkbox" ${
            task.isChecked ? "checked" : ""
          }>
          <input class="todo-input" maxlength="256" hidden value="${
            task.text
          }"/>
          <div class="todo-text">${task.text}</div>
          <button class="todo-delete">X</button>
      </li>
      `;
    });
    taskList.innerHTML = taskElement;
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
