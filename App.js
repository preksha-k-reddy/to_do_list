import React, { useState } from 'react';
import './Task.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(0); 

    const addOrUpdateTask = () => {
        if (!taskName || !taskDate) return; 

        const newTask = {
            id: Date.now(), 
            name: taskName,
            description: taskDescription,
            date: taskDate,
            completed: false,
        };

        if (editingTaskId) {
            setTasks(tasks.map(task => 
                task.id === editingTaskId ? newTask : task
            ));
            setEditingTaskId(null); 
        } else {
            setTasks([...tasks, newTask]); 
        }

        clearInputs(); 
    };

    const clearInputs = () => {
        setTaskName('');
        setTaskDescription('');
        setTaskDate('');
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId)); 
    };

    const startEditing = (task) => {
        setTaskName(task.name);
        setTaskDescription(task.description);
        setTaskDate(task.date);
        setEditingTaskId(task.id); 
    };

    return (
        <div className="container">
            <h1>To Do List</h1>
            <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
                type="datetime-local"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
            />
            <button onClick={addOrUpdateTask}>
                {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <strong>{task.name}</strong><br />
                        {task.description}<br />
                        {task.date}<br />
                        Status: {task.completed ? 'Completed' : 'Scheduled'}
                        <button onClick={() => toggleTaskCompletion(task.id)}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => startEditing(task)}>Edit</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <p>Total Completed Tasks: {tasks.filter(task => task.completed).length}</p>
        </div>
    );
}

export default App;
