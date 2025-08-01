// src/ui.js

import { getProjects, addTodoToProject } from './todoManager.js';

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
        // You might add a click event listener here later
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
            `;
            todoDiv.classList.add('todo-item');
            todosContainer.appendChild(todoDiv);
        });
    }
};

const handleTodoForm = (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission

    // Get values from the form inputs
    const form = e.target;
    const title = form.elements['title'].value;
    const description = form.elements['description'].value;
    const dueDate = form.elements['dueDate'].value;
    const priority = form.elements['priority'].value;

    // For now, let's assume we're always adding to the default project (the first one in the array)
    const defaultProjectId = getProjects()[0].id;

    // Call the todoManager to add the new todo
    addTodoToProject(defaultProjectId, title, description, dueDate, priority);

    // Re-render the todos to show the new one
    renderTodos(defaultProjectId);

    form.reset(); // Clear the form after submission
};


// Export the functions that will be used by other modules
export { renderProjects, renderTodos, handleTodoForm };