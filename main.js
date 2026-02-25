import { elFill, elWrite, $ } from "./module/helperFunction.js";
import {
  TaskManager,
  TaskCounter,
  TaskProgressBar,
  TaskProgressMessage,
} from "./module/taskClass.js";
const taskCtn = $("#task-ctn");
const taskInputForm = $("#task-input-form");

const manager = new TaskManager();
const taskCounter = new TaskCounter();
const taskProgressBar = new TaskProgressBar();
const taskProgressMsg = new TaskProgressMessage();
manager.addObs(taskCounter, taskProgressBar, taskProgressMsg);
renderTask();

// FORM ADD TASK EVENT
taskInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#task-input-form input");
  const value = input.value.trim();
  const msg = $("form .msg");

  if (!value) {
    msg.classList.add("isInvalid");
    elWrite(msg, "Please enter a task name!");
    setTimeout(() => {
      elWrite(msg, "");
      msg.classList.remove("isInvalid");
    }, 4000);
    return;
  }

  const newTask = { id: Date.now(), title: value, status: false };
  manager.addTask(newTask);
  input.value = "";
  renderTask();
});
// FORM CLEAN INPUT
taskInputForm.addEventListener("reset", (e) => {
  e.preventDefault();
  const input = $("#task-input-form input");
  const value = input.value.trim();

  if (value && value !== "") {
    input.value = "";
    renderTask();
  }
});
// CHECKBOX EVENT
taskCtn.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    const idTarget = e.target.closest("li").dataset.id;
    const isChecked = e.target.checked;

    const task = manager.taskList.find((task) => task.id === Number(idTarget));

    if (task) {
      task.status = isChecked;
      manager.dataSet();
    }
    renderTask();
  }
});
// DELETE BUTTON EVENT
taskCtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-btn")) {
    const idTarget = e.target.closest("li").dataset.id;
    const target = e.target.closest("li");

    const delTask = manager.taskList.find(
      (task) => task.id === Number(idTarget),
    );
    if (delTask) {
      target.classList.add("animated");
      setTimeout(() => {
        manager.removeTask(delTask);
        renderTask();
      }, 300);
    }
  }
});

function setupTaskList() {
  taskCtn.innerHTML = manager.taskList
    .map(
      (task) =>
        `<li class="task-item" data-id=${task.id}>
      <input type="checkbox" ${task.status ? "checked" : ""}/>
      <span> ${task.title} </span>
      <button class="del-btn"> ✕ </button>
      </li>`,
    )
    .join("");
}

function renderTask() {
  setupTaskList();
  console.log(manager.taskList);
  const completed = manager.taskList.filter((task) => task.status).length;
  manager.notify(completed);
  manager.showTotalTask();
}
