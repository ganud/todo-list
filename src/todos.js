import { forEach } from "lodash";

export class TodoItem {
    constructor(title, description, dueDate, priority) {{
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }}
}

export class TodoDisplayController {
    projectList = [];
    static currentIndex = 0;

    static clearTodos() {
        document.getElementsByClassName('todo-list')[0].innerHTML = "";
    }

    addNewProject(projectName) {
        let project = new Project(projectName);
        this.projectList.push(project);
    }

    renderProjects() {
        let projectGroup = document.getElementById('project-group');
        let projectList = this.projectList;
        projectGroup.innerHTML = "";

        // Add project DOM to sidebar
        this.projectList.forEach(function (project, index) {
            let projectDOM = document.createElement('div');
            projectDOM.className = 'menu-item';
            projectDOM.innerHTML = project.title;
            projectDOM.setAttribute('value', index);

            // Onclick function to make each project display their todos
            projectDOM.addEventListener('click', function() {
                TodoDisplayController.renderTodos(project);
                TodoDisplayController.currentIndex = index; // Updates the index to access the ProjectList when project is clicked.

            })
            projectGroup.appendChild(projectDOM);
        });
    }

    static renderTodos(project) {
        TodoDisplayController.clearTodos();
        let titleElement = document.getElementsByClassName('title')[0];
        titleElement.innerHTML = project.title;
        project.todoList.forEach(todo => {
            let todoItem = document.createElement('div');
            todoItem.className = 'todo-item';

            let todoName = document.createElement('p')
            todoName.innerHTML = todo.title;
            todoItem.appendChild(todoName);

            let todoDate = document.createElement('p')
            todoDate.innerHTML = todo.dueDate;
            todoItem.appendChild(todoDate);

            switch (todo.priority) {
                case "high":
                    todoItem.style.borderLeft = "thick solid #CC0000";
                    break;
                case "medium":
                    todoItem.style.borderLeft = "thick solid #EED202";
                    break;
                case "low":
                    todoItem.style.borderLeft = "thick solid #5AA27C";
                    break;
            }
            document.getElementsByClassName('todo-list')[0].appendChild(todoItem);
        });
    }
}

export class Project {
    todoList = [];

    constructor(title) {
        this.title = title;
    }

    addTodo(title, date, priority) {
        let todo = new TodoItem()
        todo.title = title;
        todo.dueDate = date;
        todo.priority = priority;
        this.todoList.push(todo);
    }
}

export default {
    TodoDisplayController,
    Project
}