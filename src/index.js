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
  let inputForm = document.getElementById("project-name-input");

  // Update project display
  let project = new Project(inputForm.value);
  display.projectList.push(project);
  display.renderProjects();

  // Clear form
  inputForm.value = "";
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
  let inputForm = document.getElementById("todo-name");

  // Update project display
  let project = new Project(inputForm.value);
  display.projectList.push(project);
  display.renderProjects();

  // Clear form
  inputForm.value = "";
})

// Debug code
// let Project1 = new Project("joe");
// let Project2 = new Project("EOE");
// display.projectList = [Project1, Project2]
// display.renderProjects();

// Project1.addTodo("fornite", "6/9")
// Project1.addTodo("fornite", "6/9")
