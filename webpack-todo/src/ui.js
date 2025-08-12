// src/ui.js

import { getProjects, addTodoToProject, addProject, deleteToDo } from './todoManager.js';

let selectedProjectId = null;

// Function to render the list of projects
const renderProjects = () => {
    const projects = getProjects();
    const projectsContainer = document.getElementById('projects-container');

    // Clear existing projects to prevent duplicates on re-render
    projectsContainer.innerHTML = '';

    // Create and append a div for each project
    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.textContent = project.name;
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
};

const renderTodos = (projectId) => {
    const projects = getProjects();
    const project = projects.find(p => p.id === projectId);
    const todosContainer = document.getElementById('todos-container');
    todosContainer.innerHTML = ''; // Clear existing todos

    if (project) {
        project.todos.forEach(todo => {
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = `
                <h3>${todo.title}</h3>
                <p>Due: ${todo.dueDate}</p>
                <p>Priority: ${todo.priority}</p>
                <button class="delete-btn" data-todo-id="${todo.id}">Delete</button>
            `;
            todoDiv.classList.add('todo-item');
            todosContainer.appendChild(todoDiv);
        });
    }

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

export { renderProjects, renderTodos, handleTodoForm, handleProjectForm, setInitialProject };