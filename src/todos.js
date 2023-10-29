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
        project.todoList.forEach(function (todo, index) {
            // Create dom elements from TodoItem properties 
            let todoItem = document.createElement('div');
            todoItem.className = 'todo-item';

            let iconGroup = document.createElement('div');
            iconGroup.className = 'icon-group';
            
            let todoName = document.createElement('p')
            todoName.innerHTML = todo.title;
            todoItem.appendChild(todoName);

            let todoDate = document.createElement('p')
            todoDate.innerHTML = todo.dueDate;
            iconGroup.appendChild(todoDate);

            let deleteButton = document.createElement('img');
            deleteButton.src = "https://cdn-icons-png.flaticon.com/128/9713/9713380.png";
            deleteButton.setAttribute('value', index);
            deleteButton.addEventListener('click', function(e) {
                let todoIndex = e.target.getAttribute('value')
                project.deleteTodo(todoIndex);
                TodoDisplayController.renderTodos(project);
            })
            iconGroup.appendChild(deleteButton);

            todoItem.appendChild(iconGroup);

            // Assign color tags to the Todo DOM item according to priority value
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

            // Assign a index which can be accessed when deleting items.
            todoItem.setAttribute('value', index);

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

    deleteTodo(index) {
        this.todoList.splice(index,1);
    }

    // When editing a todo, open up the todo creation form.
    // Replace the todo with the new todo in the same index.
    editTodo() {

    }
}

export default {
    TodoDisplayController,
    Project,
    TodoItem,
}