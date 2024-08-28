// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
}

// Create task element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button onclick="removeTask(this)">✖</button>
    `;
    li.addEventListener('click', () => li.classList.toggle('completed'));
    taskList.appendChild(li);
}

// Remove task function
function removeTask(button) {
    const taskItem = button.parentElement;
    const taskText = taskItem.querySelector('span').textContent; // Get task text
    taskItem.remove();
    removeTaskFromLocalStorage(taskText); // Remove from storage
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => createTaskElement(taskText));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText); // Remove the specific task
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
