import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskPage = () => {
        const API_URL = 'http://localhost:5005';

        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const { taskId } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
                axios.get(`${API_URL}/api/tasks/${taskId}`)
                        .then((res) => {
                                setTitle(res.data.title);
                                setDescription(res.data.description);
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        }, [taskId]);

        const handleFormSubmit = () => {
                const requestBody = { title, description };

                axios.put(`${API_URL}/api/tasks/${taskId}`, requestBody)
                        .then((res) => {
                                navigate(`/`);
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        const deleteTask = () => {
                axios.delete(`${API_URL}/api/tasks/${taskId}`)
                        .then((res) => {
                                console.log('Task deleted');
                        })
                        .catch((err) => {
                                console.error(err);
                        });
        };

        return (
                <div className="EditTaskPage">
                        <h3>Edit the Task</h3>

                        <form onSubmit={handleFormSubmit}>
                                <label>Title:</label>
                                <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                />

                                <label>Description:</label>
                                <textarea
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                />

                                <button type="submit">Update Task</button>
                        </form>

                        {/*     ADD     */}
                        <button onClick={deleteTask}>Delete Task</button>
                </div>
        );
};

export default EditTaskPage;
