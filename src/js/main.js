document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // API base URL 
    const API_URL = 'http://localhost:3000/api/tasks';
    
    // Load tasks when page loads
    fetchTasks();
    
    // Add task event listener
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });
    
    // Fetch all tasks from API
    function fetchTasks() {
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(tasks => {
                renderTasks(tasks);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
                taskList.innerHTML = `<li class="error">Error loading tasks: ${error.message}</li>`;
            });
    }
    
    // Add a new task
    function addTask(task) {
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(newTask => {
            // Add the new task to the list without reloading all tasks
            const taskItem = createTaskElement(newTask);
            taskList.appendChild(taskItem);
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    }
    
    // Toggle task completion status
    function toggleTaskCompletion(id, completed) {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error updating task:', error);
            // Revert the checkbox if update fails
            fetchTasks();
        });
    }
    
    // Delete a task
    function deleteTask(id) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Remove the task element from the DOM
            const taskElement = document.getElementById(`task-${id}`);
            if (taskElement) {
                taskElement.remove();
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
    }
    
    // Create a task HTML element
    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.id = `task-${task.id}`;
        taskItem.className = task.completed ? 'completed' : '';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            toggleTaskCompletion(task.id, this.checked);
            taskItem.className = this.checked ? 'completed' : '';
        });
        
        const taskText = document.createElement('span');
        taskText.textContent = task.task;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
        });
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        
        return taskItem;
    }
    
    // Render all tasks
    function renderTasks(tasks) {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No tasks to display. Add a task to get started!';
            taskList.appendChild(emptyMessage);
            return;
        }
        
        tasks.forEach(task => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    }
});