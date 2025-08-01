// src/index.js

import { createDefaultProject } from './todoManager.js';
import { renderProjects, renderTodos, handleTodoForm } from './ui.js'; // <-- NEW: import renderTodos and handleTodoForm

const initializeApp = () => {
    console.log("Initializing Todo List App...");

    // 1. Set up the initial data
    createDefaultProject();

    // 2. Render the initial UI
    renderProjects();

    // <-- NEW: Get the ID of the default project and render its todos initially -->
    const defaultProjectId = createDefaultProject().id; // Note: You might need to change `createDefaultProject` to return the ID for this to work
    renderTodos(defaultProjectId);

    // <-- NEW: Add a submit event listener to the form -->
    const form = document.getElementById('new-todo-form');
    form.addEventListener('submit', handleTodoForm);
};

document.addEventListener('DOMContentLoaded', initializeApp);