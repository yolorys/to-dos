// src/todoManager.js

import { createProject } from './project.js';
import { createTodo } from './todo.js';

// The central storage for all projects and their todos.
// This is a "private" variable inside the module.
let projects = [];

// Function to get all projects for other modules to use.
const getProjects = () => projects;

// Function to create a default project when the app first loads.
const createDefaultProject = () => {
    // Check if the projects array is empty.
    if (projects.length === 0) {
        const defaultProject = createProject('Default Project');
        projects.push(defaultProject);
        return defaultProject; // < Return the newly created project
    }
    // If a default project already exists, we should probably return it
    // so we can get its ID.
    return projects[0]; // Return the existing default project
};


// Function to add a new project.
const addProject = (projectName) => {
    const newProject = createProject(projectName);
    projects.push(newProject);
};

// Function to add a new todo to a specific project.
const addTodoToProject = (projectId, title, description, dueDate, priority) => {
    // Find the project by its ID
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        const newTodo = createTodo(title, description, dueDate, priority, projectId);
        project.todos.push(newTodo);
    } else {
        console.error('Project not found!');
    }
};

const deleteToDo = (todoId) => {
    for (const project of projects) {
        const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
        
        if (todoIndex > -1) {
            // Remove the todo from the array
            project.todos.splice(todoIndex, 1);
            return; // Exit the loop once the todo is found and deleted
        }
    }

}

// Export the functions that other modules need to interact with the data.
export {
    getProjects,
    createDefaultProject,
    addProject,
    addTodoToProject,
    deleteToDo
};