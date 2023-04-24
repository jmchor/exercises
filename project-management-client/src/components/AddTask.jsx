// src/components/AddTask.js

import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function AddTask({ projectId, refreshProject }) {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const handleSubmit = (e) => {
                e.preventDefault();

                const requestBody = { title, description, projectId };

                const storedToken = localStorage.getItem('authToken');

                axios.post(`${API_URL}/api/tasks`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
                        .then((res) => {
                                const newTask = res.data;
                                setTitle(newTask.title);
                                setDescription(newTask.description);

                                refreshProject();
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        return (
                <div className="AddTask">
                        <h3>Add New Task</h3>

                        <form onSubmit={handleSubmit}>
                                <label>Title:</label>
                                <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                />

                                <label>Description:</label>
                                <textarea
                                        type="text"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                />

                                <button type="submit">Add Task</button>
                        </form>
                </div>
        );
}

export default AddTask;
