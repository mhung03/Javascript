document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Vui lòng nhập công việc!");
        return;
    }

    let task = { text: taskText, completed: false };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTasks();
    input.value = "";
}

function renderTasks() {
    let tasks = getTasks();
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", function () {
            toggleTask(index);
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Sửa";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            editTask(index);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            deleteTask(index);
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function editTask(index) {
    let tasks = getTasks();
    let newTaskText = prompt("Nhập nội dung mới:", tasks[index].text);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        saveTasks(tasks);
        renderTasks();
    }
}

function loadTasks() {
    renderTasks();
}
