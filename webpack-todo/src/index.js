// src/index.js

import { createDefaultProject } from './todoManager.js';
import { renderProjects, renderTodos, handleTodoForm, handleProjectForm, setInitialProject } from './ui.js'; // <-- NEW: import renderTodos and handleTodoForm
import './styles.css';

const initializeApp = () => {
    console.log("Initializing Todo List App...");

    const defaultProject = createDefaultProject();

    setInitialProject(defaultProject.id);
    renderProjects();
    renderTodos(defaultProject.id);

    const form = document.getElementById('new-todo-form');
    form.addEventListener('submit', handleTodoForm);

    const projectForm = document.getElementById('new-project-form');
    projectForm.addEventListener('submit', handleProjectForm);
};

document.addEventListener('DOMContentLoaded', initializeApp);