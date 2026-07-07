const tasks = [
    { id: 1, title: 'Review variables', completed: true },
    { id: 2, title: 'Practice functions', completed: false}
];
let modifiedTasks = [];
const baseId = '#persistent-task-list';
const modifiedId = '#modified-task-list';

const incompleteStatus = document.querySelector('#incomplete-status');

function addTask(tasks, title) {
    const ids = tasks.map(task => task.id);
    const newId = Math.max(...ids) + 1;
    return [...tasks, {
        id: newId,
        title,
        completed: false
    }];
}

function completeTask(tasks, taskId) {
    return tasks.map((task) => {
       if (task.id === taskId) {
           return {...task, completed: true};
       }
       return task;
    });
}

function removeTask(tasks, taskId) {
    return tasks.filter(task => task.id !== taskId);
}

function countIncompleteTasks(tasks) {
    return tasks.reduce((acc, task) => acc + (task.completed ? 0 : 1), 0);
}

function updateIncompleteTasks() {
    incompleteStatus.textContent = `There are ${countIncompleteTasks(tasks)} incomplete tasks in the base list`;
}

function buildTaskList(taskList, parentId) {
    const baseElement = document.querySelector(parentId);
    const taskElements = taskList.map((task) => {
       const element = document.createElement('li');
       element.textContent = `ID: ${task.id}. Title: ${task.title}, Completed: ${task.completed}`;
       return element;
    });
    baseElement.replaceChildren(...taskElements);
    updateIncompleteTasks();
}

buildTaskList(tasks, baseId);

const addTaskForm = document.querySelector('#add-task-form');
const taskTitleInput = document.querySelector('#task-title-input');
addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modifiedTasks = addTask(tasks, taskTitleInput.value)
    buildTaskList(modifiedTasks, modifiedId);
})

const completeTaskForm = document.querySelector('#complete-task-form');
const completeTaskIdInput = document.querySelector('#complete-task-id-input');
completeTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modifiedTasks = completeTask(tasks, Number(completeTaskIdInput.value));
    buildTaskList(modifiedTasks, modifiedId);
});

const removeTaskForm = document.querySelector('#remove-task-form');
const removeTaskIdInput = document.querySelector('#remove-task-id-input');
removeTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modifiedTasks = removeTask(tasks, Number(removeTaskIdInput.value))
    buildTaskList(modifiedTasks, modifiedId);
});

const commitButton = document.querySelector('#commit-button');
commitButton.addEventListener('click', (event) => {
    if (modifiedTasks.length === 0) {
        return;
    }
    tasks.length = 0;
    tasks.push(...modifiedTasks);
    buildTaskList(tasks, baseId);
    
    modifiedTasks.length = 0;
    buildTaskList(modifiedTasks, modifiedId);
});