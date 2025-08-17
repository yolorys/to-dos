// src/ui.js
import { format } from 'date-fns';

import { getProjects, addTodoToProject, addProject, deleteToDo, updateTodo, getAllTodos, deleteProject } from './todoManager.js';

let selectedProjectId = null;

// Function to render the list of projects
const renderProjects = () => {
    const projects = getProjects();
    const projectsContainer = document.getElementById('projects-container');

    // Clear existing projects to prevent duplicates on re-render
    projectsContainer.innerHTML = '';

    const allTodosDiv = document.createElement('div');
    allTodosDiv.textContent = 'Inbox';
    allTodosDiv.classList.add('project-item', 'inbox');
    projectsContainer.appendChild(allTodosDiv);

    allTodosDiv.addEventListener('click', () => {
        // Set a special ID or just pass a value to indicate "all todos"
        selectedProjectId = 'inbox';
        renderProjects(); // Re-render to update highlight
        renderTodos(selectedProjectId); // Render all todos
    });

    // Create and append a div for each project
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = project.name;
        const project_del_btn = document.createElement('button');
        project_del_btn.textContent = "Delete Project";
        project_del_btn.classList.add("delete-btn");
        project_del_btn.dataset.id = project.id;
        projectDiv.appendChild(project_del_btn);
        projectDiv.classList.add('project-item');
        projectDiv.dataset.id = project.id;

        if (project.id === selectedProjectId) {
            projectDiv.classList.add('selected'); // This will be used for styling
        }

        projectDiv.addEventListener('click', () => {
            selectedProjectId = project.id; // Set the selected project's ID
            renderProjects(); // Re-render the project list to update the highlight
            renderTodos(project.id); // Render the todos for the newly selected project
        });

        projectsContainer.appendChild(projectDiv);
    });

    projectsContainer.addEventListener('click', (e) => {
        // Check if the clicked element is a delete button
        if (e.target.classList.contains('delete-btn')) {
            const projectId = e.target.dataset.id;
            deleteProject(projectId);
            renderProjects();
        }
    });
};

const renderTodos = (projectId) => {

    let todos = [];
    const todosContainer = document.getElementById('todos-container');
    todosContainer.innerHTML = '';

    if (projectId === 'inbox') {
        todos = getAllTodos();
    } else {
        const project = getProjects().find(p => p.id === projectId);
        if (project) {
            todos = project.todos;
        } else {
            console.error('Project not found!');
            return;
        }
    }

    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.dataset.todoId = todo.id;

        const formattedDate = format(new Date(`${todo.dueDate}T12:00:00`), 'MMM dd, yyyy');

        todoDiv.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Due: ${formattedDate}</p>
            <p>Priority: ${todo.priority}</p>
            <button class="delete-btn" data-todo-id="${todo.id}">Delete</button>
        `;

        todoDiv.classList.add('todo-item');

        todoDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) {
                // Call a new function to render the detailed view
                renderTodoDetails(todo);
            }
        });

        todosContainer.appendChild(todoDiv);
    });

    todosContainer.addEventListener('click', (e) => {
        // Check if the clicked element is a delete button
        if (e.target.classList.contains('delete-btn')) {
            const todoId = e.target.dataset.todoId;
            deleteToDo(todoId);
            renderTodos(selectedProjectId); // Re-render the current project's todos
        }
    });
};

const handleTodoForm = (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission

    // Get values from the form inputs
    const form = e.target;
    const title = form.elements['title'].value;
    const description = form.elements['description'].value;
    const dueDate = form.elements['dueDate'].value;
    const priority = form.elements['priority'].value;

    if (selectedProjectId) {
        addTodoToProject(selectedProjectId, title, description, dueDate, priority);
        renderTodos(selectedProjectId);
        form.reset();
    } else {
        alert("Please select a project first!");
    }
};

const handleProjectForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const projectName = form.elements['project-name'].value;

    // Call the todoManager to add the new project
    addProject(projectName);
    
    // Re-render the projects list to show the new one
    renderProjects();

    form.reset(); // Clear the form after submission
};


const setInitialProject = (projectId) => {
    selectedProjectId = projectId;
};

const renderTodoDetails = (todo) => {
    const todosContainer = document.getElementById('todos-container');
    
    // Clear the current list of todos
    todosContainer.innerHTML = '';
    
    const detailsForm = document.createElement('form');
    detailsForm.id = 'edit-todo-form';
    detailsForm.innerHTML = `
        <h2>Edit Todo</h2>
        <input type="text" id="edit-title" value="${todo.title}" required>
        <input type="text" id="edit-description" value="${todo.description}">
        <input type="date" id="edit-dueDate" value="${todo.dueDate}" required>
        <select id="edit-priority">
            <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
        </select>
        <button type="submit">Save</button>
        <button type="button" id="cancel-edit">Cancel</button>
    `;

    todosContainer.appendChild(detailsForm);

    detailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedTodo = {
            id: todo.id,
            title: document.getElementById('edit-title').value,
            description: document.getElementById('edit-description').value,
            dueDate: document.getElementById('edit-dueDate').value,
            priority: document.getElementById('edit-priority').value,
            projectId: todo.projectId,
        };
        
        // Call the manager to update the todo
        updateTodo(updatedTodo);
        
        // Re-render the todo list to show the updated details
        renderTodos(todo.projectId);
    });

    document.getElementById('cancel-edit').addEventListener('click', () => {
        renderTodos(todo.projectId);
    });
};

export { renderProjects, renderTodos, handleTodoForm, handleProjectForm, setInitialProject, renderTodoDetails };