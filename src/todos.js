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

    static clearTodos() {
        document.getElementsByClassName('todo-list')[0].innerHTML = "";
    }

    addNewProject(projectName) {
        let project = new Project(projectName);
        this.projectList.push(project);
    }

    // Add projects to DOM
    // Assign each an index and eventlistener
    renderProjects() {
        let projectGroup = document.getElementById('project-group');
        projectGroup.innerHTML = "";

        // Add project DOM to sidebar
        this.projectList.forEach(function (project, index) {
            let projectDOM = document.createElement('div');
            projectDOM.className = 'menu-item';
            projectDOM.innerHTML = project.title;
            projectDOM.setAttribute('value', index);

            projectDOM.addEventListener('click', project.renderTodos)


            projectGroup.appendChild(projectDOM);
        });
    }
}

export class Project {
    todoList = [];

    constructor(title) {
        this.title = title;
    }

    addTodo(title, date) {
        let todo = new TodoItem()
        todo.title = title;
        todo.dueDate = date;

        this.todoList.push(todo);
    }


    renderTodos() {
        TodoDisplayController.clearTodos();
        let titleElement = document.getElementsByClassName('title')[0];
        titleElement.innerHTML = this.title;

        // Creates and append individual todo
        this.todoList.forEach(todo => {
            let todoItem = document.createElement('div');
            todoItem.className = 'todo-item';

            let todoName = document.createElement('p')
            todoName.innerHTML = todo.title;
            todoItem.appendChild(todoName);

            let todoDate = document.createElement('p')
            todoDate.innerHTML = todo.dueDate;
            todoItem.appendChild(todoDate);

            document.getElementsByClassName('todo-list')[0].appendChild(todoItem);
        });
    }
}

export default {
    TodoDisplayController,
    Project
}