import './style.css';
import _ from 'lodash';
import {TodoDisplayController, Project} from "./todos.js";

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
  project.addTodo(todoName.value, todoDate.value, todoPriority.value);

  // Render new todo list
  TodoDisplayController.renderTodos(project);


  // Clear form
  todoName.value = "";
  todoDate.value = "";
  todoPriority.value = "";
})

// Debug code
// let Project1 = new Project("joe");
// Project1.addTodo("joe", "1999", "high");
// let Project2 = new Project("EOE");
// display.projectList = [Project1, Project2]
// display.renderProjects();
