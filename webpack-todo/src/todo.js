// src/todo.js

// Function to generate a unique ID for each todo.
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};

/**
 * @param {string} title - The title of the todo.
 * @param {string} description - A detailed description of the todo.
 * @param {string} dueDate - The due date of the todo (e.g., "YYYY-MM-DD").
 * @param {string} priority - The priority of the todo (e.g., "low", "medium", "high").
 * @param {string} projectId - The ID of the project this todo belongs to.
 * @returns {object} A new todo object.
 */
const createTodo = (title, description, dueDate, priority, projectId) => {
    const id = generateUniqueId();
    const isComplete = false; // Todos are not complete by default

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        projectId, // To link it to a project later (its parent)
        isComplete,
        // add methods here later
    };
};

export { createTodo };