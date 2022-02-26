const newTaskForm = document.getElementById('new-task-form');
const tasksList = document.getElementById('tasks-list');

let tasks = [];

const clearListView = () => {
  const children = [...tasksList.children];
  children.forEach((child) => {
    tasksList.removeChild(child);
  });
}

const updateListView = () => {
  console.log('updateListView', tasks);
  clearListView();

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.title;

    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Delete';
    buttonDelete.onclick = () => {
      handleDeleteClick(task);
    };
    listItem.appendChild(buttonDelete);

    const checkboxIsDone = document.createElement('input');
    checkboxIsDone.setAttribute('type', 'checkbox');
    checkboxIsDone.checked = task.isDone;
    checkboxIsDone.onchange = () => {
      handleCheckboxChange(task);
    }
    listItem.appendChild(checkboxIsDone);

    tasksList.appendChild(listItem);
  });
}

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('tasks');

  if (savedData === null) {
    return;
  }

  const parsedData = JSON.parse(savedData);
  tasks = parsedData;

  updateListView();
}

loadFromLocalStorage();

const saveToLocalStorage = () => {
  const parsedData = JSON.stringify(tasks);
  localStorage.setItem('tasks', parsedData);
}

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
    return task != targetTask;
  });
  tasks = filtered;

  saveToLocalStorage();
  updateListView();
}

const handleCheckboxChange = (targetTask) => {
  targetTask.isDone = !targetTask.isDone;

  saveToLocalStorage();
  updateListView();
}

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm);
  const formEntries = Object.fromEntries(formData);

  const newTask = {
    id: tasks.length,
    title: formEntries.title,
    description: formEntries.description,
    isDone: false
  }

  tasks.push(newTask);
  saveToLocalStorage();

  updateListView();
}

newTaskForm.addEventListener('submit', handleSubmit);





