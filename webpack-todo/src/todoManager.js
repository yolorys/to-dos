// src/todoManager.js

import { createProject } from './project.js';
import { createTodo } from './todo.js';

// The central storage for all projects and their todos.
// This is a "private" variable inside the module.
let projects = [];


const saveData = () => {
    localStorage.setItem('todo-projects', JSON.stringify(projects));
};

const loadData = () => {
    const storedProjects = localStorage.getItem('todo-projects');
    if (storedProjects) {
        // You cannot store functions, so we get plain objects.
        // We'll need to figure out how to handle that later.
        projects = JSON.parse(storedProjects);
        // We need to re-attach the 'todos' array, if it was lost during stringify
        projects.forEach(project => {
            if (!project.todos) {
                project.todos = [];
            }
        });
    }
};

// Function to get all projects for other modules to use.
const getProjects = () => projects;

// Function to create a default project when the app first loads.
const createDefaultProject = () => {
    // Check if the projects array is empty.
    if (projects.length === 0) {
        const defaultProject = createProject('Default Project');
        projects.push(defaultProject);
        saveData();
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
    saveData();
};

// Function to add a new todo to a specific project.
const addTodoToProject = (projectId, title, description, dueDate, priority) => {
    // Find the project by its ID
    const project = projects.find(p => p.id === projectId);
    
    if (project) {
        const newTodo = createTodo(title, description, dueDate, priority, projectId);
        project.todos.push(newTodo);
        saveData();
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
            saveData();
            return; // Exit the loop once the todo is found and deleted
        }
    }

}

const updateTodo = (updatedTodo) => {
    // Find the project the todo belongs to
    const project = projects.find(p => p.id === updatedTodo.projectId);
    
    if (project) {
        // Find the index of the todo in that project's todos array
        const todoIndex = project.todos.findIndex(t => t.id === updatedTodo.id);
        
        if (todoIndex > -1) {
            // Replace the old todo object with the updated one
            project.todos[todoIndex] = updatedTodo;
            saveData();
        } else {
            console.error('Todo not found for update.');
        }
    } else {
        console.error('Project not found for todo update.');
    }
};

// Export the functions that other modules need to interact with the data.
export {
    getProjects,
    createDefaultProject,
    addProject,
    addTodoToProject,
    deleteToDo,
    updateTodo,
    loadData
};