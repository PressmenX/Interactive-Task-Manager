import { elFill, elWrite, $ , data} from "./helperFunction.js";

class TaskManager {
  constructor() {
    this.observers = [];
    this.taskList = data.get('task_list') || [];
  }

  addTask(...tasks) {
    this.taskList.push(...tasks);
    this.dataSet()
  }

  removeTask(...tasks) {
    this.taskList = this.taskList.filter((task) => !tasks.includes(task));
    this.dataSet()
  }

  showTotalTask() {
    const $totalTask = $("#total-task");
    const text = `Total Task : ${this.taskList.length || "No Task"}`;
    elWrite($totalTask, text);
  }

  addObs(...obs) {
    this.observers.push(...obs);
  }

  removeObs(...delObs) {
    this.observers = this.observers.filter((obs) => !delObs.includes(obs));
  }

  notify(curr) {
    this.observers.forEach((obs) =>
      obs.updateProgress(curr ?? 0, this.taskList.length),
    );
  }

  dataSet() {
    data.set('task_list', this.taskList)
  }
}

class TaskCounter {
  constructor(name) {
    this.name = name;
  }

  updateProgress(current, max) {
    const $counter = $("#progress-counter");
    const text = `Completed Task : ${current}/${max} `;
    elWrite($counter, text);
  }
}

class TaskProgressBar {
  constructor(name) {
    this.name = name;
  }

  updateProgress(current, max) {
    const $bar = $("#bar");
    const $val = $("#val");
    const newVal = Math.floor((current / max) * 100) || 0;
    elWrite($val, `${newVal}%`);
    $bar.style.width = `${newVal}%`;
  }
}

class TaskProgressMessage {
  constructor(name) {
    this.name = name;
  }

  updateProgress(current, max) {
    const $msg = $("#progress-msg");
    let msg = "";
    const newVal = (current / max) * 100 || 0;
    if (newVal <= 0) msg = "Let's start your first task."
    else if (newVal <= 20)
      msg = "Great first step! You've already started moving, stay focused.";
    else if (newVal <= 40)
      msg = "Keep going! You're starting to build a good work rhythm.";
    else if (newVal <= 60)
      msg =
        "Great! More than half way through. Just a little bit more to the finish line!";
    else if (newVal <= 99)
      msg = "Amazing! Just the finishing touches before it's all done.";
    else if (newVal === 100)
      msg = "Congratulations! You have completed the entire task very well!";
    else msg = "Error!";
    elWrite($msg, msg);
  }
}

export {TaskManager, TaskCounter, TaskProgressBar, TaskProgressMessage}