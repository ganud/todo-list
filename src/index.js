import './style.css';
import _ from 'lodash';
import {TodoDisplayController, Project} from "./todos.js";
let display = new TodoDisplayController();


const projectButton = document.getElementById("project-button");
projectButton.addEventListener('click', function() {
})

let Project1 = new Project("joe", "nuts");
let Project2 = new Project("EOE", "nuts");
display.projectList = [Project1, Project2]
display.renderProjects();

Project1.addTodo("fornite", "6/9")
Project1.renderTodos();

