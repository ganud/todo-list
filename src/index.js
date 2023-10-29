import './style.css';
import _ from 'lodash';
import {TodoDisplayController, Project, TodoItem} from "./todos.js";

let display = new TodoDisplayController();

// Modal for projects
const projectButtonOpen = document.getElementById("project-button");
const projectForm = document.getElementById("project-modal-form");
const projectModal = document.querySelector("[projectModal]");

projectForm.addEventListener('submit', function() {
  // Get form value
  let projectName = document.getElementById("project-name-input");

  // Update project display
  let project = new Project(projectName.value);
  display.projectList.push(project);
  display.renderProjects();

  // Update localstorage
  localStorage.setItem("localprojectList", JSON.stringify(display.projectList));

  // Clear form
  projectName.value = "";
})

projectButtonOpen.addEventListener('click', function() {
    projectModal.showModal();
})

// Project modal close
projectModal.addEventListener("click", e => {
    const dialogDimensions = projectModal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      projectModal.close()
    }
})

// Modal for todos
const todoButtonOpen = document.getElementById("todo-button");
const todoForm = document.getElementById("todo-modal-form");
const todoModal = document.querySelector("[todoModal]");

todoButtonOpen.addEventListener('click', function() {
  todoModal.showModal();
})

todoModal.addEventListener("click", e => {
  const dialogDimensions = todoModal.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    todoModal.close()
  }
})

todoForm.addEventListener('submit', function(e) {
  // Get form value
  let todoName = document.getElementById("todo-name");
  let todoDate = document.getElementById("todo-date");
  let todoPriority = document.getElementById("todo-priority");
  // Access the selected project
  let project = display.projectList[TodoDisplayController.currentIndex];
  // Add new todo and update localstorage
  project.addTodo(todoName.value, todoDate.value, todoPriority.value);
  localStorage.setItem("localprojectList", JSON.stringify(display.projectList));
  // Render new todo list
  TodoDisplayController.renderTodos(project);


  // Clear form
  todoName.value = "";
  todoDate.value = "";
  todoPriority.value = "";
})


// Main code on page load


let localprojectList = localStorage.getItem('localprojectList');
localprojectList = JSON.parse(localprojectList);

// Loads localstorage if present
if (localStorage.getItem("localprojectList") === null) {
  let Project1 = new Project("Main");
  Project1.addTodo("Welcome to VaporTodo!", "1999", "low");
  display.projectList = [Project1];
}
else {
  localprojectList.forEach(project => {
    // Reimplements functions in Project, code duplicated from todos.js
    project.addTodo = function(title, date, priority) {
      let todo = new TodoItem()
      todo.title = title;
      todo.dueDate = date;
      todo.priority = priority;
      this.todoList.push(todo);
    }
    project.deleteTodo = function(index) {
      this.todoList.splice(index,1);
    }
  });

  display.projectList = localprojectList;

}

display.renderProjects();
