import './style.css';
import _ from 'lodash';
import {TodoDisplayController, Project} from "./todos.js";

let display = new TodoDisplayController();


const projectButton = document.getElementById("project-button");
const modal = document.querySelector("[data-modal]");

projectButton.addEventListener('click', function() {
    modal.showModal();
})


// Debug code
let Project1 = new Project("joe", "nuts");
let Project2 = new Project("EOE", "nuts");
display.projectList = [Project1, Project2]
display.renderProjects();

Project1.addTodo("fornite", "6/9")
Project1.addTodo("fornite", "6/9")

console.log(Project1.todoList)
Project1.renderTodos();
