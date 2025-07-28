// src/project.js

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};

/**
 * @param {string} name - The name of the project ("Home Tasks", "Work", "Errands").
 * @returns {object} A new project object.
 */
const createProject = (name) => {
    const id = generateUniqueId();
    // I will need an array to hold the todo IDs or todo objects that belong to this project.
    // For now, an empty array for todos.
    const todos = []; // This array will store todo objects that belong to this project.

    return {
        id,
        name,
        todos, // Property to hold the todos belonging to this project
    };
};

export { createProject };